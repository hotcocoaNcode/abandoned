function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function asyncText(element, text) {
    let currentText = "";
    for (let i = 0; i < text.length; i++) {
        currentText = currentText + text[i];
        document.getElementById(element).innerText = currentText;
        await sleep(40);
    }
}

async function dialogue(arr) {
    let box = document.getElementById("diabox");
    box.innerHTML = "";
    let id = 0;
    for (const phrase of arr) {
        let htmlItem = "";
        let shouldPrint = true;
        switch (phrase[0]) {
            case "sourceless":
                htmlItem = "<p id='" + String(id) + "' class=\"b612-mono-regular\">";
                break;
            case "error":
                htmlItem = "<p id='" + String(id) + "' class=\"b612-mono-bold error_text\">";
                break;
            default:
                shouldPrint = false;
        }
        if (shouldPrint) {
            htmlItem = htmlItem + "</p>";
            box.innerHTML = box.innerHTML + htmlItem;
            await sleep(500);
            await asyncText(String(id), phrase[1]);
        }
        id++;
    }
}