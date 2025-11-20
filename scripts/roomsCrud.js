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
            }, 1400);
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
        if (isAvailableRole(employee.role, roomData))
            addAvailableEmployee(employee);
    }
}

function    removeUnassignedEmployee(employee) {
    const unassignedCard = document.getElementById(`unassigned-employee${employee.id}`);
    unassignedCard.remove();
}

function    removeEmployeeFromRoom(employeeCard) {
    employeeCard.remove();
    rooms[currentRoom].currentEmployees--;
}

export function    addEmployeeToRoom(employee, roomName) {
    const employeesContainer = document.getElementById(roomName).querySelector('.room-card'); 
    const employeeCard = createRoomEmployeeCard(employee);
    
    employeesContainer.appendChild(employeeCard);
    employee.room = roomName; // change it's room in data
    rooms[roomName].currentEmployees++;

    // deletion event
    const deleteBtn = employeeCard.querySelector('.delete-employee-room'); 
    deleteBtn.addEventListener('click', () => {
        removeEmployeeFromRoom(employeeCard);
        addUnassignedEmployee(employee);
    });
}


function    addSelectedEmployees() {

    for (let employee of currentSelectedEmployees) {
        if (employee.room === "unassigned") removeUnassignedEmployee(employee);
        else removeEmployeeFromRoom(document.getElementById(`room-employee${employee.id}`));
        
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


