// form data:
const form = document.querySelector('form');
const nameInput = document.getElementById('name-input')
const roleInput = document.getElementById('role-input');
const phonenumInput = document.getElementById('phonenum-input');
const mailInput = document.getElementById('mail-input');
const pictureInput = document.getElementById('picture-input');


// errors styles updates
export function    addErrorMessage(message) {
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
    let error = input.nextElementSibling;
    if (error) error.remove();
    
    // add an error
    error = addErrorMessage(errorMsg);
    parent.appendChild(error);
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
    else  addError(mailInput, "invalid mail, format: Format: example@mail.com");
    return isValid;
}

function    isValidPicture() {
    if (!pictureInput.value) pictureInput.value = "https://cdn-icons-png.flaticon.com/512/12225/12225935.png";
    const img = pictureInput.nextElementSibling;
    img.src = pictureInput.value;
    return true;
}

export function isValidDescription(description) {
    const pattern = /^[a-zA-Z]{4,}$/
    const isValid = pattern.test(description.value);

    if (isValid) updateStyleOnSuccess(description);
    else  addError(description, "Message should contain only alphabetic characters and has at least a lenght of 4.");
    return isValid;
}

function    isValidDescriptions() {
    const descriptions = form.querySelectorAll('.experience-description');
    for (let description of descriptions) {
        if (!isValidDescription(description)) return false;
    }
    return true;
}

function    isValidDateOrder(startDate, endDate) {
    if (!startDate.value || !endDate.value) return true;
    
    if (endDate.value > startDate.value) {
        updateStyleOnSuccess(endDate);
        return true;
    }
    else addError(endDate, "end date should be greater than end date");
    return false;
}

export  function    isValidDate(dateInput, startDate, endDate) {
    let dateValue = dateInput.value;
    let isValid = true;
    if (!dateValue) isValid = false;
    else {
        const dates = dateValue.split('-').map(e => parseInt(e));
        if (dates[0] > 2025 || dates[1] > 12 || dates[2] > 31) isValid = false;
    }
    if (!isValid) addError(dateInput, "Invalid date.");
    else  isValid = isValidDateOrder(startDate, endDate);
    if (isValid) updateStyleOnSuccess(dateInput);
    return isValid;
}


function    isValidDates() {
    const startDates = form.querySelectorAll('.experience-start-date');
    const endDates = form.querySelectorAll('.experience-end-date');

    for (let i = 0; i < startDates.length; i++) {
        if (!isValidDate(startDates[i], startDates[i], endDates[i]) || !isValidDate(endDates[i], startDates[i], endDates[i]))
            return false;
    }
    return true;
}

export function isValidCompanyOrPostName(input) {
    const value = input.value.trim();
    if (value)
        updateStyleOnSuccess(input);
    else addError(input, "Invalid company name");
    return value !== "";
}

function    isValidCompanyAndPostNames() {
    const posts = form.querySelectorAll('.post-input');
    const companies = form.querySelectorAll('.company-input');
    for (let company of companies) {
        if (!isValidCompanyOrPostName(company)) return false;
    }
    for (let post of posts) {
        if (!isValidCompanyOrPostName(post)) return false;
    }
    return true;
}

export function isValidForm() {
    return (isValidName() && isValidPhoneNumber() && isValidEmail() && isValidPicture()
        && isValidDates() && isValidDescriptions() && isValidCompanyAndPostNames());
}


// events:
nameInput.addEventListener('input', isValidName);
phonenumInput.addEventListener('input', isValidPhoneNumber);
mailInput.addEventListener('input', isValidEmail);
pictureInput.addEventListener('input', isValidPicture);