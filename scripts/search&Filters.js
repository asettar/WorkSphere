const searchInput = document.getElementById('search-input');
const roleFilter = document.getElementById('role-filter');

function    getEmployeeName(card) {
    const nameRole = card.querySelector('.name-role');
    return nameRole.firstElementChild.innerText.toLowerCase();
}

function    getEmployeeRole(card) {
    const nameRole = card.querySelector('.name-role');
    return nameRole.lastElementChild.innerText;
}

function    matchSearchBar(name, role) {
    const searchValue = searchInput.value.toLowerCase();
    return (name.startsWith(searchValue)|| role.startsWith(searchValue));
}

function    matchRoleFilter(role) {
    const roleFilterValue = roleFilter.value;
    return  (roleFilter.value === "" || roleFilterValue === role);
}

function    filterCards() {
    const employeesCards = document.querySelectorAll('.employee-card');
    for (const card of employeesCards) {
        const name = getEmployeeName(card);
        const role = getEmployeeRole(card);
        if (matchSearchBar(name, role) && matchRoleFilter(role))
            card.style.display = 'grid';
        else card.style.display = 'none';
    }
}

searchInput.addEventListener('input', filterCards);
roleFilter.addEventListener('change', filterCards);
window.addEventListener('DOMContentLoaded', filterCards);