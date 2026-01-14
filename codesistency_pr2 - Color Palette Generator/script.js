const generateBtn = document.getElementById("generate-btn");
const paletteContainer = document.querySelector(".palette-container");

generateBtn.addEventListener('click', generatePalette);
paletteContainer.addEventListener("click", function(e) {
    //This will detect whether the element 'e' we just clicked is the copy button itself
    //  by using the e.target we mean that if the target element 'e' contains the copy-btn class
    //  we do something by getting the previous Element,
    //  then we select the hex-value class then access its property with .textContent
    if(e.target.classList.contains("copy-btn")) {
        const hexValue = e.target.previousElementSibling.textContent;
    
        //This copies the hexValue textContent to the clipboard
        navigator.clipboard.writeText(hexValue)
        .then(() => showCopySuccess(e.target))
        .catch((err)=>alert(err));
    } else if (e.target.classList.contains("color")) {
        //Same logic but this is from the color itself when clicking will copy the "Next" element(<div>)
        //  which contains the hex value class as part of its children.
        const hexValue = e.target.nextElementSibling.querySelector(".hex-value").textContent;

        //Copies the next element's sibling property and textContent using queryselector.
        navigator.clipboard.writeText(hexValue)
        .then(() => showCopySuccess(e.target.nextElementSibling.querySelector(".copy-btn")))
        .catch((err)=>console.log(err));
    }
});

function showCopySuccess(element) {
    element.classList.remove("las","la-copy");
    element.classList.add("las","la-check");

    element.style.color = "#48bb78";

    setTimeout(() => {
        element.classList.remove("las","la-check");
        element.classList.add("las","la-copy");
        element.style.color = "";
    }, 1500);
}

function generatePalette() {
    const colors = [];

    for(let i=0;i<5;i++) {
        colors.push(generateRandomColors())
    }

    updatePaletteDisplay(colors)
}

function generateRandomColors() {
    const letters = "0123456789ABCDEF";
    let color = "#"

    for(let i=0;i<6;i++){
        //generate from lowest not including 16 so we use math.floor, then math.random of numbers,
        //  then make that generated number 6 times in this for loop as the index of letters,
        //  then append it in color
        color += letters[Math.floor(Math.random()*16)];
    }

    return color;
}

function updatePaletteDisplay(colors) {
    const colorsBoxes = document.querySelectorAll('.color-box');

    colorsBoxes.forEach((box, index) => {
        const color = colors[index];

        const colorDiv = box.querySelector(".color");
        const hexValue = box.querySelector(".hex-value");
        
        colorDiv.style.backgroundColor = color;
        hexValue.textContent = color;
    } )
}

generatePalette()
