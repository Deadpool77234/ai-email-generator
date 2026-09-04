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

saveHistory(data.email);

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

const historyList = document.getElementById("history-list");
const clearHistoryButton = document.getElementById("clear-history");

let emailHistory = JSON.parse(
    localStorage.getItem("emailHistory") || "[]"
);

function saveHistory(email) {
    emailHistory.unshift({
        email: email,
        date: new Date().toLocaleString()
    });

    // Keep the latest 10 emails
    emailHistory = emailHistory.slice(0, 10);

    localStorage.setItem(
        "emailHistory",
        JSON.stringify(emailHistory)
    );

    displayHistory();
}

function displayHistory() {
    if (emailHistory.length === 0) {
        historyList.innerHTML =
            '<p class="empty-history">No generated emails yet.</p>';
        return;
    }

    historyList.innerHTML = "";

    emailHistory.forEach((item, index) => {
        const historyItem = document.createElement("div");

        historyItem.className = "history-item";

        historyItem.innerHTML = `
            <div>
                <span class="history-number">#${index + 1}</span>
                <span class="history-date">${item.date}</span>
            </div>

            <p>${item.email.substring(0, 100)}...</p>

            <button type="button" onclick="restoreEmail(${index})">
                Restore
            </button>
        `;

        historyList.appendChild(historyItem);
    });
}

function restoreEmail(index) {
    emailOutput.textContent = emailHistory[index].email;
    resultBox.style.display = "block";

    window.scrollTo({
        top: resultBox.offsetTop,
        behavior: "smooth"
    });
}

clearHistoryButton.addEventListener("click", function () {
    emailHistory = [];

    localStorage.removeItem("emailHistory");

    displayHistory();
});

displayHistory();