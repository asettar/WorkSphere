import {employeesData, removeEmployeeData, addNewEmployeeData} from './setup.js';
import {showForm, prefillFormData, resetAndCloseForm, getEmployeeData} from './formUtils.js';
import {isValidForm} from "./formValidate.js";
import { addUnassignedEmployee } from './cardsCreation.js';

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

function    addNewEmployee() {
    const employee = {id: Date.now()};
    getEmployeeData(employee);
    console.log("new employee");
    console.log(employee);
    addNewEmployeeData(employee);
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
        // update Data based on current Mode(edit/delete)
        if (isAdditionMode()) {
            // add New Wrok
            addNewEmployee();
        }
        else {

        }
        resetAndCloseForm();
    }
});

cancelButton.addEventListener('click', (event) => {
    event.preventDefault();
    console.log("cancel clicked");
    // return ;
    resetAndCloseForm(); 
});

