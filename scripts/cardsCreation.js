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

export function    addUnassignedEmployee(employee) {
    const newUnassignedCard = createNewaUnassignedCard(employee);
    unassignedContainer.appendChild(newUnassignedCard);
}