const searchInput = document.getElementById('search-input');
const roleFilter = document.getElementById('search-input');

function    getEmployeeName(card) {
    const nameRole = card.querySelector('.name-role');
    console.log(nameRole.firstElementChild.innerText.toLowerCase());
    return nameRole.firstElementChild.innerText.toLowerCase();
}

function    getEmployeeRole(card) {
    const nameRole = card.querySelector('.name-role');
    console.log(nameRole.lastElementChild.innerText.toLowerCase());
    return nameRole.lastElementChild.innerText.toLowerCase();
}

function    matchSearchBar(name, role) {
    const searchValue = searchInput.value.toLowerCase();
    return (name.startsWith(searchValue)|| role.startsWith(searchValue));
}

function    filterCards() {
    console.log("executing filter");
    const employeesCards = document.querySelectorAll('.employee-card');
    for (const card of employeesCards) {
        console.log(card);
        const name = getEmployeeName(card);
        const role = getEmployeeRole(card);
        if (matchSearchBar(name, role))
            card.style.display = 'grid';
        else card.style.display = 'none';
    }
}

searchInput.addEventListener('input', filterCards);
// roleFilter.addEventListener('change', filterCards);