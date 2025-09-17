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

async function click(aoaoaoaoa) {
    return new Promise(resolve => {
        aoaoaoaoa.onclick = () => {
            resolve();
        };
    });
}

async function dialogue(arr) {
    let box = document.getElementById("diabox");
    box.innerHTML = "";
    let id = 0;
    let continuous = false;
    let nextButton = "<p class=\"b612-mono-regular\">" +
        "<span class='continue_button'>(click to continue)</span></p>";
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
            case "continuous":
                shouldPrint = false;
                continuous = true;
                break;
            case "endcontinuous":
               shouldPrint = false;
               continuous = false;
               break;
            default:
                shouldPrint = false;
        }
        if (shouldPrint) {
            htmlItem = htmlItem + "</p>";
            box.innerHTML = box.innerHTML + htmlItem;
            if (continuous) {
                await sleep(250);
            } else {
                let temp = box.innerHTML; //bad but should work
                box.innerHTML = box.innerHTML + nextButton;
                await click(box);
                box.innerHTML = temp;
            }
            await asyncText(String(id), phrase[1]);
        }
        id++;
    }
}