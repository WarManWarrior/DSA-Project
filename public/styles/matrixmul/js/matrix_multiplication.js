let matrixA = [];
let matrixB = [];
let matrixC = [];
let rowsA, colsA, colsB;
let step = 0;
let animationStep = 0;
let speed = 30;
let cellSize = 60;
let padding = 20;

function setup() {
    let canvasWidth = windowWidth * 0.7; // 60% of window width
    let canvasHeight = windowHeight * 0.7; // 60% of window height
    let canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent('visualization'); // Attach canvas to the visualization div
    // canvas.position((windowWidth - canvasWidth) / 2, (windowHeight - canvasHeight) / 2);
    frameRate(speed);
    textAlign(CENTER, CENTER);
    textSize(16);
}

function windowResized() {
    let canvasWidth = windowWidth * 0.6; // 60% of window width
    let canvasHeight = windowHeight * 0.6; // 60% of window height
    resizeCanvas(canvasWidth, canvasHeight); // Resize canvas
}

function draw() {
    background(165);
    if (matrixA.length > 0 && matrixB.length > 0) {
        drawMatrices();
        visualizeMultiplication();
    }
}

document.getElementById('speed-slider').oninput = function() {
    speed = parseInt(this.value);
    document.getElementById('speed-value').innerText = speed;
    frameRate(speed);
};

document.getElementById('create-matrices').onclick = function() {
    rowsA = parseInt(document.getElementById('rowsA').value);
    colsA = parseInt(document.getElementById('colsA').value);
    colsB = parseInt(document.getElementById('colsB').value);
    createMatrixInputs();
};

function createMatrixInputs() {
    let matrixInputDiv = document.getElementById('matrix-inputs');
    matrixInputDiv.innerHTML = '<h2 class="text-2xl font-semibold text-indigo-600 mb-4">Matrix Values</h2>';

    matrixA = new Array(rowsA).fill().map(() => new Array(colsA).fill(0));
    matrixB = new Array(colsA).fill().map(() => new Array(colsB).fill(0));
    matrixC = new Array(rowsA).fill().map(() => new Array(colsB).fill(0));

    matrixInputDiv.innerHTML += '<div class="grid grid-cols-1 md:grid-cols-2 gap-8">';
    
    // Matrix A inputs
    matrixInputDiv.innerHTML += '<div><h3 class="text-xl font-semibold text-indigo-500 mb-2">Matrix A</h3>';
    for (let i = 0; i < rowsA; i++) {
        matrixInputDiv.innerHTML += '<div class="flex">';
        for (let j = 0; j < colsA; j++) {
            matrixInputDiv.innerHTML += `<input type="number" id="A-${i}-${j}" value="0" class="w-12 h-12 m-1 text-center border rounded">`;
        }
        matrixInputDiv.innerHTML += '</div>';
    }
    matrixInputDiv.innerHTML += '</div>';

    // Matrix B inputs
    matrixInputDiv.innerHTML += '<div><h3 class="text-xl font-semibold text-indigo-500 mb-2">Matrix B</h3>';
    for (let i = 0; i < colsA; i++) {
        matrixInputDiv.innerHTML += '<div class="flex">';
        for (let j = 0; j < colsB; j++) {
            matrixInputDiv.innerHTML += `<input type="number" id="B-${i}-${j}" value="0" class="w-12 h-12 m-1 text-center border rounded">`;
        }
        matrixInputDiv.innerHTML += '</div>';
    }
    matrixInputDiv.innerHTML += '</div></div>';
}

document.getElementById('start-multiplication').onclick = function() {
    for (let i = 0; i < rowsA; i++) {
        for (let j = 0; j < colsA; j++) {
            matrixA[i][j] = parseInt(document.getElementById(`A-${i}-${j}`).value);
        }
    }
    for (let i = 0; i < colsA; i++) {
        for (let j = 0; j < colsB; j++) {
            matrixB[i][j] = parseInt(document.getElementById(`B-${i}-${j}`).value);
        }
    }
    step = 0;
    animationStep = 0;
};

function drawMatrices() {
    let startX = padding;
    let startY = padding;

    // Draw Matrix A
    drawMatrix(matrixA, startX, startY, 'A');

    // Draw Matrix B
    let matrixBStartX = startX + colsA * cellSize + padding * 3;
    drawMatrix(matrixB, matrixBStartX, startY, 'B');

    // Draw Matrix C
    let matrixCStartX = matrixBStartX + colsB * cellSize + padding * 3;
    drawMatrix(matrixC, matrixCStartX, startY, 'C');
}

function drawMatrix(matrix, startX, startY, label) {
    push();
    fill(0);
    textAlign(LEFT, TOP);
    textSize(24);
    text(label, startX, startY - 40);
    pop();

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            fill(240);
            stroke(200);
            rect(startX + j * cellSize, startY + i * cellSize, cellSize, cellSize);
            fill(0);
            noStroke();
            text(matrix[i][j], startX + j * cellSize + cellSize / 2, startY + i * cellSize + cellSize / 2);
        }
    }
}

function visualizeMultiplication() {
    let row = floor(step / colsB);
    let col = step % colsB;

    if (row < rowsA && col < colsB) {
        let startX = padding;
        let startY = padding;
        let matrixBStartX = startX + colsA * cellSize + padding * 3;
        let matrixCStartX = matrixBStartX + colsB * cellSize + padding * 3;

        // Highlight current row in Matrix A and column in Matrix B
        for (let k = 0; k < colsA; k++) {
            let alpha = map(sin(frameCount * 0.1), -1, 1, 100, 200);
            fill(255, 255, 0, alpha);
            rect(startX + k * cellSize, startY + row * cellSize, cellSize, cellSize);
            rect(matrixBStartX + col * cellSize, startY + k * cellSize, cellSize, cellSize);
        }

        // Animate the multiplication process
        if (animationStep < colsA) {
            let x1 = startX + animationStep * cellSize + cellSize / 2;
            let y1 = startY + row * cellSize + cellSize / 2;
            let x2 = matrixBStartX + col * cellSize + cellSize / 2;
            let y2 = startY + animationStep * cellSize + cellSize / 2;
            
            stroke(255, 0, 0);
            strokeWeight(2);
            line(x1, y1, x2, y2);
            
            fill(255, 0, 0);
            noStroke();
            ellipse(x1, y1, 10, 10);
            ellipse(x2, y2, 10, 10);

            textSize(20);
            fill(0);
            text(`${matrixA[row][animationStep]} × ${matrixB[animationStep][col]}`, (x1 + x2) / 2, (y1 + y2) / 2 - 20);

            animationStep++;
        } else {
            matrixC[row][col] = 0;
            for (let k = 0; k < colsA; k++) {
                matrixC[row][col] += matrixA[row][k] * matrixB[k][col];
            }
            
            // Highlight the result cell in Matrix C
            fill(0, 255, 0, 100);
            rect(matrixCStartX + col * cellSize, startY + row * cellSize, cellSize, cellSize);

            step++;
            animationStep = 0;
        }
    }
}