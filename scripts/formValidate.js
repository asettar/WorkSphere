// form data:
const form = document.querySelector('form');
const nameInput = document.getElementById('name-input')
const roleInput = document.getElementById('role-input');
const phonenumInput = document.getElementById('phonenum-input');
const mailInput = document.getElementById('mail-input');
const pictureInput = document.getElementById('picture-input');


// errors styles updates
function    addErrorMessage(message) {
    const error = document.createElement('p');
    error.innerHTML = message; 
    error.style.color = 'red';
    error.style.fontSize = '11px';
    error.style.fontFamily = 'Arial, sans-serif';
    return error;
}

function    addError(input, errorMsg) {
    input.style["border-color"] = 'red';
    const parent = input.parentElement;
    const error = input.nextElementSibling;

    // add an error
    if (!error) {
        const error = addErrorMessage(errorMsg);
        parent.appendChild(error);
    }
    input.focus();
}

function    updateStyleOnSuccess(input) {
    const error = input.nextElementSibling;
    input.style["border-color"] = 'green';
    if (error)   // error paragraph exist
        error.remove();
}


// fucntions to  check validation of inputs feilds

function    isValidPhoneNumber() {
    const pattern = /^(\+212|0)\d{9}$/
    const isValid = pattern.test(phonenumInput.value);

    if (isValid) updateStyleOnSuccess(phonenumInput);
    else  addError(phonenumInput, "Phone number consits of exactly 9 digits and starts with either 0 or +212");
    return isValid;
}

function    isValidName() {
    const pattern = /^[a-zA-Z]{4,}\s[a-zA-Z]{4,}$/;
    const isValid = pattern.test(nameInput.value);
    
    if (isValid) updateStyleOnSuccess(nameInput);
    else
        addError(nameInput, "syntax:[firstname secondName], first and second name consists of only alphabetic characters, and each has at least lenght of 4")
    return isValid;
}

function    isValidEmail() {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const isValid = pattern.test(mailInput.value);

    if (isValid) updateStyleOnSuccess(mailInput);
    else  addError(mailInput, "invalid mail");
    return isValid;
}

function    isValidPicture() {
    if (!pictureInput.value) pictureInput.value = "https://cdn-icons-png.flaticon.com/512/12225/12225935.png";
    const img = pictureInput.nextElementSibling;
    img.src = pictureInput.value;
    return true;
}

export function isValidForm() {
    return (isValidName() && isValidPhoneNumber() && isValidEmail() && isValidPicture()
        );
}

// events:
nameInput.addEventListener('input', isValidName);
phonenumInput.addEventListener('input', isValidPhoneNumber);
mailInput.addEventListener('input', isValidEmail);
pictureInput.addEventListener('input', isValidPicture);