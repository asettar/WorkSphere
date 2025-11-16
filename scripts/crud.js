import {employeesData, removeEmployeeData} from './setup.js';
import {showForm, prefillFormData, resetAndCloseForm} from './formUtils.js';
import {isValidForm} from "./formValidate.js";

const addButton = document.getElementById('add-btn');
const confirmButton = document.getElementById('confirm-btn');
const cancelButton = document.getElementById('cancel-btn');
let   currentEditCard = null, currentEditData = null;  // to track mode(edit or add)

export function    editEmployee(employee, employeeCard) {
    console.log("edit");
    currentEditCard = employeeCard, currentEditData = employee;
    showForm();
    prefillFormData(employee);
}

export function    deleteEmployee(employee, employeeCard) {
    if (confirm(`Employe with name : ${employee.name} will be deleted, are you sure?`));
    console.log(employeesData);
    employeeCard.remove();
    removeEmployeeData(employee);
    console.log(employeesData);
}

export function viewEmployee(employee) {
    console.log("view");
}



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
        // update Data based on current Mode(edit/delete)
        resetAndCloseForm();
    }
});

cancelButton.addEventListener('click', () => {
    resetAndCloseForm(); 
});
