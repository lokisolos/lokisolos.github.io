function findMatches(word) {
    let result = [];
    word = word.toLowerCase().replace(/_/g, "\\w").replace(/\s/g, "\\s");
    for (let i = 0; i < wordsList.length; i++) {
        let currentWord = wordsList[i].toLowerCase();
        let match = currentWord.match(`^${word}$`);
        if (match) {
            // console.log(match);
            result.push(match[0].replace(/\\s/g, " "));
        }
    }
    return result;
}

function exit() {
    helpCard.style = "opacity: 0";
    helpBackground.style = "opacity: 0; z-index: 0";
    body.style = "overflow: auto";
}

function updateMatches(key) {
    if (key) if (key.code == "ShiftLeft" || key.code == "ShiftRight") return;
    let matches = findMatches(input.value);
    ul.innerHTML = "";
    characterCount.innerHTML = `${input.value.length} Character${
        input.value.length == 1 ? "" : "s"
    }, ${input.value.length != 0 ? input.value.split(" ").length : 0} Word${
        input.value.split(" ").length == 1 && input.value.length != 0 ? "" : "s"
    }, ${findMatches(input.value).length} Match${
        findMatches(input.value).length != 1 ? "es" : ""
    }`;
    for (let i = 0; i < matches.length; i++) {
        let child = document.createElement("li");
        child.role = "button";
        child.innerHTML = matches[i];
        child.onclick = () => {
            navigator.clipboard.writeText(matches[i]);
        };
        ul.appendChild(child);
    }
}

const input = document.getElementById("main");
const helpButton = document.getElementById("HelpButton");
const ul = document.getElementsByTagName("ul")[0];
const characterCount = document.getElementById("character-count");
const helpCard = document.getElementById("helpcard");
const helpBackground = document.getElementsByClassName("helpbg")[0];
const exitButton = document.getElementById("x");
const clearButton = document.getElementsByClassName("x")[0];
const container = document.getElementsByClassName("container")[0];
const body = document.getElementsByTagName("body")[0];

input.addEventListener("keyup", (key) => {
    updateMatches(key);
});

helpButton.addEventListener("click", () => {
    helpBackground.style = "opacity: 1; z-index: 6";
    helpCard.style = "opacity: 1; z-index: 7";
    container.style = "z-index";
    body.style = "overflow: hidden";
});

helpBackground.addEventListener("click", exit);
clearButton.addEventListener("click", () => {
    input.value = "";
    updateMatches();
});
