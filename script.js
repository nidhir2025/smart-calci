const btn = document.querySelector(".speak");
const inputField = document.querySelector(".input");
const synth = window.speechSynthesis;

const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = "en-US"; // English language
recognition.interimResults = false;
recognition.maxAlternatives = 1;

btn.addEventListener("click", () => {
    recognition.start();
});

recognition.onresult = (event) => {
    let spokenText = event.results[0][0].transcript.toLowerCase();
    console.log("Recognized speech:", spokenText);

    // Replacing different variations of multiplication with "*"
    let expression = spokenText
        .replace(/x/g, "*") // If user says "x"
        .replace(/into/g, "*") // If user says "into"
        .replace(/multiplication/g, "*"); // If user says "multiplication"

    console.log("Formatted expression:", expression);

    try {
        let result = eval(expression); // Evaluate the expression
        inputField.value = `${expression} = ${result}`;
        speakResult(`${expression} is ${result}`);
    } catch (error) {
        inputField.value = "Invalid Calculation!";
        speakResult("Sorry, I couldn't calculate that.");
    }
};

function speakResult(text) {
    let utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
}
