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
generateBtn.addEventListener('click', makePassword);

function makePassword() {
    const length = Number(lengthSlider.value);
    const includeUpperCase = uppercaseCheckbox.checked;
    const includeLowerCase = lowercaseCheckbox.checked;
    const includeNumbers = numbersCheckbox.checked;
    const includeSymbols = symbolsCheckbox.checked;
    if(!includeUpperCase && !includeLowerCase && !includeNumbers && !includeSymbols) {
        alert("Please select at least one character type.");
        return;
    }
    const newPassword = createRandomPassword(
        length, 
        includeUpperCase, 
        includeLowerCase, 
        includeNumbers, 
        includeSymbols);
    passwordInput.value = newPassword;
    updateStrengthMeter(newPassword);
}

function updateStrengthMeter(password) {
    const passwordLength = password.length;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSymbols = /[@!#$%^&*()-_=+[\]{}|;:,.<>?]/.test(password);
    console.log(hasSymbols);
    let strengthScore = 0;

    // min strength score is first arg and 2nd is 40 at max;
    // this makes sure that the strength length at 24 max when doubled
    // the max length alone contributes 40% to the final strengthScore.
    
    // so kung mo palabi na, learn to let go, animal.😭

    // another key insight: so below is a series of 'if statements',
    // if all conditions is true. This means that they contribute 60%
    // in total. And password length contributes to 
    // 40% at max strengthScore.
    // scenario: strengthLength = 18*2 = 36%.
    // purpose: ensuring that the strength is capped max at 40%
    strengthScore += Math.min(passwordLength * 2, 40);

    // each condition contributes 15%
    if(hasUppercase) strengthScore += 15;
    if(hasLowercase) strengthScore += 15;
    if(hasNumbers) strengthScore += 15;
    if(hasSymbols) strengthScore += 15;

    // enforce minimum score for every short password
    // if password length is below 8, then that 
    // password length contributes that amount of percentage plus 
    // the checkbox(if conditions) contributions.
    if(passwordLength < 8) {
        strengthScore = Math.min(strengthScore, 40);
    }

    // ensure the width of the strength bar is a valid percentage
    const safeScore = Math.max(5, Math.min(100, strengthScore));
    strengthBar.style.width = safeScore + "%";

    let strengthLabelText = "";
    let barColor = "";

    if(safeScore < 40) {
        barColor = "#fc8181"; // Red
        strengthLabelText = "Weak";
    } else if (safeScore < 70) {
        barColor = "#fbd38d"; // Yellow
        strengthLabelText = "Medium";
    } else {
        barColor = "#68d391"; // Green
        strengthLabelText = "Strong";
    }
    strengthBar.style.backgroundColor = barColor;
    strengthLabel.textContent = strengthLabelText;
}

function createRandomPassword(length, includeUpperCase, includeLowerCase, 
    includeNumbers, includeSymbols) {
    
    let allCharacters = "";

    if(includeUpperCase) allCharacters += uppercaseLetters;
    if(includeLowerCase) allCharacters += lowercaseLetters;
    if(includeNumbers) allCharacters += numberCharacters;
    if(includeSymbols) allCharacters += symbolCharacters;

    let password = "";
    for(let i=0; i < length; i++) {
        const randomIndex = Math.floor(Math.random()*allCharacters.length);
        password += allCharacters[randomIndex];
    }
    return password;
}


// enable copy event then pass the newPassword
copyButton.addEventListener("click", () => {
    if(passwordInput.value=="") return;
    navigator.clipboard.writeText(passwordInput.value)
        .then(()=> showCopySuccess())
        .catch((error) => console.log("Could not copy:", error));
});

function showCopySuccess() {
    copyButton.classList.remove("las", "la-copy");
    copyButton.classList.add("las", "la-check");
    copyButton.style.color = "#48bb78";
    
    setTimeout(()=> {
        copyButton.classList.remove("las", "la-check");
        copyButton.classList.add("las", "la-copy");
        copyButton.style.color = "";
    }, 1500);
    
}