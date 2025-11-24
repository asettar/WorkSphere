import {isValidDate, isValidDescription, isValidCompanyOrPostName} from './formValidate.js';   // for new Experience form events
 
const form = document.querySelector('form');
const mainContent = document.querySelector('.main-sidebar-content');
const addExperienceButton = document.getElementById('add-experience-btn');
const roleInput = document.getElementById('role-input'); 
let formInputs; // will be initialized after adding first experience form 

export  function    showForm() {
    mainContent.style.display = 'none';
    form.style.display = 'flex';
}

export function resetAndCloseForm() {
    form.reset();
    const experiences = form.querySelectorAll('.experience-form');
    experiences.forEach((elem, idx) => {
        if (idx) elem.remove();  // keep the first experience form
    });
    document.getElementById('form-profile-image').src = "";
    // update border color to default && remove previous errors
    formInputs.forEach(elem => {
        const nextSibling = elem.nextElementSibling;
        const isError = nextSibling && nextSibling.tagName === 'P';
        if (isError) nextSibling.remove(); // it's error    
        elem.style["border-color"] = 'gray';
    });

    form.style.display = 'none';
    mainContent.style.display = 'block';
}

function    deleteExperience(experienceCard) {
    experienceCard.remove();
}

function    addNewExperienceEvents(newExperience) {
    const post = newExperience.querySelector('.post-input');
    const company = newExperience.querySelector('.company-input')
    const deleteBtn = newExperience.querySelector('.delete-experience');
    const description = newExperience.querySelector('textarea');
    const startDate = newExperience.querySelector('.experience-start-date');
    const endDate = newExperience.querySelector('.experience-end-date');

    // events
    post.addEventListener('input', () => isValidCompanyOrPostName(post));
    company.addEventListener('input', () => isValidCompanyOrPostName(company));
    description.addEventListener('input', () => isValidDescription(description));
    startDate.addEventListener('change', () => isValidDate(startDate, startDate, endDate));
    endDate.addEventListener('change', () => isValidDate(endDate, startDate, endDate));
    deleteBtn.addEventListener('click', () => deleteExperience(newExperience));
}

function    addExperienceForm() {
    const newExperience = document.createElement('div');
    newExperience.classList.add('experience-form');
    newExperience.innerHTML = `
        <h3>Experience</h3>
        <div>
            <label for="">Post name</label>
            <input type="text" name="post" class="post-input" placeholder="Enter Post name">
        </div>
        <div>
            <label for="">Company name</label>
            <input type="text" name="company" class="company-input" placeholder="Enter company name">
        </div>
        <div>
            <label for="">Start Date</label>
            <input type="date" name="startDate" class="experience-start-date">
        </div>
        <div>
            <label for="">End Date</label>
            <input type="date" name="endDate" class="experience-end-date">
        </div>
        <div>
            <label for="">Description</label>
            <textarea name="Description" class = "experience-description" rows = "4" cols = "40" value="" placeholder="Enter post description" ></textarea>
        </div>
        <img class = "delete-experience" src = "Images/delete.png">
    `;
    addNewExperienceEvents(newExperience);
    form.insertBefore(newExperience, addExperienceButton);
    return newExperience;
}

export function prefillFormData(employee) {
    // prefill default inputs
    formInputs.forEach((input) => {
        input.value = employee[input.name];
    });
    roleInput.value = employee["role"];
    // profile img
    document.getElementById('form-profile-image').src = employee.photo;
    // add experiences
    let firstExperience = 1;
    for (let experience of employee.experience) {
        const newExperienceForm = firstExperience ? form.querySelector('.experience-form') : addExperienceForm();
        const currentExperienceInputs = newExperienceForm.querySelectorAll('input, textarea');
        currentExperienceInputs.forEach(input => {
            input.value = experience[input.name];
        });
        firstExperience = 0;
    }
}

export function getEmployeeData(employee) {
    formInputs.forEach((input) => {
        employee[input.name] = input.value;
    });
    employee["role"] = roleInput.value;
    // experiences
    let experiences = form.querySelectorAll('.experience-form');
    employee.experience = []; // reset experiences
    for (let experience of experiences) {
        let newExperience = {};
        const experienceInputs = experience.querySelectorAll('input, textarea');
        experienceInputs.forEach(input => {
            newExperience[input.name] = input.value;
        });
        employee.experience.push(newExperience);
    }
}

addExperienceButton.addEventListener('click', (event) => {
    event.preventDefault();
    addExperienceForm();
});

window.addEventListener('DOMContentLoaded', () => {
    const experienceForm = addExperienceForm();
    // first experience form| remove the delete option
    experienceForm.lastElementChild.remove();
    formInputs = form.querySelectorAll('input, textarea');
});