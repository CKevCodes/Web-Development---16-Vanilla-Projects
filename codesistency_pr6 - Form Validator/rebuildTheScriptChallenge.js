/* This program gets all the input field from the form 
    then when the form submit is triggered the inputs are condensed 
    into an array and then this array is checked by forEach loop to 
    validate the input fields if it has value and then evaluate 
    the input field to check if each are valid, the length, 
    email text structure and password matching.
    The errors are attached to each 
    form-group(div - form field wrapper), to be 
    dynamically styled and then modify the small tag for 
    an error message.
    
*/

const form = document.getElementById('registration-form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const isRequiredValid = checkRequired([username, email, password, confirmPassword]);
    let isFormValid = isRequiredValid;

    if(isRequiredValid) {
        const isUsernameValid = checkLength(username, 3, 15);
        const isEmailValid = checkEmail(email);
        const isPasswordValid = checkLength(password, 6, 25);
        const isPasswordsMatch = checkPasswordsMatch(password, confirmPassword);

        isFormValid = isUsernameValid && isEmailValid && isPasswordValid && isPasswordsMatch;
    }

    // check if the account already exists in the Database.
    if(isFormValid) {
        alert("Registered Successfully!");
        //make a function saveRegisteredAccount(); and implement;
        document.querySelectorAll('.form-group').forEach((group) => {
            group.className = "form-group"
        });
        form.reset()
    }
});

function checkLength(input, min, max) {
    if(input.value.length < min) {
        showError(input, `${getFieldName(input)}must be at least ${min} characters.`);
        return false;
    } else if (input.value.length > max) {
        showError(input, `${getFieldName(input)}must be less than ${max} characters.`);
        return false;
    }
    return true
}
function checkEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(emailRegex.test(email.value.trim())){
        showSuccess(email);
        return true;
    } else {
        showError(email, "Email is not valid.");
        return false;
    }
}
function checkPasswordsMatch(input1, input2){
    if(input1.value.trim() !== input2.value.trim()) {
        showError(input2, "Passwords don't match.")
        return false;
    }
    return true;
}
function checkRequired(inputArray){
    let isValid = true;

    inputArray.forEach(input => {
        if(input.value.trim() == '') {
            if(input.id == "confirmPassword"){
                showError(input, `Confirm Password is required.`);
                isValid = false;
            } else {
                showError(input, `${getFieldName(input)} is required.`);
                isValid = false;
            }
        } else {
            showSuccess(input);
        }
    });
    return isValid;
}
function showSuccess(input) {
    const formGroupErrorElement = input.parentElement;
    formGroupErrorElement.className = "form-group success";
}
function showError(input, errorMessage) {
    const formGroupErrorElement = input.parentElement;
    formGroupErrorElement.className = "form-group error";
    const smallElement = formGroupErrorElement.querySelector('small');
    smallElement.innerText = errorMessage;
}
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

