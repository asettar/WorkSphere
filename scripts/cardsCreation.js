import {editEmployee, viewEmployee, deleteEmployee} from "./crud.js"


const   unassignedContainer = document.getElementById('employees-container');

function    createNewaUnassignedCard(employee) {
    const newUnassignedCard = document.createElement('div');
    newUnassignedCard.classList.add('employee-card');
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
}