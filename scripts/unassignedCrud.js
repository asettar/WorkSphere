import {employeesData, removeEmployeeData, addNewEmployeeData} from './setup.js';
import {showForm, prefillFormData, resetAndCloseForm, getEmployeeData} from './formUtils.js';
import {isValidForm} from "./formValidate.js";
import {removeEmployeeFromRoom} from './roomsCrud.js'; 
import {addUnassignedEmployee} from './cardsCreation.js';

const addButton = document.getElementById('add-btn');
const confirmButton = document.getElementById('confirm-btn');
const cancelButton = document.getElementById('cancel-btn');
const viewPopup = document.getElementById('employee-view-section');
const viewPopupcloseBtn = document.getElementById('close-employee-info');
const unassignedContainer = document.querySelector('.unassigned-container');
console.log("container", unassignedContainer);

let   currentEditCard = null, currentEditData = null;  // to track mode(edit or add)

export function    editEmployee(employee, employeeCard) {
    console.log("edit clicked");
    currentEditCard = employeeCard, currentEditData = employee;
    showForm();
    prefillFormData(employee);
    // confirm/cancel events will continue 
}

export function    deleteEmployee(employee, employeeCard) {
    if (!confirm(`Employe with name : ${employee.name} will be deleted, are you sure?`)) return ;
    employeeCard.remove();
    removeEmployeeData(employee);
}

function    closeViewEmployeePopup() {
    viewPopup.style.display = 'none';
    const experienceCards = viewPopup.querySelectorAll('.experience-view');
    experienceCards.forEach((card, index) => {
        if (index) card.remove(); // keep first one
    });
}

export function viewEmployee(employee) {
    const employeeValues = viewPopup.querySelectorAll('.employee-info-values p');

    viewPopup.style.display = 'flex';
    document.getElementById('employee-profile-photo').src = employee.photo; 
    employeeValues.forEach(p => {
        p.innerHTML = employee[p.dataset.feild]; 
    });

    const experienceCard = viewPopup.querySelector('.experience-view');

    for (let i = 0; i < employee.experience.length; i++) {
        const newExperienceCard = i ? experienceCard.cloneNode(true) : experienceCard;
        const values = experienceCard.querySelectorAll('.experience-view-values p');
        values.forEach(p => {
            p.innerHTML = employee.experience[i][p.dataset.feild];
        });
        if (i) experienceCard.parentElement.appendChild(newExperienceCard);
    }
}

function    addNewEmployee() {
    const employee = {id: Date.now()};
    getEmployeeData(employee);
    addNewEmployeeData(employee);
}

function    updateEmployee() {
    const employeeCard = currentEditCard, employeeData = currentEditData;
    getEmployeeData(employeeData);
    // update the card
    const profileImage = employeeCard.firstElementChild;
    const nameAndRole = profileImage.nextElementSibling;
    profileImage.src = employeeData.photo;
    nameAndRole.innerHTML = `
        <span>${employeeData.name}</span>
        <br>
        <span>${employeeData.role}</span>
    `; 
    localStorage.setItem('employees', JSON.stringify(employeesData));
}

const isAdditionMode = () => currentEditCard === null;

// events

viewPopupcloseBtn.addEventListener('click', closeViewEmployeePopup);

addButton.addEventListener('click', () => {
    currentEditCard = null, currentEditData = null;
    showForm();
});

confirmButton.addEventListener('click', (event) => {
    console.log("confirm clicked");
    event.preventDefault();
    // confirm
    if (isValidForm()) {
        // update Data based on current Mode(edit/addition)
        if (isAdditionMode())
            addNewEmployee();
        else updateEmployee()
        resetAndCloseForm();
    }
});

cancelButton.addEventListener('click', (event) => {
    event.preventDefault();
    console.log("cancel clicked");
    // return ;
    resetAndCloseForm(); 
});

// dragging events
unassignedContainer.addEventListener('dragover', (event) => {
    event.preventDefault();
});

unassignedContainer.addEventListener('drop', () => {
    const draggingElement = document.querySelector('.is-dragging');
    const employee = employeesData.find(e => e.id === draggingElement.dataset.id)
    if (employee.room === "unassigned") return; // already in it
    else removeEmployeeFromRoom(draggingElement, employee.room);

    addUnassignedEmployee(employee);
});