import { rooms, employeesData} from "./setup.js";

const popUpSection = document.getElementById('room-popup-section')
const popupConfirmBtn = document.getElementById('confirm-btn-room');
const popupCancelBtn = document.getElementById('cancel-btn-room');
let currentRoom, currentSelectedEmployees = [];  // to track selected employees on addition event 

function    showPopup() {
    console.log("dewpfefowpe");
    popUpSection.style.display = 'flex';
}

function    showAvailablesEmployees() {

}

function    closePopup() {
    popUpSection.style.display = 'none';
    popUpSection.querySelector('.room-employees-container').innerHTML = "";
}

function    addSelectedEmployees() {
    console.log("room confirm clicked");
    console.log(currentRoom);
    console.log("currentSelectedEmployees");

}

function    addRoomAdditionButtonEvent(roomCard, roomData) {
    const additionButton = roomCard.querySelector('.add-employee-room');
   
    additionButton.addEventListener('click', () => {
        //todo message if max is attended and return
        showPopup();
        showAvailablesEmployees();
    })
}


for (let [roomName, roomData] of Object.entries(rooms)) {
    const roomCard = document.getElementById(roomName);
    console.log(roomCard);
    // todo: update style if it is empty(pale color if it is empty)
    // updateRoomStyle();
    // additionEvent
    // console.log(roo)
    addRoomAdditionButtonEvent(roomCard, roomData);
}



// event
popupConfirmBtn.addEventListener('click', addSelectedEmployees);
popupCancelBtn.addEventListener('click', closePopup);