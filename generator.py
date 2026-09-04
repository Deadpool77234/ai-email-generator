import os

from dotenv import load_dotenv
from google import genai

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise ValueError("GEMINI_API_KEY is not configured.")

client = genai.Client(api_key=api_key)


def generate_email(recipient, email_type, tone, length, purpose):
    """Generate a natural, professional email using Google Gemini."""

    prompt = f"""
You are an expert professional email writer.

Write a natural, human-sounding email based strictly on the information provided.

INPUT:
Recipient: {recipient}
Email Type: {email_type}
Tone: {tone}
Length: {length}
Purpose: {purpose}

WRITING RULES:
- Write a clear and specific subject line.
- Match the requested tone exactly.
- Follow the requested length.
- Use natural language rather than generic AI phrases.
- Do not unnecessarily repeat the purpose.
- Do not invent names, dates, companies, positions, facts, or personal details.
- If information is missing, use a simple placeholder such as [Name] or [Date] only when necessary.
- Keep the email focused on the recipient's likely needs.
- Use an appropriate greeting and professional closing.
- Avoid excessive formality, unnecessary adjectives, and repetitive sentences.
- Do not explain your writing process.
- Return ONLY the finished email.

LENGTH GUIDELINES:
- Short: approximately 60–100 words.
- Standard: approximately 100–160 words.
- Detailed: approximately 160–230 words.

Now generate the email.
"""

    response = client.models.generate_content(
        model="gemini-3.6-flash",
        contents=prompt
    )

    if not response.text:
        raise ValueError("Gemini returned an empty response.")

    return response.text.strip()