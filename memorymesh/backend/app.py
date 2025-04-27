# backend/app.py

import os
from flask import Flask, send_from_directory
from flask_cors import CORS

from models.user import db, User
from routes.auth import auth_bp
from routes.quiz import quiz_bp
from config import Config




# Chemin absolu vers le dossier frontend
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
FRONTEND_DIR = os.path.join(BASE_DIR, '..', 'frontend')

def create_app():
    app = Flask(
        __name__,
        static_folder=FRONTEND_DIR,
        static_url_path=''      # sert tout frontend/* à la racine
    )
    app.config.from_object(Config)
    CORS(app, supports_credentials=True)

    # Initialisation de la base de données
    db.init_app(app)
    with app.app_context():
        db.create_all()

    # Enregistrement des blueprints API
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(quiz_bp, url_prefix='/api')
    # Sert les fichiers statiques et gère le routing du SPA
    @app.route('/', defaults={'path': ''})
    @app.route('/<path:path>')
    def serve_frontend(path):
        full_path = os.path.join(app.static_folder, path)
        if path and os.path.isfile(full_path):
            return send_from_directory(app.static_folder, path)
        # sinon on renvoie index.html pour le routeur client
        return send_from_directory(app.static_folder, 'index.html')

    # Health check
    @app.route('/api/health')
    def health_check():
        return {'status': 'healthy'}, 200

    return app

if __name__ == '__main__':
    create_app().run(debug=True, port=8000)
