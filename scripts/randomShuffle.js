import {employeesData, rooms, renderEmployeesCards} from './setup.js';
import {checkRoomStyle} from './roomsCrud.js'; 

const shuffleDiv = document.querySelector('.random-shuffle-div');
let tempRoomsCapacities = {};

function    clearCards() {
    let cards = document.querySelectorAll('.employee-card');
    cards.forEach(e => e.remove());
    cards = document.querySelectorAll('.employee-room-card'); 
    cards.forEach(e => e.remove());
    for (const roomName of Object.keys(rooms)) {
        rooms[roomName].currentEmployees = 0;
        checkRoomStyle(roomName);
    }
    tempRoomsCapacities = {};
}

function    reachMaxRoomCapacity(roomName) {
    return (tempRoomsCapacities[roomName] === rooms[roomName].maxEmployees); 
}

function    getAvailableRooms(employee) {
    let availableRooms = ["unassigned"];
    for (const [roomName, roomData] of Object.entries(rooms)) {
        if (!reachMaxRoomCapacity(roomName) && roomData.availablesRoles.includes(employee.role))
            availableRooms.push(roomName);
    }
    return  availableRooms;
}

function    randomEmployeesRoomAssignment() {
    
    for (let employee of employeesData) {
        const availableRooms = getAvailableRooms(employee);
        const randomIdx = Math.floor(Math.random() * availableRooms.length);
        employee.room = availableRooms[randomIdx];
        if (!tempRoomsCapacities[employee.room])
            tempRoomsCapacities[employee.room] = 0;
        tempRoomsCapacities[employee.room]++;
    }
}

shuffleDiv.addEventListener('click', (e) => {
    // e.preventDefault();
    clearCards();
    randomEmployeesRoomAssignment();
    renderEmployeesCards();
});
