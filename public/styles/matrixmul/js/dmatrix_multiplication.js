let matrix1 = [
    [1, 2],
    [3, 4]
];
let matrix2 = [
    [5, 6],
    [7, 8]
];
let result = [
    [0, 0],
    [0, 0]
];
let currentStep = 0;

function multiplyMatrices() {
    const rows1 = matrix1.length;
    const cols1 = matrix1[0].length;
    const cols2 = matrix2[0].length;
    let newResult = Array(rows1).fill().map(() => Array(cols2).fill(0));

    for (let i = 0; i < rows1; i++) {
        for (let j = 0; j < cols2; j++) {
            for (let k = 0; k < cols1; k++) {
                newResult[i][j] += matrix1[i][k] * matrix2[k][j];
            }
        }
    }
    result = newResult;
    renderMatrix(result, 'result');
}

function handleInputChange(matrix, rowIndex, colIndex, value) {
    if (matrix === 1) {
        matrix1[rowIndex][colIndex] = parseInt(value) || 0;
    } else {
        matrix2[rowIndex][colIndex] = parseInt(value) || 0;
    }
    multiplyMatrices();
}

function renderMatrix(matrix, elementId) {
    const matrixDiv = document.getElementById(elementId);
    matrixDiv.innerHTML = '';
    matrix.forEach((row, rowIndex) => {
        const rowDiv = document.createElement('div');
        row.forEach((cell, colIndex) => {
            const input = document.createElement('input');
            input.type = 'number';
            input.value = cell;
            input.addEventListener('input', (e) => handleInputChange(elementId === 'matrix1' ? 1 : 2, rowIndex, colIndex, e.target.value));
            rowDiv.appendChild(input);
        });
        matrixDiv.appendChild(rowDiv);
    });
}

function renderPointerVisualization() {
    const rows1 = matrix1.length;
    const cols2 = matrix2[0].length;
    const step = Math.min(currentStep, rows1 * cols2 - 1);
    const currentRow = Math.floor(step / cols2);
    const currentCol = step % cols2;

    const visualizationDiv = document.getElementById('visualization');
    visualizationDiv.innerHTML = '';

    const redBox = document.createElement('div');
    redBox.classList.add('box', 'bg-red');
    visualizationDiv.appendChild(redBox);

    const greenBoxes = document.createElement('div');
    matrix1.forEach((_, rowIndex) => {
        const box = document.createElement('div');
        box.classList.add('box', rowIndex === currentRow ? 'bg-green' : '');
        greenBoxes.appendChild(box);
    });
    visualizationDiv.appendChild(greenBoxes);

    const blueBoxes = document.createElement('div');
    matrix2[0].forEach((_, colIndex) => {
        const box = document.createElement('div');
        box.classList.add('box', colIndex === currentCol ? 'bg-blue' : '');
        blueBoxes.appendChild(box);
    });
    visualizationDiv.appendChild(blueBoxes);
}

document.getElementById('next-step').addEventListener('click', () => {
    const rows1 = matrix1.length;
    const cols2 = matrix2[0].length;
    currentStep = (currentStep + 1) % (rows1 * cols2);
    renderPointerVisualization();
});

renderMatrix(matrix1, 'matrix1');
renderMatrix(matrix2, 'matrix2');
multiplyMatrices();
renderPointerVisualization();
