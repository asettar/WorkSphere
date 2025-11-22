import {editEmployee, viewEmployee, deleteEmployee} from "./unassignedCrud.js"
import { employeesData } from "./setup.js";

const   unassignedContainer = document.getElementById('employees-container');

function    createNewaUnassignedCard(employee) {
    const newUnassignedCard = document.createElement('div');
    newUnassignedCard.classList.add('employee-card');
    newUnassignedCard.dataset.id = employee.id;
    newUnassignedCard.innerHTML = `
        <img class = "profile-icon" src="${employee.photo}" alt="">
        <div class = "name-role">
            <span>${employee.name}</span>
            <br>
            <span>${employee.role}</span>
        </div>
        <div class = "edit-view-delete">
            <img class="edit-btn" src="Images/edit.png" alt="">
            <img class="view-btn" src="Images/view.png" alt="">
            <img class="delete-btn" src="Images/delete.png" alt="">
        </div>
    `;
    newUnassignedCard.setAttribute('draggable', 'true');
    return newUnassignedCard;
}
function    addUnassignedCardEvents(unassignedCard, employee) {
    const editButton = unassignedCard.querySelector('.edit-btn');
    const deleteButton = unassignedCard.querySelector('.delete-btn');
    const viewButton = unassignedCard.querySelector('.view-btn');

    editButton.addEventListener('click', () => editEmployee(employee, unassignedCard));
    deleteButton.addEventListener('click', () => deleteEmployee(employee, unassignedCard));
    viewButton.addEventListener('click', () => viewEmployee(employee));
    unassignedCard.addEventListener('dragstart', () => {
        unassignedCard.classList.add('is-dragging');
    });
    unassignedCard.addEventListener('dragend', () => {
        unassignedCard.classList.remove('is-dragging');
    });
}

export function    addUnassignedEmployee(employee) {
    const newUnassignedCard = createNewaUnassignedCard(employee);
    addUnassignedCardEvents(newUnassignedCard, employee);
    unassignedContainer.appendChild(newUnassignedCard);
    // change emoplyee room in case coming from remove from room
    employee.room = 'unassigned';
    localStorage.setItem('employees', JSON.stringify(employeesData));
}


export function createAvailableEmployeeCard(employee) {
    const availableEmployee = document.createElement('div');
    availableEmployee.classList.add('employee-card');
    availableEmployee.innerHTML = `
        <img class = "profile-icon" src="${employee.photo}" alt="">
        <div class = "name-role">
            <span>${employee.name}</span>
            <br>
            <span>${employee.role}</span>
        </div>
    `;
    return availableEmployee;
}

export function createRoomEmployeeCard(employee) {
    let roomEmployee = document.createElement('div');
    roomEmployee.classList.add('employee-room-card');
    roomEmployee.dataset.id = employee.id;
    roomEmployee.innerHTML = `
        <img src="Images/delete.png" class = "delete-employee-room" alt="">
        <div class = "name">${employee.name}</div>
    `;
    roomEmployee.setAttribute('draggable', true);
    roomEmployee.addEventListener('dragstart', () => {
        console.log("start dragging from room");
        roomEmployee.classList.add('is-dragging');
    });
    roomEmployee.addEventListener('dragend', () => {
        roomEmployee.classList.remove('is-dragging');
    });
    // set image background
    roomEmployee.style.backgroundImage = `url(${employee.photo})`;
    return roomEmployee;
}