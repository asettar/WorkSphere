import {editEmployee, viewEmployee, deleteEmployee} from "./unassignedCrud.js"


const   unassignedContainer = document.getElementById('employees-container');

function    createNewaUnassignedCard(employee) {
    const newUnassignedCard = document.createElement('div');
    newUnassignedCard.classList.add('employee-card');
    newUnassignedCard.id = `unassigned-employee${employee.id}`;  // to easily remove if I need to
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
    return newUnassignedCard;
}
function    addUnassignedCardEvents(unassignedCard, employee) {
    const editButton = unassignedCard.querySelector('.edit-btn');
    const deleteButton = unassignedCard.querySelector('.delete-btn');
    const viewButton = unassignedCard.querySelector('.view-btn');

    editButton.addEventListener('click', () => editEmployee(employee, unassignedCard));
    deleteButton.addEventListener('click', () => deleteEmployee(employee, unassignedCard));
    viewButton.addEventListener('click', () => viewEmployee(employee));
}

export function    addUnassignedEmployee(employee) {
    const newUnassignedCard = createNewaUnassignedCard(employee);
    addUnassignedCardEvents(newUnassignedCard, employee);
    unassignedContainer.appendChild(newUnassignedCard);
    // change emoplyee room in case coming from remove from room
    employee.room = 'unassigned';
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
    roomEmployee.innerHTML = `
        <img src="Images/delete.png" class = "delete-employee-room" alt="">
        <div class = "name">${employee.name}</div>
    `;
    // set image background
    roomEmployee.style.backgroundImage = `url(${employee.photo})`;
    // todo : add delete btn event
    return roomEmployee;
}