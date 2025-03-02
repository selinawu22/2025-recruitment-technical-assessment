const DATA_PATH = './data.json'

const cardContainer = document.getElementById('cardContainer');
const logoImage = document.getElementById('logoImage');

let doorOpenState = true;

const createRoomAvailableString = (roomString) => {
    roomSuffix = parseInt(roomString) === 1 ? 'room' : 'rooms';
    return `${roomString} ${roomSuffix} available`
}

const roomStatusColor = (roomString) => {
    return parseInt(roomString) <= 5 ? 'orangeColor' : 'greenColor';
}

const loadCards = () => {
    $.getJSON(DATA_PATH, (roomData) => {
        roomData.map((room) => {
            const roomName = document.createElement("p");
            roomName.innerHTML = room.name;

            const roomStatus = document.createElement('span');
            roomStatus.append(document.createTextNode('●'));
            roomStatus.classList.remove(['greenColor', 'redColor']);
            roomStatus.classList.add(roomStatusColor(room.rooms_available));

            const roomAvailable = document.createElement("p");
            roomAvailable.innerHTML = createRoomAvailableString(room.rooms_available);

            const roomLink = (room.building_file || room.building_picture).replace(/$\.\//d, '');
            
            const roomCard = document.createElement('div');
            roomCard.style.backgroundImage = `url(./assets/${roomLink})`;
            roomCard.classList.add('cardChild');

            const roomAvailableDiv = document.createElement('div');
            roomAvailableDiv.classList.add('roomAvailableDiv');
            roomAvailableDiv.appendChild(roomStatus);
            roomAvailableDiv.appendChild(roomAvailable);
            
            
            const roomNameDiv = document.createElement('div');
            roomNameDiv.classList.add('roomNameDiv');
            roomNameDiv.appendChild(roomName);

            roomCard.appendChild(roomAvailableDiv);
            roomCard.appendChild(roomNameDiv);

            cardContainer.appendChild(roomCard);
        })
    })
}

const manageDoorState = () => {
    doorOpenState = !doorOpenState;
    if (doorOpenState) {
        logoImage.src = './assets/freeroomsLogo.png'
    } else {
        logoImage.src = './assets/freeroomsDoorClosed.png'
    }
}

window.addEventListener("load", loadCards);
logoImage.addEventListener("click", manageDoorState);

