import os

from dotenv import load_dotenv
from google import genai


load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise ValueError("GEMINI_API_KEY is not configured.")


client = genai.Client(api_key=api_key)


def generate_email(recipient, email_type, tone, length, purpose):
    """Generate a professional email using Gemini."""

    prompt = f"""
Create a professional email using the following information.

Recipient: {recipient}
Email type: {email_type}
Tone: {tone}
Length: {length}
Purpose: {purpose}

Requirements:
- Include a suitable subject line.
- Write a clear and concise email.
- Use the requested tone.
- Follow the requested length.
- Short: keep the email concise and direct.
- Standard: provide a balanced, professional email.
- Detailed: provide more context and explanation while remaining professional.
- Do not invent personal information.
- Include an appropriate greeting and closing.
- Return only the completed email.
"""

    response = client.models.generate_content(
        model="gemini-3.6-flash",
        contents=prompt
    )

    return response.text.strip()