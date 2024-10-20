let nodes = [];
let links = [];
let nodeDistance = 100;  // Distance between nodes
let xPos = 100;          // Initial X position for nodes

let searchIndex = 0; // To keep track of the current index during traversal
let searchValue = null; // The value to search for

function setup() {
    let canvas = createCanvas(800, 300);
    canvas.parent('visualization');
}

function draw() {
    background(255);

    // Draw links between nodes
    for (let link of links) {
        link.display();
    }

    // Draw nodes
    for (let node of nodes) {
        node.display();
    }
}

// Node class
class Node {
    constructor(x, y, value) {
        this.x = x;
        this.y = y;
        this.value = value;
        this.next = null;
        this.isHighlighted = false; // Property for highlighting
        this.isFound = false; // Property for found state
    }
    display() {
        if (this.isFound) {
            fill(0, 255, 0); // Green color for found node
            strokeWeight(4);
            stroke(255); // White glow effect
            rect(this.x - 25, this.y - 25, 50, 50);
            strokeWeight(1);
        } else {
            fill(this.isHighlighted ? 'yellow' : 200); // Change color if highlighted
            rect(this.x - 25, this.y - 25, 50, 50);
        }
        fill(0);
        textAlign(CENTER, CENTER);
        text(this.value, this.x, this.y);
    }
}

// Link class for singly linked list
class Link {
    constructor(node1, node2) {
        this.node1 = node1;
        this.node2 = node2;
    }
    display() {
        stroke(0);
        drawArrow(this.node1.x + 25, this.node1.y, this.node2.x - 25, this.node2.y);
    }
}

// Insert Node at End
function insertNodeEnd(value) {
    let newNode = new Node(xPos, height / 2, value);
    nodes.push(newNode);
    if (nodes.length > 1) {
        let prevNode = nodes[nodes.length - 2];
        prevNode.next = newNode;
        links.push(new Link(prevNode, newNode));
    }
    xPos += nodeDistance; // Move xPos for the next node
}

// Insert Node at Front
function insertNodeFront(value) {
    let newNode = new Node(100, height / 2, value);
    nodes.unshift(newNode);
    updateNodePositions();
    if (nodes.length > 1) {
        let nextNode = nodes[1];
        newNode.next = nextNode;
        links.unshift(new Link(newNode, nextNode));
    }
}

// Insert Node at Specific Position
function insertNodeAtPosition(value, position) {
    let newNode = new Node(xPos, height / 2, value);
    var pos = position - 1;
    if (pos <= 0) {
        insertNodeFront(value);
        return;
    } else if (pos >= nodes.length) {
        insertNodeEnd(value);
        return;
    }

    nodes.splice(pos, 0, newNode);
    updateNodePositions();
    updateLinks();

    let prevNode = nodes[pos - 1];
    let nextNode = nodes[pos + 1];
    prevNode.next = newNode;
    newNode.next = nextNode;
    links.splice(pos, 0, new Link(prevNode, newNode));
}

// Delete First Node
function deleteFirstNode() {
    if (nodes.length > 0) {
        nodes.shift();
        links = [];
        updateLinks();
        updateNodePositions();
    }
}

// Delete Node at Specific Position
function deleteNodeAtPosition(position) {
    var pos = position - 1;
    if (pos >= 0 && pos < nodes.length) {
        nodes.splice(pos, 1);
        links = [];
        updateLinks();
        updateNodePositions();
    }
}

// Delete Last Node
function deleteLastNode() {
    if (nodes.length === 0) {
        alert("No nodes to delete.");
        return;
    }
    nodes.pop();
    links = [];
    updateLinks();
    updateNodePositions();
}

// Update positions after insertion or deletion
function updateNodePositions() {
    xPos = 100;
    for (let i = 0; i < nodes.length; i++) {
        nodes[i].x = xPos;
        xPos += nodeDistance;
    }
}

// Update the links after insertion or deletion
function updateLinks() {
    for (let i = 0; i < nodes.length - 1; i++) {
        links.push(new Link(nodes[i], nodes[i + 1]));
    }
}

// Arrow drawing function
function drawArrow(x1, y1, x2, y2) {
    let angle = atan2(y2 - y1, x2 - x1);
    stroke(0);
    fill(0);
    line(x1, y1, x2, y2);
    push();
    translate(x2, y2);
    rotate(angle);
    let arrowSize = 7;
    translate(-arrowSize, 0);
    triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
    pop();
}

// Highlight nodes during search
function highlightSearch() {
    if (searchIndex < nodes.length) {
        nodes.forEach(node => {
            node.isHighlighted = false; // Reset highlights
            node.isFound = false; // Reset found state
        });
        
        nodes[searchIndex].isHighlighted = true; // Highlight the current node

        // Check if the current node matches the search value
        if (nodes[searchIndex].value == searchValue) {
            nodes[searchIndex].isFound = true; // Mark as found
            return; // Exit if found
        }

        searchIndex++; // Move to the next node
        setTimeout(highlightSearch, 500); // Continue searching after 500ms
    } else {
        // Reset search state if not found after traversing all nodes
        nodes.forEach(node => {
            node.isHighlighted = false; // Reset highlights
            node.isFound = false; // Reset found state
        });
    }
}

// Search Node
function searchNode(value) {
    searchValue = value; // Set the value to search
    searchIndex = 0; // Reset search index
    if (nodes.length === 0) {
        alert("No nodes to search.");
        return;
    }
    highlightSearch(); // Start the search animation
}

// Button Click Events
document.getElementById('insert-end').onclick = function () {
    let value = document.getElementById('insert-value').value;
    insertNodeEnd(value);
};

document.getElementById('insert-front').onclick = function () {
    let value = document.getElementById('insert-value').value;
    insertNodeFront(value);
};

document.getElementById('insert-position-btn').onclick = function () {
    let value = document.getElementById('insert-value').value;
    let position = parseInt(document.getElementById('insert-position').value);
    insertNodeAtPosition(value, position);
};

document.getElementById('delete-first').onclick = function () {
    deleteFirstNode();
};

document.getElementById('delete-position-btn').onclick = function () {
    let position = parseInt(document.getElementById('insert-position').value);
    deleteNodeAtPosition(position);
};

document.getElementById('delete-node').onclick = function () {
    deleteLastNode();
};

// Search Node Button
document.getElementById('search-node').onclick = function () {
    let value = document.getElementById('search-value').value;
    searchNode(value); // Call the search node function
};

