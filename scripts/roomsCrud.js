import { rooms } from "./setup.js";
const roomPopUp = document.getElementById('room-popup')

function    showPopup() {
    popUp.style.display = 'grid';
}

function    closePopup() {
    popUp.style.display = 'none';
    popUp.innerHTML = "";
}

function    addRoomAdditionButtonEvent(roomCard, roomData) {
    const additionButton = roomCard.querySelector('.add-employee-room');
    additionButton.addEventListener('click', () => {
        // message if max is attended and return
        showPopup();
        showAvailablesEmployees();
        closePopup();
    })
}


for (let [roomName, roomData] of Object.entries(rooms)) {
    const roomCard = document.querySelectorAll(roomName);
    // todo: update style if it is empty(pale color if it is empty)
        // updateRoomStyle();
    // additionEvent
    addRoomAdditionButtonEvent(roomCard, roomData);
}
