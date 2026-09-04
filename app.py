from flask import Flask, render_template, request, jsonify
from generator import generate_email

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/generate", methods=["POST"])
def generate():
    data = request.get_json()

    recipient = data.get("recipient", "").strip()
    email_type = data.get("email_type", "").strip()
    tone = data.get("tone", "").strip()
    purpose = data.get("purpose", "").strip()
    length = data.get("length", "Standard").strip()

    # Validate input
    if not recipient:
        return jsonify({"error": "Please enter a recipient."}), 400

    if not email_type:
        return jsonify({"error": "Please select an email type."}), 400

    if not tone:
        return jsonify({"error": "Please select a tone."}), 400

    if not purpose:
        return jsonify({"error": "Please describe the purpose of the email."}), 400

    if len(purpose) < 10:
        return jsonify({"error": "Please provide more details."}), 400

    # Generate email
    try:
        email = generate_email(
            recipient,
            email_type,
            tone,
            length,
            purpose
        )

        return jsonify({"email": email})

    except Exception as error:
        print("Generation error:", error)

        return jsonify({
            "error": "Unable to generate email. Please try again."
        }), 500


if __name__ == "__main__":
    import os
    app.run(
        host="0.0.0.0",
        port=int(os.environ.get("PORT", 5000))
    )