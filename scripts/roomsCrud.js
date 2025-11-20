import { rooms, employeesData} from "./setup.js";
import {createAvailableEmployeeCard, createRoomEmployeeCard} from './cardsCreation.js'

const popUpSection = document.getElementById('room-popup-section')
const popUpEmployeescontainer = popUpSection.querySelector('.room-employees-container')
const popupConfirmBtn = document.getElementById('confirm-btn-room');
const popupCancelBtn = document.getElementById('cancel-btn-room');
let   currentRoom = null, currentSelectedEmployees = [];  // to track selected employees on addition event 

function    showPopup() {
    console.log("dewpfefowpe");
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

function    addEmployeeSelectionEvent(employeeCard, employeeData) {
    // 'selected-employee' class to emplyeecard
    if (employeeCard.classList.contains('selected-employee')) {
        employeeCard.classList.remove('selected-employee');
        currentSelectedEmployees = currentSelectedEmployees.filter(elem => elem.id !== employeeData.id);
    }

    else {
        // todo: check if max is reached
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

function    addEmployeeToRoom(employee, employeesContainer) {
    employee.room = currentRoom;  // change it's room in data
    const roomEmployee = createRoomEmployeeCard(employee);
    employeesContainer.appendChild(roomEmployee);
}

function    addSelectedEmployees() {
    console.log(currentRoom);
    const employeesContainer = document.getElementById(currentRoom).querySelector('.room-card'); 
    console.log(employeesContainer);

    for (let employee of currentSelectedEmployees) {
        // remove from unassigned part
        removeUnassignedEmployee(employee);
        // add to room
        addEmployeeToRoom(employee, employeesContainer);
    }
}

function    addRoomAdditionButtonEvent(roomCard, roomData, roomName) {
    const additionButton = roomCard.querySelector('.add-employee-room');
   
    additionButton.addEventListener('click', () => {
        //todo message if max is attended and return
        currentRoom = roomName;
        currentSelectedEmployees = [];
        showPopup();
        showAvailablesEmployees(roomData);
    })
}

for (let [roomName, roomData] of Object.entries(rooms)) {
    const roomCard = document.getElementById(roomName);
    console.log(roomCard);
    // todo: update style if it is empty(pale color if it is empty)
    // updateRoomStyle();
    // additionEvent
    // console.log(roo)
    addRoomAdditionButtonEvent(roomCard, roomData, roomName);
}



// event
popupConfirmBtn.addEventListener('click', () => {
    addSelectedEmployees();
    closePopup();
});
popupCancelBtn.addEventListener('click', closePopup);