# AI Email Generator

An AI-powered web application that generates professional emails based on the recipient, email type, tone, and purpose.

## Features

- AI-powered email generation using Google Gemini
- Multiple email types
- Formal, professional, and friendly tones
- Server-side input validation
- Error handling
- Copy generated email to clipboard
- Responsive dark-themed interface
- Automated tests with Pytest

## Tech Stack

- Python
- Flask
- Google Gemini API
- HTML5
- CSS3
- JavaScript
- Pytest

## Architecture

```text
User
  ↓
HTML / CSS / JavaScript
  ↓
Flask Backend
  ↓
Google Gemini API
  ↓
Generated Email
  ↓
Web Interface
```

## Project Structure

```text
ai-email-generator/
│
├── app.py
├── generator.py
├── requirements.txt
├── .gitignore
├── README.md
│
├── static/
│   ├── style.css
│   └── script.js
│
├── templates/
│   └── index.html
│
└── tests/
    └── test_generator.py
```

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/YOUR-GITHUB-USERNAME/ai-email-generator.git
cd ai-email-generator
```

### 2. Create a virtual environment

Windows:

```bash
python -m venv venv
venv\Scripts\activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure Gemini

Create a `.env` file:

```text
GEMINI_API_KEY=your_api_key_here
```

Never commit the `.env` file.

### 5. Run the application

```bash
python app.py
```

Open:

```text
http://127.0.0.1:5000
```

## Testing

Run:

```bash
pytest
```

The test suite checks:

- Homepage availability
- Missing recipient validation
- Missing purpose validation

## Future Improvements

- Email history
- Additional writing styles
- Email export
- User authentication
- Production deployment
- Multiple AI provider support

## Author

Dhruv
