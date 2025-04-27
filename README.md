

```markdown
# MemoryMesh - Analyse

MemoryMesh is a Python application designed to analyze documents by summarizing their content and generating quizzes based on the material. It supports multiple file formats, including PDF, PPTX, and TXT, making it a versatile tool for both students and professionals who wish to reinforce their learning through interactive quizzes.

## Project Overview

MemoryMesh provides users with the ability to extract text from various document formats, summarize the content, and create quizzes to test understanding and retention of information. The application incorporates an API that enhances the processing of text and also allows for the preservation of results in both text and PDF formats.

## Installation

To run MemoryMesh, ensure you have Python 3.x installed on your system. 

1. Clone the repository or download the code files to your local machine.
2. Navigate to the project directory in your terminal.
3. Install the necessary dependencies via pip (it will auto-install any missing dependencies):
   ```bash
   python testV2.py
   ```

Alternatively, you can manually install required libraries using:
   ```bash
   pip install requests PyPDF2 python-pptx fpdf
   ```

## Usage

1. Run the application:
   ```bash
   python testV2.py
   ```
2. Choose one of the following options:
   - **1** for summarizing a document
   - **2** for generating a quiz
   - **3** for both summarization and quiz generation
3. Enter the file path of the document you wish to analyze (Supported formats: PDF, PPTX, TXT).
4. Follow the prompts to interact with the application, including answering quiz questions where applicable.

## Features

- **Multi-format text extraction**: Supports PDF, PPTX, and TXT file formats.
- **Content summarization**: Generates concise summaries of documents.
- **Quiz generation**: Creates quizzes consisting of multiple choice and true/false questions based on the content.
- **Retention metrics**: Calculates metrics based on quiz responses to aid in studying effectively.
- **Export results**: Saves summaries and quiz results to TXT and PDF formats.

## Dependencies

MemoryMesh requires the following Python packages which will be automatically installed on execution if not already present in your environment:

- `requests`
- `PyPDF2`
- `python-pptx`
- `fpdf`

## Project Structure

The project is structured as follows:

```
.
├── testV2.py               # Main application script
```

### Code Description

- **testV2.py**: Contains the main logic of the application, including functions to extract text, analyze content, generate quizzes, present quizzes interactively, and save the results in various formats. It manages the overall workflow of the application from input to output.

## License

This project is open-source and available under the MIT License. Feel free to contribute or modify the code as per your requirements.

---

For any issues or suggestions, please open an issue in the project's repository. Happy learning with MemoryMesh!
```
