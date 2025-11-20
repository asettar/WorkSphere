import { rooms, employeesData} from "./setup.js";
import {createAvailableEmployeeCard, createRoomEmployeeCard, addUnassignedEmployee} from './cardsCreation.js'
import {addErrorMessage} from "./formValidate.js"

const popUpSection = document.getElementById('room-popup-section')
const popUpEmployeescontainer = popUpSection.querySelector('.room-employees-container')
const popupConfirmBtn = document.getElementById('confirm-btn-room');
const popupCancelBtn = document.getElementById('cancel-btn-room');
let   currentRoom = null, currentSelectedEmployees = [];  // to track selected employees on addition event 

function    showPopup() {
    popUpSection.style.display = 'flex';
}

function    closePopup() {
    popUpSection.style.display = 'none';
    popUpEmployeescontainer.innerHTML = '';
}

function    isUnassignedEmpolyee(employee) {
    return (employee.room === "unassigned");
}

function    isAvailableRole(employeeRole, roomData) {
    return roomData.availablesRoles.includes(employeeRole);
}

function    roomCapacityReached() {
    let currentEmployeesCount = currentSelectedEmployees.length + rooms[currentRoom].currentEmployees;
    // console.log(currentRoom, "roomcapacity:", rooms);
    // console.log(rooms[currentRoom].currentEmployees, currentEmployeesCount, "max:", rooms[currentRoom].maxEmployees);
    return currentEmployeesCount === rooms[currentRoom].maxEmployees;
}

function    addEmployeeSelectionEvent(employeeCard, employeeData) {
    // 'selected-employee' class to employeecard
    if (employeeCard.classList.contains('selected-employee')) {
        employeeCard.classList.remove('selected-employee');
        currentSelectedEmployees = currentSelectedEmployees.filter(elem => elem.id !== employeeData.id);
    }

    else {
        if (roomCapacityReached()) {
            // alert("max is reached");
            const error = addErrorMessage("room capacity have been reached");
            employeeCard.after(error);
            setTimeout(() => {
                error.remove();
            }, 1200);
            return ;
        }
        employeeCard.classList.add('selected-employee');
        currentSelectedEmployees.push(employeeData);
    }
}

function    addAvailableEmployee(employee) {
    let availableEmployee = createAvailableEmployeeCard(employee);
    popUpEmployeescontainer.appendChild(availableEmployee);
    // add selection event
    availableEmployee.addEventListener('click',  () => addEmployeeSelectionEvent(availableEmployee, employee));
}


function showAvailablesEmployees(roomData) {
    for (let employee of employeesData) {
        if (isUnassignedEmpolyee(employee) && isAvailableRole(employee.role, roomData))
            addAvailableEmployee(employee);
    }
}

function    removeUnassignedEmployee(employee) {
    const unassignedCard = document.getElementById(`unassigned-employee${employee.id}`);
    unassignedCard.remove();
}

function    removeEmployeeFromRoom(employeeCard, emoplyeeData) {
    employeeCard.remove();
    addUnassignedEmployee(emoplyeeData);
    rooms[currentRoom].currentEmployees--;
}

export function    addEmployeeToRoom(employee, roomName) {
    const employeesContainer = document.getElementById(roomName).querySelector('.room-card'); 
    const roomEmployee = createRoomEmployeeCard(employee);
    
    employeesContainer.appendChild(roomEmployee);
    employee.room = roomName; // change it's room in data
    rooms[roomName].currentEmployees++;

    // deletion event
    const deleteBtn = roomEmployee.querySelector('.delete-employee-room'); 
    deleteBtn.addEventListener('click', () => removeEmployeeFromRoom(roomEmployee, employee));
}


function    addSelectedEmployees() {

    for (let employee of currentSelectedEmployees) {
        // remove from unassigned part
        removeUnassignedEmployee(employee);
        // add to room
        addEmployeeToRoom(employee, currentRoom);
    }
}

function    addRoomAdditionButtonEvent(roomCard, roomData, roomName) {
    const additionButton = roomCard.querySelector('.add-employee-room');
   
    additionButton.addEventListener('click', () => {
        currentRoom = roomName;
        currentSelectedEmployees = [];
        showPopup();
        showAvailablesEmployees(roomData);
    })
}

window.addEventListener("DOMContentLoaded", () => {
    for (let [roomName, roomData] of Object.entries(rooms)) {
        const roomCard = document.getElementById(roomName);
        // console.log(roomCard);
        // todo: update style if it is empty(pale color if it is empty)
        // updateRoomStyle();
        // additionEvent
        // console.log(roo)
        addRoomAdditionButtonEvent(roomCard, roomData, roomName);
    }
});



// event
popupConfirmBtn.addEventListener('click', () => {
    addSelectedEmployees();
    closePopup();
});
popupCancelBtn.addEventListener('click', closePopup);


