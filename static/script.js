const form = document.getElementById("email-form");
const generateButton = document.getElementById("generate-btn");
const errorBox = document.getElementById("error");
const resultBox = document.getElementById("result");
const emailOutput = document.getElementById("email-output");
const copyButton = document.getElementById("copy-btn");

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    errorBox.textContent = "";
    emailOutput.textContent = "";
    resultBox.style.display = "none";

    const recipient = document.getElementById("recipient").value.trim();
    const emailType = document.getElementById("email-type").value;
    const tone = document.getElementById("tone").value;
    const purpose = document.getElementById("purpose").value.trim();

    generateButton.disabled = true;
    generateButton.textContent = "Generating...";

    try {
        const response = await fetch("/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                recipient: recipient,
                email_type: emailType,
                tone: tone,
                purpose: purpose
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Something went wrong.");
        }

        emailOutput.textContent = data.email;
        resultBox.style.display = "block";

    } catch (error) {
        errorBox.textContent = error.message;
        console.error(error);

    } finally {
        generateButton.disabled = false;
        generateButton.textContent = "Generate Email";
    }
});


copyButton.addEventListener("click", async function () {
    const email = emailOutput.textContent;

    if (!email) {
        return;
    }

    try {
        await navigator.clipboard.writeText(email);
        copyButton.textContent = "Copied!";

        setTimeout(() => {
            copyButton.textContent = "Copy";
        }, 2000);

    } catch (error) {
        console.error("Copy failed:", error);
    }
});