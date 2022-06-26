const colorButton = document.querySelector("#color-btn");
const rgbColor = document.querySelector("#rgb-color");
const hexColor = document.querySelector("#hex-color");
const hslColor = document.querySelector("#hsl-color");
const clipboardButtons = document.querySelectorAll(".clipboard-button");



function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

colorButton.addEventListener("click", () => {
    document.body.style.backgroundColor = randomColor();
    rgbColor.textContent = document.body.style.backgroundColor.toString().replace("(", " ").replace(")", " ").toUpperCase();
    hexColor.textContent = rgbColor.textContent.replace(", ", " ").replace(", ", " ").replace("RGB", "");
    hslColor.textContent = rgbColor.textContent.replace(", ", " ").replace(", ", " ").replace("HSL", "");
    let hexArray = hexColor.textContent.split(" ");
    let hslArray = hslColor.textContent.split(" ");
    hexArray.pop();
    hexArray.shift();
    hslArray.pop();
    hslArray.shift();
    hexColor.textContent = `${"HEX"} ${rgbToHex(parseInt(hexArray[0]), parseInt(hexArray[1]), parseInt(hexArray[2])).toString().toUpperCase()}`;
    hslColor.textContent = `${"HSL"} ${rgbToHsl(Math.round(hslArray[0]) , Math.round(hslArray[1]) , Math.round(hslArray[2])).toString()}`;
    document.body.style.transition = "background-color 0.5s";
});

const randomColor = () => {
    return `rgb(${Math.floor(Math.random() * 256)}, 
    ${Math.floor(Math.random() * 256)}, 
    ${Math.floor(Math.random() * 256)})`;
};


function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}


function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

const rgbToHsl = (r, g, b) => {
    r /= 255;
    g /= 255;
    b /= 255;

    const l = Math.max(r, g, b);
    const s = l - Math.min(r, g, b);
    const h = s ?
        l === r ?
        (g - b) / s :
        l === g ?
        2 + (b - r) / s :
        4 + (r - g) / s :
        0;
    return [(60 * h < 0 ? 60 * h + 360 : 60 * h).toFixed(1), 
      (100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0)).toFixed(1), 
      ((100 * (2 * l - s)) / 2).toFixed(1)];
};

clipboardButtons[0].addEventListener("click", () => navigator.clipboard.writeText(rgbColor.innerHTML.toLowerCase()));

clipboardButtons[1].addEventListener("click", () => navigator.clipboard.writeText(hexColor.innerHTML.toLowerCase()));

clipboardButtons[2].addEventListener("click", () => navigator.clipboard.writeText(hslColor.innerHTML.toLowerCase()));
