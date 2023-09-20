
const object = document.getElementById('object');
export const gameContainer = document.getElementById('game-container');
const gridsField = document.getElementById('grids');
const itemsField = document.getElementById('items');
const infoField = document.getElementById('info-cloud');
export const inventoryField = document.getElementById('inventory');
export const canvas = document.getElementById('btn-canvas');

let sizeOfScreen;

if (window.innerWidth <= 700) {
    sizeOfScreen = Math.floor(window.innerWidth / 100) * 100;
    canvas.classList.remove('hide');
} else {
    sizeOfScreen = 700;
    canvas.classList.add('hide');
}

sizeOfScreen = sizeOfScreen - ((sizeOfScreen / 100) * 10);

gameContainer.style.width = sizeOfScreen + 'px';
gameContainer.style.height = sizeOfScreen + 'px';
gridsField.style.width = sizeOfScreen + 'px';
gridsField.style.height = sizeOfScreen + 'px';

export const step = sizeOfScreen / 10;

object.style.fontSize = step * 67 / 100 +'px';
object.style.width = step + 'px';
object.style.height = step + 'px';

let wallArray = [];

// export data ----------------------------------------------------------

export function takeScreenSize() {
    return sizeOfScreen;
}

export function takeWallArray(){
    return wallArray;
}

// collider objects ------------------------------------------------------

import { createCollidersArray, createCollider } from "/scripts/collider-objects.js";
import { takeCoordsArray } from "/scripts/coords-array.js";

const coordsArray = takeCoordsArray();

createCollidersArray (coordsArray.length, wallArray, 'wall', gameContainer);

function createColliderMass (wallArray, coordsArray) {
    for (let i = 0; i < coordsArray.length; i++) {
        createCollider (wallArray[i], coordsArray[i]);
    }
}
createColliderMass(wallArray, coordsArray);

// items on screen --------------------------------------------

let itemObj;

function createItem (itemsField, name, icon, left, top) {
    const coords = [];
    itemObj = document.createElement('div');

    itemObj.textContent = icon;
    itemObj.style.position = 'absolute';
    itemObj.style.width = step + 'px';
    itemObj.style.height = step + 'px';
    itemObj.style.fontSize = step * 67 / 100 + 'px';
    itemObj.style.textAlign = 'center';
    itemObj.style.left = step * left + 'px';
    itemObj.style.top = step * top + 'px';

    itemsField.appendChild(itemObj);

    coords[0] = name;
    coords[1] = step * left;
    coords[2] = step * top;
    coords[3] = icon;

    return coords;
}

let objectsArray = [];
objectsArray.push(createItem(itemsField, 'Apple', '🍎', 0, 1));
objectsArray.push(createItem(itemsField, 'Apple', '🍎', 1, 6));
objectsArray.push(createItem(itemsField, 'Apple', '🍎', 3, 9));
objectsArray.push(createItem(itemsField, 'Apple', '🍎', 4, 2));
objectsArray.push(createItem(itemsField, 'Apple', '🍎', 7, 6));
objectsArray.push(createItem(itemsField, 'Apple', '🍎', 9, 0));
objectsArray.push(createItem(itemsField, 'Bill', '👨🏻‍🦰', 5, 5));
objectsArray.push(createItem(itemsField, 'House', '🏠', 5, 8));

export function takeObjectsArray() {
    return objectsArray;
}

export const playerView = document.createElement('div');

let isLocked = true;
let goalComplete = false;
export let inventoryCount = 0;

inventoryField.innerHTML = 'Inventory: ';

export function checkItem (x, y, array) {
    displayPlayerView();
    playerView.textContent = '';
    array.forEach(element => {
        if (x == element[1] && y == element[2]) {
            const useButton = document.createElement('button');
            if (element[3] != 'X') {
                playerView.classList.remove('hide');
                playerView.textContent = object.textContent;
                playerView.textContent += element[3];
                useButton.textContent = 'Use';
                useButton.classList.add('use-btn');
                useButton.style.width = step + 'px';
                useButton.style.height = step + 'px';
                useButton.style.left = step + 'px';
                
                useButtonAction(useButton, element, array);
                
                playerView.appendChild(useButton);

            }    
            if (x == 0) {
                playerView.style.left = 0 + 'px';
            } else if (x >= 430) {
                playerView.style.left = -step + 'px';
            } else {
                playerView.style.left = -step/2 + 'px';
            }
        }
    });
}

function displayPlayerView() {
    infoField.classList.add('hide');
    playerView.classList.add('hide');
    playerView.classList.add('player-view');
    playerView.style.width = step * 2 + 'px';
    playerView.style.height = step + 'px';
    playerView.style.top = -step/100 + 'px';
    object.appendChild(playerView);
}

export function takeItemByIndex(index, element, x, y) {
    if (index >= 0 && index < itemsField.children.length) {
        element[0] = 'X';
        element[3] = 'X';
        inventoryCount += 1;
        inventoryField.innerHTML += '🍎';
        itemsField.children[index].innerHTML = 'X';
    }
}

export function infoDisplay(text1, text2) {
    infoField.classList.remove('hide');
    infoField.innerHTML = text1;
    infoField.innerHTML += `<br>`;
    infoField.innerHTML += text2;
}

function useButtonAction(useButton, element, array) {
    useButton.addEventListener('click', () => {
        if (element[0] == 'Apple') {

            let index = array.indexOf(element);
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
    });
}

