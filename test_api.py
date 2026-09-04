from generator import generate_email

email = generate_email(
    "Professor",
    "Leave Application",
    "Formal",
    "I need two days leave because I have to attend a family function."
)

print(email)