from app import app


def test_home_page():
    client = app.test_client()

    response = client.get("/")

    assert response.status_code == 200


def test_missing_recipient():
    client = app.test_client()

    response = client.post(
        "/generate",
        json={
            "recipient": "",
            "email_type": "Leave Application",
            "tone": "Formal",
            "purpose": "I need two days leave for a family function."
        }
    )

    assert response.status_code == 400


def test_missing_purpose():
    client = app.test_client()

    response = client.post(
        "/generate",
        json={
            "recipient": "Professor",
            "email_type": "Leave Application",
            "tone": "Formal",
            "purpose": ""
        }
    )

    assert response.status_code == 400