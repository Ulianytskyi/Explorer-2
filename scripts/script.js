
const object = document.getElementById('object');
const gameContainer = document.getElementById('game-container');
const gridsField = document.getElementById('grids');
const itemsField = document.getElementById('items');
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

object.style.fontSize = step * 67 / 100 + 'px';
object.style.width = step + 'px';

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

const playerView = document.createElement('div');

export function checkItem (x, y, array) {
    displayPlayerView();

    playerView.textContent = '';

    array.forEach(element => {

        if (x == element[1] && y == element[2]) {
            const useButton = document.createElement('button');
            playerView.classList.remove('hide');

            playerView.textContent = object.textContent;

            playerView.textContent += element[3];

            useButton.textContent = 'Use';
            useButton.classList.add('use-btn');

            useButton.addEventListener('click', () => {
                let index = array.indexOf(element);
                removeItemByIndex(index, x, y);
                console.log('>>', index, x, y);
            });

            playerView.appendChild(useButton);
            
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

function removeItemByIndex(indexToRemove, x, y) {
    if (indexToRemove >= 0 && indexToRemove < objectsArray.children.length) {
        objectsArray.removeChild(indexToRemove);  
        let newItem = createItem(itemsField, 'Grass', '🌱', x, y);
        objectsArray.insertBefore(newItem, indexToRemove);

    }
}



// console.log(itemsField.children[1].innerHTML);
// console.log(itemsField.children[2].innerHTML);
// console.log(itemsField.children[3].innerHTML);

//   removeItemByIndex(2);
