import { canvas, takeScreenSize, takeStep, takeWallArray, checkItem, takeObjectsArray } from "/scripts/script.js";

let sizeOfScreen = takeScreenSize();
let step = takeStep();
let wallArray = takeWallArray();
let canvasLeft = (sizeOfScreen - 300) / 2;
let canvasTop = Math.floor(canvasLeft / 2);
let objectsArray = takeObjectsArray();

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

        // console.log(objectX, objectY);
        checkItem(objectX, objectY, objectsArray);

        setTimeout(() => {
            object.style.transition = 'none';
        }, 300);
    }
    
}

function simulateKeyPress(key) {
    switch (key) {
        case "ArrowUp":
            moveObject(0, -step, wallArray);
            break;
        case "ArrowDown":
            moveObject(0, step, wallArray);
            break;
        case "ArrowLeft":
            moveObject(-step, 0, wallArray);
            break;
        case "ArrowRight":
            moveObject(step, 0, wallArray);
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

export function drawButton(x, y, width, height, text) {
    ctx.fillStyle = "#0077FF";
    ctx.fillRect(x, y, width, height);
    ctx.fillStyle = "#FFFFFF"; 
    ctx.font = "20px Arial"; 
    ctx.fillText(text, x + 10, y + 30); 
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