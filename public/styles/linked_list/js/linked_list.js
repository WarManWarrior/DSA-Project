let nodes = [];
let links = [];
let listType = 'Singly';  // Default to Singly Linked List

let nodeDistance = 100;  // Distance between nodes
let xPos = 100;          // Initial X position for nodes
let headArrowLength = 50; // Arrow length to indicate the head node

function setup() {
    let canvas = createCanvas(800, 300);
    canvas.parent('visualization');
}

function draw() {
    background(255);

    // Draw arrows for head node
    if (nodes.length > 0) {
        drawArrow(50, height / 2, nodes[0].x - 50, nodes[0].y, true);  // Head arrow
    }

    for (let link of links) {
        link.display();
    }

    for (let node of nodes) {
        node.display();
    }
}

// Draws an arrow between two points with an arrowhead
function drawArrow(x1, y1, x2, y2, isHead = false) {
    let angle = atan2(y2 - y1, x2 - x1);
    stroke(0);
    fill(0);
    line(x1, y1, x2, y2);

    // Draw arrowhead
    if (!isHead) {
        push();
        translate(x2, y2);
        rotate(angle);
        let arrowSize = 7;
        translate(-arrowSize, 0);
        triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
        pop();
    }
}

// Node and Link classes
class Node {
    constructor(x, y, value) {
        this.x = x;
        this.y = y;
        this.value = value;
        this.next = null;
        this.prev = null;  // For doubly linked list
    }
    display() {
        fill(200);
        rect(this.x - 25, this.y - 25, 50, 50);  // Draw node as a rectangle instead of a circle
        fill(0);
        textAlign(CENTER, CENTER);
        text(this.value, this.x, this.y);
    }
}

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

// Doubly Linked List Link class
class DoublyLink {
    constructor(node1, node2) {
        this.node1 = node1;
        this.node2 = node2;
    }
    display() {
        // Forward link
        stroke(0);
        drawArrow(this.node1.x + 25, this.node1.y, this.node2.x - 25, this.node2.y);

        // Backward link for doubly linked list
        drawArrow(this.node2.x - 25, this.node2.y, this.node1.x + 25, this.node1.y);
    }
}

// Circular link class for circular linked list
class CircularLink {
    constructor(node1, node2) {
        this.node1 = node1;
        this.node2 = node2;
    }

    display() {
        // Draw an arrow from the last node to the first node (circular link)
        stroke(0);
        drawArrow(this.node1.x + 25, this.node1.y, this.node2.x - 25, this.node2.y);
    }
}

// Insert Node at End
function insertNodeEnd(value) {
    let newNode = new Node(xPos, height / 2, value);
    nodes.push(newNode);

    // For Singly and Doubly Linked Lists
    if (nodes.length > 1) {
        let prevNode = nodes[nodes.length - 2];
        if (listType === 'Doubly') {
            prevNode.next = newNode;
            newNode.prev = prevNode;
            links.push(new DoublyLink(prevNode, newNode));
        } else {
            prevNode.next = newNode;
            links.push(new Link(prevNode, newNode));
        }
    }
    xPos += nodeDistance;

    // Circular Linked List - link last node to the head node
    if (listType === 'Circular') {
        if (nodes.length > 1) {
            // Clear any existing circular links before adding new ones
            links = links.filter(link => !(link instanceof CircularLink));
            let headNode = nodes[0];
            newNode.next = headNode; // Make the last node point to the head
            links.push(new CircularLink(newNode, headNode)); // Create a circular link
        }
    }
}

// Insert Node at Front
function insertNodeFront(value) {
    let newNode = new Node(100, height / 2, value);
    nodes.unshift(newNode); // Add node to the front
    xPos += nodeDistance;
    updateNodePositions(); // Update positions of existing nodes

    // Update links
    if (nodes.length > 1) {
        let nextNode = nodes[1];
        newNode.next = nextNode;
        if (listType === 'Doubly') {
            nextNode.prev = newNode;
            links.unshift(new DoublyLink(newNode, nextNode));
        } else {
            links.unshift(new Link(newNode, nextNode));
        }
    }
}

// Delete Node
function deleteNode(value) {
    let nodeIndex = nodes.findIndex(node => node.value == value);
    if (nodeIndex !== -1) {
        nodes.splice(nodeIndex, 1);  // Remove the node
        links = [];
        updateLinks();  // Recreate the links based on updated nodes
        updateNodePositions();
    }
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
        if (listType === 'Doubly') {
            links.push(new DoublyLink(nodes[i], nodes[i + 1]));
        } else {
            links.push(new Link(nodes[i], nodes[i + 1]));
        }
    }

    // Handle circular link (last node pointing to first node)
    if (listType === 'Circular' && nodes.length > 1) {
        let lastNode = nodes[nodes.length - 1];
        let headNode = nodes[0];
        links.push(new CircularLink(lastNode, headNode));
    }
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

document.getElementById('delete-node').onclick = function () {
    let value = document.getElementById('insert-value').value;
    deleteNode(value);
};

// List Type Switch Buttons
document.getElementById('singly-button').onclick = function () {
    listType = 'Singly';
    updateListType();
};

document.getElementById('doubly-button').onclick = function () {
    listType = 'Doubly';
    updateListType();
};

document.getElementById('circular-button').onclick = function () {
    listType = 'Circular';
    updateListType();
};

// Clear nodes and reset list type
function updateListType() {
    document.querySelectorAll('#list-type-buttons button').forEach(button => button.classList.remove('active'));
    if (listType === 'Singly') {
        document.getElementById('singly-button').classList.add('active');
    } else if (listType === 'Doubly') {
        document.getElementById('doubly-button').classList.add('active');
    } else {
        document.getElementById('circular-button').classList.add('active');
    }
    // Clear and reset nodes/links for the selected list type
    nodes = [];
    links = [];
    xPos = 100;
}
