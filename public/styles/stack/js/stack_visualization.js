let stack = [];
let useArrayRepresentation = true;  // Default to array representation
let speed = 30;  // Default visualization speed

function setup() {
    let canvas = createCanvas(800, 600);
    canvas.parent('visualization');
    frameRate(speed);  // Set default frame rate
    noLoop();  // Stop drawing continuously, only when required
}

function draw() {
    background(255);

    if (useArrayRepresentation) {
        drawArrayStack();
    } else {
        drawLinkedListStack();
    }
}

// Update the speed value displayed
document.getElementById('speed-slider').oninput = function() {
    speed = parseInt(this.value);
    document.getElementById('speed-value').innerText = speed;
    frameRate(speed);  // Update frame rate based on slider value
};

document.getElementById('push').onclick = function() {
    let element = document.getElementById('element').value;
    if (element) {
        stack.push(element);  // Push element to the stack
        document.getElementById('element').value = '';  // Clear the input field
        redraw();  // Redraw the visualization
    }
};

document.getElementById('pop').onclick = function() {
    if (stack.length > 0) {
        stack.pop();  // Pop element from the stack
        redraw();  // Redraw the visualization
    }
};

document.getElementById('switch-representation').onclick = function() {
    useArrayRepresentation = !useArrayRepresentation;
    let buttonText = useArrayRepresentation ? 'Switch to Linked List Representation' : 'Switch to Array Representation';
    document.getElementById('switch-representation').innerText = buttonText;
    redraw();  // Redraw the visualization
};

function drawArrayStack() {
    textAlign(CENTER, CENTER);
    textSize(16);

    // Visualize stack as an array
    let startX = 200;
    let startY = 400;  // Start from the bottom for array representation
    let boxWidth = 100;
    let boxHeight = 50;

    for (let i = 0; i < stack.length; i++) {  // Draw from bottom to top
        fill(200);
        rect(startX, startY - i * boxHeight, boxWidth, boxHeight);  // Adjust position
        fill(0);
        text(stack[i], startX + boxWidth / 2, startY - i * boxHeight + boxHeight / 2);
    }

    // Label the top of the stack
    if (stack.length > 0) {
        textSize(12);
        fill(255, 0, 0);
        text('Top', startX + boxWidth + 30, startY - (stack.length - 1) * boxHeight + 20); // Corrected position
    }
}

function drawLinkedListStack() {
    textAlign(CENTER, CENTER);
    textSize(16);

    // Visualize stack as a linked list with LIFO property
    let startX = 200;
    let startY = 400;  // Start from the bottom
    let boxWidth = 100;
    let boxHeight = 50;

    for (let i = 0; i < stack.length; i++) {
        fill(200);
        rect(startX, startY - i * boxHeight, boxWidth, boxHeight);  // Draw box for each element
        fill(0);
        text(stack[i], startX + boxWidth / 2, startY - i * boxHeight + boxHeight / 2);  // Display element

        // Draw arrows between nodes
        if (i < stack.length - 1) {
            let arrowStartX = startX + boxWidth / 2;
            let arrowStartY = startY - i * boxHeight - boxHeight / 2;
            let arrowEndX = startX + boxWidth / 2;
            let arrowEndY = startY - (i + 1) * boxHeight + boxHeight / 2;

            stroke(0);
            line(arrowStartX, arrowStartY, arrowEndX, arrowEndY);  // Draw vertical line
            fill(0);
            triangle(arrowEndX - 5, arrowEndY - 5, arrowEndX + 5, arrowEndY - 5, arrowEndX, arrowEndY);  // Draw arrowhead
        }
    }

    // Label the head (top of the stack)
    if (stack.length > 0) {
        textSize(12);
        fill(255, 0, 0);
        text('Top (Head)', startX + boxWidth + 30, startY - (stack.length - 1) * boxHeight + 20); // Label near the top
    }
}

