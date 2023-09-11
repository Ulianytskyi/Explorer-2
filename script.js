// const content = document.getElementById('content');
const object = document.getElementById('object');
const gameContainer = document.getElementById('game-container');
const gridsField = document.getElementById('grids');
const canvas = document.getElementById('btn-canvas');

let sizeOfScreen;
if (window.innerWidth <= 700) {
    sizeOfScreen = Math.floor(window.innerWidth / 10) * 10;
    canvas.classList.remove('hide');
} else {
    sizeOfScreen = 700;
    // content.style.position = 'relative';
    // content.style.left = ((window.innerWidth - sizeOfScreen) / 2) + 'px';
    canvas.classList.add('hide');
}

gameContainer.style.width = sizeOfScreen + 'px';
gameContainer.style.height = sizeOfScreen + 'px';
gridsField.style.width = sizeOfScreen + 'px';
gridsField.style.height = sizeOfScreen + 'px';

let step = sizeOfScreen / 10;

object.style.fontSize = step * 67 / 100 + 'px';
object.style.width = step + 'px';

let canvasLeft = (sizeOfScreen - 300) / 2;
let canvasTop = Math.floor(canvasLeft / 2);

let wallArray = [];

// collider objects ------------------------------------------------------

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

// collider objects creating -----------------------------------------------

createCollidersArray (8, wallArray, 'wall');

let coordsArray = [
    {top: step * 2, left: step * 3, height: step * 8, width: step * 1},
    {top: step * 0, left: step * 5, height: step * 4, width: step * 1},
    {top: step * 6, left: step * 4, height: step * 1, width: step * 3},
    {top: step * 3, left: step * 7, height: step * 5, width: step * 1},
    {top: step * 0, left: step * 1, height: step * 8, width: step * 1},
    {top: step * 2, left: step * 7, height: step * 1, width: step * 2},
    {top: step * 4, left: step * 9, height: step * 2, width: step * 1},
    {top: step * 7, left: step * 8, height: step * 1, width: step * 1}
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

    if (newX >= 0 && newX <= sizeOfScreen - object.clientWidth && 
        newY >= 0 && newY <= sizeOfScreen - object.clientHeight) {
      
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

function simulateKeyPress(key) {
    switch (key) {
        case "ArrowUp":
            moveObject(0, -step);
            break;
        case "ArrowDown":
            moveObject(0, step);
            break;
        case "ArrowLeft":
            moveObject(-step, 0);
            break;
        case "ArrowRight":
            moveObject(step, 0);
            break;
    }
}
document.addEventListener("keydown", (e) => {
    const key = e.key;
    simulateKeyPress(key);
});


// canvas buttons ------------------------------------

const ctx = canvas.getContext("2d");

canvas.style.left = canvasLeft + 'px';
canvas.style.top = canvasTop + 'px';

function drawButton(x, y, width, height, text) {
    ctx.fillStyle = "#0077FF"; // Колір кнопки
    ctx.fillRect(x, y, width, height); // Малюємо прямокутник (кнопку)
    ctx.fillStyle = "#FFFFFF"; // Колір тексту
    ctx.font = "20px Arial"; // Розмір і шрифт тексту
    ctx.fillText(text, x + 10, y + 30); // Розміщення тексту на кнопці
}

canvas.addEventListener("click", (e) => {
    const mouseX = e.clientX - canvas.getBoundingClientRect().left;
    const mouseY = e.clientY - canvas.getBoundingClientRect().top;

    if (mouseX >= buttonUpX && mouseX <= buttonUpX + buttonWidth &&
        mouseY >= buttonUpY && mouseY <= buttonUpY + buttonHeight) {
            moveObject(0, -step); // UP
    } else if (mouseX >= buttonDownX && mouseX <= buttonDownX + buttonWidth &&
        mouseY >= buttonDownY && mouseY <= buttonDownY + buttonHeight) {
            moveObject(0, step); // DOWN
    } else if (mouseX >= buttonLeftX && mouseX <= buttonLeftX + buttonWidth &&
        mouseY >= buttonLeftY && mouseY <= buttonLeftY + buttonHeight) {
            moveObject(-step, 0); //LEFT
    } else if (mouseX >= buttonRightX && mouseX <= buttonRightX + buttonWidth &&
        mouseY >= buttonRightY && mouseY <= buttonRightY + buttonHeight) {
            moveObject(step, 0); //RIGHT
    }
});

const buttonWidth = 50;
const buttonHeight = 50;

const buttonUpX = canvas.width / 2 - buttonWidth / 2;
const buttonUpY = 10;
drawButton(buttonUpX, buttonUpY, buttonWidth, buttonHeight, "↑");

const buttonDownX = canvas.width / 2 - buttonWidth / 2;
const buttonDownY = canvas.height - buttonHeight - 10;
drawButton(buttonDownX, buttonDownY, buttonWidth, buttonHeight, "↓");

const buttonLeftX = 10;
const buttonLeftY = canvas.height / 2 - buttonHeight / 2;
drawButton(buttonLeftX, buttonLeftY, buttonWidth, buttonHeight, "←");

const buttonRightX = canvas.width - buttonWidth - 10;
const buttonRightY = canvas.height / 2 - buttonHeight / 2;
drawButton(buttonRightX, buttonRightY, buttonWidth, buttonHeight, "→");

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

// double tap disable -----------------------

let lastTouchEnd = 0;

document.addEventListener('touchend', (event) => {
    const currentTime = new Date().getTime();
    const tapDuration = currentTime - lastTouchEnd;

    if (tapDuration < 300) {
        event.preventDefault();
    }

    lastTouchEnd = currentTime;
});