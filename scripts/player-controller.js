import { gameContainer, inventoryCount, inventoryField, takeItemByIndex, infoDisplay, playerView, canvas, takeScreenSize, step, takeWallArray, checkItem, takeObjectsArray } from "/scripts/script.js";

export const stepForExport = step;

let sizeOfScreen = takeScreenSize();
let wallArray = takeWallArray();
let canvasLeft = (sizeOfScreen - 300) / 2;
let canvasTop = Math.floor(canvasLeft / 2);
let objectsArray = takeObjectsArray();

let isLocked = true;
let goalComplete = false;
// let inventoryCount = 0;


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

        checkItem(objectX, objectY, objectsArray);

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
    } else if (mouseX >= buttonUseX && mouseX <= buttonUseX + buttonWidth &&
        mouseY >= buttonUseY && mouseY <= buttonUseY + buttonHeight) {
            
            objectsArray.forEach(element => {
                if (objectX == element[1] && objectY == element[2]) {
                    if (element[3] != 'X') {
                        if (element[0] == 'Apple') {

                            let index = objectsArray.indexOf(element);
                            takeItemByIndex(index, element, element[1], element[2]);
                            playerView.textContent = '';
                            playerView.textContent = object.textContent;
                
                        } else if (element[0] == 'Bill') {
                
                            if (inventoryCount == objectsArray.length - 2) {
                                if (!goalComplete) {
                                    infoDisplay('Take this!','🔑');
                                    goalComplete = true;
                                    inventoryField.innerHTML = 'Inventory: 🔑';
                                } else {
                                    infoDisplay('You already have the key.','Go home!');
                                }
                            } else {
                                infoDisplay('Bring me all the apples!','And I`ll give you the key');
                            }
                
                        } else if (element[0] == 'House') {
                
                            if (inventoryField.innerHTML == 'Inventory: 🔑') {
                                if (isLocked) {
                                    isLocked = false;
                                    infoDisplay('It`s open!','You can come in now!');
                                } else {
                                    document.querySelector('.final-screen').classList.remove('hide');
                                    gameContainer.classList.add('hide');
                                    document.querySelector('.final-img').style.width = sizeOfScreen + 'px';
                                }
                            } else {
                                infoDisplay('Closed!', 'You need a key'); 
                            }
                
                        } 
                    }    
                }
            });
            
            // console.log(objectX, objectY, objectsArray);

    }
});

const buttonWidth = 50;
const buttonHeight = 50;

const buttonUpX = canvas.width / 4 - buttonWidth / 4;
const buttonUpY = -0;
drawButton(buttonUpX, buttonUpY, buttonWidth, buttonHeight, "↑");

const buttonDownX = canvas.width / 4 - buttonWidth / 4;
const buttonDownY = canvas.height - buttonHeight - 0;
drawButton(buttonDownX, buttonDownY, buttonWidth, buttonHeight, "↓");

const buttonLeftX = 0;
const buttonLeftY = canvas.height / 2 - buttonHeight / 2;
drawButton(buttonLeftX, buttonLeftY, buttonWidth, buttonHeight, "←");

const buttonRightX = canvas.width - buttonWidth - 125;
const buttonRightY = canvas.height / 2 - buttonHeight / 2;
drawButton(buttonRightX, buttonRightY, buttonWidth, buttonHeight, "→");

const buttonUseX = canvas.width - buttonWidth - 0;
const buttonUseY = canvas.height / 2 - buttonHeight / 2;
drawButton(buttonUseX, buttonUseY, buttonWidth, buttonHeight, "X");

