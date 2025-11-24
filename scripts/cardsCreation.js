import {editEmployee, viewEmployee, deleteEmployee} from "./unassignedCrud.js"
import { employeesData } from "./setup.js";

const   unassignedContainer = document.getElementById('employees-container');

export function    createNewaUnassignedCard(employee) {
    const newUnassignedCard = document.createElement('div');
    newUnassignedCard.classList.add('employee-card');
    newUnassignedCard.dataset.id = employee.id; // using it to directly acces the card from employee id [data-id="id"]
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

// employee-room-cards
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
    availableEmployee.style.cursor = 'auto';
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
        roomEmployee.classList.add('is-dragging');
    });
    roomEmployee.addEventListener('dragend', () => {
        roomEmployee.classList.remove('is-dragging');
    });
    // set image background
    roomEmployee.style.backgroundImage = `url(${employee.photo})`;
    return roomEmployee;
}