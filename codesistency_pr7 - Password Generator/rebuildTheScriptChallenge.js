const passwordInput = document.getElementById("password");
const lengthSlider = document.getElementById("length");
const lengthDisplay = document.getElementById("length-value");
const uppercaseCheckbox = document.getElementById("uppercase");
const lowercaseCheckbox = document.getElementById("lowercase");
const numbersCheckbox = document.getElementById("numbers");
const symbolsCheckbox = document.getElementById("symbols");
const generateBtn = document.getElementById("generateBtn");
const copyButton = document.getElementById("copy-btn");
const strengthBar = document.querySelector(".strength-bar");
const strengthLabel = document.getElementById("strength-label");

const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
const numberCharacters = "0123456789";
const symbolCharacters = "@!#$%^&*()-_=+[]{}|;:,.<>?/";

lengthDisplay.textContent = lengthSlider.value;
lengthSlider.addEventListener("input", () => {
    lengthDisplay.textContent = lengthSlider.value;
});
generateBtn.addEventListener("click", makePassword);

function makePassword () {
    const length = Number(lengthSlider.value);
    const includeUpperCase = uppercaseCheckbox.checked;
    const includeLowerCase = lowercaseCheckbox.checked;
    const includeNumbers = numbersCheckbox.checked;
    const includeSymbols = symbolsCheckbox.checked;

    if(!includeUpperCase&&!includeLowerCase&&!includeNumbers&&!includeSymbols) {
        alert("Please select at least one character type.");
        return;
    }

    const newPassword = makeRandomPassword(
        length, 
        includeUpperCase, 
        includeLowerCase, 
        includeNumbers, 
        includeSymbols
    );
    console.log(newPassword);
    passwordInput.value = newPassword;
    updateStrengthMeter(newPassword);
}

function makeRandomPassword(length, includeUpperCase, includeLowerCase, 
    includeNumbers, includeSymbols
) {
    let allCharacters = "";

    if(includeUpperCase) allCharacters+=uppercaseLetters;
    if(includeLowerCase) allCharacters+=lowercaseLetters;
    if(includeNumbers) allCharacters+=numberCharacters;
    if(includeSymbols) allCharacters+=symbolCharacters;

    let password = "";
    for(let i=0;i<length;i++) {
        const randomIndex = Math.floor(Math.random()*allCharacters.length);
        password += allCharacters[randomIndex];
    }
    console.log(password)
    return password;
}

function updateStrengthMeter(password) {
    const passwordLength = password.length;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSymbols = /[@!#$%^&*()-_=+[\]{}|;:,.<>?]+/.test(password);
    
    let strengthScore = 0;

    strengthScore += Math.min(passwordLength*2, 40);

    if(hasUppercase) strengthScore+=15;
    if(hasLowercase) strengthScore+=15;
    if(hasNumbers) strengthScore+=15;
    if(hasSymbols) strengthScore+=15;
    console.log(hasUppercase)
    console.log(hasLowercase)
    console.log(hasNumbers)
    console.log(hasSymbols)
    console.log(strengthScore)

    if(passwordLength < 8) {
        strengthScore = Math.min(strengthScore, 40);
    }
    const safeScore = Math.max(5, Math.min(100, strengthScore));
    strengthBar.style.width = safeScore + "%";

    let strengthLabelText = "";
    let barColor = "";

    if(safeScore < 40) {
        barColor = "#fc8181";
        strengthLabelText = "Weak";
    } else if(safeScore<70) {
        barColor = "#fbd38d";
        strengthLabelText = "Medium";
    } else {
        barColor = "#68d391"
        strengthLabelText = "Strong";
    }
    strengthBar.style.backgroundColor = barColor;
    strengthLabel.textContent = strengthLabelText;
}

copyButton.addEventListener("click", ()=> {
    if(passwordInput.value=="") return;
    navigator.clipboard.writeText(passwordInput.value)
    .then(showCopySuccess)
    .catch((error)=>console.log(error));
});
function showCopySuccess() {
        copyButton.classList.remove("las", "la-copy");
    copyButton.classList.add("las", "la-check");

    setTimeout(() => {
        copyButton.classList.remove("las", "la-check");
        copyButton.classList.add("las", "la-copy");
    }, 1500);
}