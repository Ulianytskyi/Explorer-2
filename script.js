const object = document.getElementById('object');
const gameContainer = document.getElementById('game-container');

let wallArray = [];

// collider objects --------------------------------------------------

function createCollidersArray(number, objectArray, idName) {
    for (let i = 0; i < number; i++){
        let collideObject = document.createElement('div');
        collideObject.id = `${idName}`;
        collideObject.textContent = '';
        gameContainer.appendChild(collideObject);
        objectArray.push(collideObject);
    }
}

function createCollider (target, props) {
    target.style.top = props.top + 'px';
    target.style.left = props.left + 'px';
    target.style.height = props.height + 'px';
    target.style.width = props.width + 'px';
}

createCollidersArray (8, wallArray, 'wall');

let coordsArray = [
    {top: 0, left: 250, height: 200, width: 50},
    {top: 100, left: 150, height: 400, width: 50},
    {top: 300, left: 150, height: 50, width: 250},
    {top: 100, left: 350, height: 300, width: 50},
    {top: 0, left: 50, height: 400, width: 50},
    {top: 100, left: 400, height: 50, width: 50},
    {top: 200, left: 450, height: 100, width: 50},
    {top: 350, left: 400, height: 50, width: 50}
];

createCollider (wallArray[0], coordsArray[0]);
createCollider (wallArray[1], coordsArray[1]);
createCollider (wallArray[2], coordsArray[2]);
createCollider (wallArray[3], coordsArray[3]);
createCollider (wallArray[4], coordsArray[4]);
createCollider (wallArray[5], coordsArray[5]);
createCollider (wallArray[6], coordsArray[6]);
createCollider (wallArray[7], coordsArray[7]);

// player controller ------------------------------------------------------------

let objectX = 0;
let objectY = 0;

function moveObject(x, y) {
    const newX = objectX + x;
    const newY = objectY + y;

    if (newX >= 0 && newX <= 500 - object.clientWidth && 
        newY >= 0 && newY <= 500 - object.clientHeight) {
      
        const objectRect = object.getBoundingClientRect();

        for (const wall of wallArray) {
            const wallRect = wall.getBoundingClientRect();

            if (
                newX + objectRect.width > wallRect.left &&
                newX < wallRect.left + wallRect.width &&
                newY + objectRect.height > wallRect.top &&
                newY < wallRect.top + wallRect.height
            ) {
                return;
            }
        }

        objectX = newX;
        objectY = newY;
        object.style.transition = 'left 0.3s ease, top 0.3s ease';
        object.style.left = objectX + 'px';
        object.style.top = objectY + 'px';

        setTimeout(() => {
            object.style.transition = 'none';
        }, 300);
    }
}

document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowUp":
            moveObject(0, -50);
            break;
        case "ArrowDown":
            moveObject(0, 50);
            break;
        case "ArrowLeft":
            moveObject(-50, 0);
            break;
        case "ArrowRight":
            moveObject(50, 0);
            break;
    }
});

// level grid --------------------------------------

const grids = document.getElementById('grids');

let gridArray = [];

function createGrid(row, col) {

    for (let i = 0; i < row; i++) {

        let gridRow = [];

        for (let j = 0; j < col; j++) {
            
            gridRow.push(j);
        }
        gridArray.push(gridRow);    
    }
}

function displayGrid(gridArray) {
    grids.innerHTML = '';
    for (let i = 0; i < gridArray.length; i++) {
        for (let j = 0; j < gridArray[i].length; j++) {
            grids.innerHTML += `<div class='grid-cell'></div>`
        }
        grids.innerHTML += `<br>`;
    }
}

createGrid(10, 10);
displayGrid(gridArray);