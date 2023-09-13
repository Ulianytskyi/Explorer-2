export function createCollidersArray(number, objectArray, idName, targetField) {
    for (let i = 0; i < number; i++){
        let collideObject = document.createElement('div');
        collideObject.id = `${idName}`;
        collideObject.textContent = '';
        targetField.appendChild(collideObject);
        objectArray.push(collideObject);
    }
}

export function createCollider (target, props) {
    target.style.top = props.top + 'px';
    target.style.left = props.left + 'px';
    target.style.height = props.height + 'px';
    target.style.width = props.width + 'px';
}

