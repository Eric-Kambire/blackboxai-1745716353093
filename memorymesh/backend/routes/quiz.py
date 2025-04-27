import os
import tempfile
from flask import Blueprint, request, jsonify, current_app
from werkzeug.utils import secure_filename
from services import quiz_service

quiz_bp = Blueprint('quiz', __name__, url_prefix='/api')

ALLOWED_EXTENSIONS = {'pdf', 'pptx', 'txt'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@quiz_bp.route('/generate_quiz_from_revision', methods=['POST'])
def generate_quiz():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    if not allowed_file(file.filename):
        return jsonify({'error': f'File type not allowed. Allowed types: {", ".join(ALLOWED_EXTENSIONS)}'}), 400

    mode = request.form.get('mode', 'both').lower()
    if mode not in ('summary', 'quiz', 'both'):
        return jsonify({'error': 'Invalid mode. Choose from summary, quiz, or both.'}), 400

    filename = secure_filename(file.filename)
    try:
        with tempfile.TemporaryDirectory() as tmpdirname:
            filepath = os.path.join(tmpdirname, filename)
            file.save(filepath)

            text = quiz_service.extract_text(filepath)
            if not text:
                return jsonify({'error': 'Failed to extract text from the file.'}), 400

            response_data = {}
            base_name = os.path.splitext(filename)[0]

            if mode in ('summary', 'both'):
                summary = quiz_service.analyze_content(text, 'summary')
                if summary:
                    response_data['summary'] = summary
                    saved = quiz_service.save_results(f"Résumé\n{summary}", f"resume_{base_name}", ['txt','pdf'])
                    response_data['summary_files'] = saved

            if mode in ('quiz', 'both'):
                quiz_text = quiz_service.analyze_content(text, 'quiz')
                if quiz_text:
                    quiz_data = quiz_service.parse_quiz(quiz_text)
                    # Since testV2.py had interactive quiz, here we just return parsed quiz data
                    response_data['quiz_text'] = quiz_text
                    response_data['quiz_data'] = quiz_data
                    # No interactive quiz here, but we can calculate dummy metrics or skip
                    # Save quiz results files
                    saved = quiz_service.save_results(quiz_text, f"quiz_{base_name}", ['txt','pdf'])
                    response_data['quiz_files'] = saved

            return jsonify(response_data), 200
    except Exception as e:
        current_app.logger.error(f"Error processing quiz generation: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500
