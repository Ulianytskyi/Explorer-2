
const object = document.getElementById('object');
const gameContainer = document.getElementById('game-container');
const gridsField = document.getElementById('grids');
const itemsField = document.getElementById('items');
export const canvas = document.getElementById('btn-canvas');

let sizeOfScreen;
if (window.innerWidth <= 700) {
    sizeOfScreen = Math.floor(window.innerWidth / 10) * 10;
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

let step = sizeOfScreen / 10;

object.style.fontSize = step * 67 / 100 + 'px';
object.style.width = step + 'px';

let wallArray = [];

// export data ----------------------------------------------------------

export function takeScreenSize() {
    return sizeOfScreen;
}

export function takeStep(){
    return step;
}

export function takeWallArray(){
    return wallArray;
}

// collider objects ------------------------------------------------------

import { createCollidersArray, createCollider } from "/scripts/collider-objects.js";

createCollidersArray (8, wallArray, 'wall', gameContainer);

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

// createCollider (wallArray[0], coordsArray[0]);
// createCollider (wallArray[1], coordsArray[1]);
// createCollider (wallArray[2], coordsArray[2]);
// createCollider (wallArray[3], coordsArray[3]);
// createCollider (wallArray[4], coordsArray[4]);
// createCollider (wallArray[5], coordsArray[5]);
// createCollider (wallArray[6], coordsArray[6]);
// createCollider (wallArray[7], coordsArray[7]);

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
objectsArray.push(createItem(itemsField, 'Apple', '🍎', 9, 1));
objectsArray.push(createItem(itemsField, 'Apple', '🍎', 0, 1));
objectsArray.push(createItem(itemsField, 'Bill', '👨🏻‍🦰', 5, 5));
objectsArray.push(createItem(itemsField, 'House', '🏠', 5, 8));

export function takeObjectsArray() {
    return objectsArray;
}

const playerView = document.createElement('div');

export function checkItem (x, y, array) {
    displayPlayerView()
    playerView.textContent = '';
    array.forEach(element => {
        if (x == element[1] && y == element[2]) {
            playerView.classList.remove('hide');

            playerView.textContent = object.textContent;
            // playerView.textContent += ' ';
            playerView.textContent += element[3];
            
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
    playerView.classList.add('hide');
    playerView.classList.add('player-view');
    playerView.style.width = step * 2 + 'px';
    playerView.style.height = step + 'px';
    playerView.style.top = -step/100 + 'px';
    object.appendChild(playerView);
}