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