import {employeesData, removeEmployeeData, addNewEmployeeData} from './setup.js';
import {showForm, prefillFormData, resetAndCloseForm, getEmployeeData} from './formUtils.js';
import {isValidForm} from "./formValidate.js";

const addButton = document.getElementById('add-btn');
const confirmButton = document.getElementById('confirm-btn');
const cancelButton = document.getElementById('cancel-btn');
let   currentEditCard = null, currentEditData = null;  // to track mode(edit or add)

export function    editEmployee(employee, employeeCard) {
    console.log("edit clicked");
    currentEditCard = employeeCard, currentEditData = employee;
    showForm();
    prefillFormData(employee);
}

export function    deleteEmployee(employee, employeeCard) {
    if (confirm(`Employe with name : ${employee.name} will be deleted, are you sure?`));
    employeeCard.remove();
    removeEmployeeData(employee);
}

export function viewEmployee(employee) {
    console.log("view");
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
    console.log(employeeData);
}

const isAdditionMode = () => currentEditCard === null;

// events
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

