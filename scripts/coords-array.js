let sizeOfScreen;
if (window.innerWidth <= 700) {
    sizeOfScreen = Math.floor(window.innerWidth / 100) * 100;
} else {
    sizeOfScreen = 700;
}
sizeOfScreen = sizeOfScreen - ((sizeOfScreen / 100) * 10);

let step = sizeOfScreen / 10;

// set coords array -------------------------------------------------------

const coordsArray = [
    {top: step * 1, left: step * 1, height: step * 1, width: step * 1},
    {top: step * 1, left: step * 2, height: step * 1, width: step * 1},
    {top: step * 2, left: step * 1, height: step * 1, width: step * 1},
    {top: step * 5, left: step * 0, height: step * 1, width: step * 1},
    {top: step * 5, left: step * 1, height: step * 1, width: step * 1},
    {top: step * 5, left: step * 2, height: step * 1, width: step * 1},
    {top: step * 6, left: step * 2, height: step * 1, width: step * 1},
    {top: step * 3, left: step * 4, height: step * 1, width: step * 1},
    {top: step * 3, left: step * 5, height: step * 1, width: step * 1},
    {top: step * 2, left: step * 5, height: step * 1, width: step * 1},
    {top: step * 3, left: step * 6, height: step * 1, width: step * 1},
    {top: step * 3, left: step * 7, height: step * 1, width: step * 1},
    {top: step * 4, left: step * 7, height: step * 1, width: step * 1},
    {top: step * 4, left: step * 8, height: step * 1, width: step * 1},
    {top: step * 0, left: step * 8, height: step * 1, width: step * 1},
    {top: step * 1, left: step * 8, height: step * 1, width: step * 1},
    {top: step * 7, left: step * 4, height: step * 1, width: step * 1},
    {top: step * 8, left: step * 4, height: step * 1, width: step * 1},
    {top: step * 9, left: step * 4, height: step * 1, width: step * 1},
    {top: step * 7, left: step * 5, height: step * 1, width: step * 1},
    {top: step * 7, left: step * 6, height: step * 1, width: step * 1},
    {top: step * 7, left: step * 7, height: step * 1, width: step * 1},
    {top: step * 8, left: step * 7, height: step * 1, width: step * 1},
    {top: step * 7, left: step * 9, height: step * 1, width: step * 1},
    {top: step * 8, left: step * 1, height: step * 1, width: step * 1},
    {top: step * 8, left: step * 2, height: step * 1, width: step * 1},
    {top: step * 8, left: step * 3, height: step * 1, width: step * 1},
];

// export coords array ------------------------------------------------------

export function takeCoordsArray() {
    return coordsArray;
}