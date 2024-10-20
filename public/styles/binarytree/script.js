// Binary Tree node class
class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

// Binary Tree class
class BinaryTree {
    constructor() {
        this.root = null;
    }

    insert(value) {
        const newNode = new Node(value);
        if (!this.root) {
            this.root = newNode;
        } else {
            this.insertNode(this.root, newNode);
        }
    }

    insertNode(node, newNode) {
        if (newNode.value < node.value) {
            if (!node.left) {
                node.left = newNode;
            } else {
                this.insertNode(node.left, newNode);
            }
        } else {
            if (!node.right) {
                node.right = newNode;
            } else {
                this.insertNode(node.right, newNode);
            }
        }
    }

    reset() {
        this.root = null;
    }
}

const tree = new BinaryTree();
const canvas = document.getElementById('binaryTreeCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;

function drawNode(node, x, y, level, highlight = false) {
    if (node === null) return;

    const nodeRadius = 20;
    const horizontalSpacing = 100 / level;
    const verticalSpacing = 80;

    // Draw edges first
    if (node.left !== null) {
        const leftChildX = x - horizontalSpacing;
        const leftChildY = y + verticalSpacing;
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(leftChildX, leftChildY);
        ctx.stroke();
        drawNode(node.left, leftChildX, leftChildY, level + 1);
    }

    if (node.right !== null) {
        const rightChildX = x + horizontalSpacing;
        const rightChildY = y + verticalSpacing;
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(rightChildX, rightChildY);
        ctx.stroke();
        drawNode(node.right, rightChildX, rightChildY, level + 1);
    }

    // Draw current node
    ctx.fillStyle = highlight ? "#ff6b6b" : "#0084ff";
    ctx.beginPath();
    ctx.arc(x, y, nodeRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();

    // Draw node value
    ctx.fillStyle = "#ffffff";
    ctx.font = "16px Arial";
    ctx.textAlign = "center";
    ctx.fillText(node.value, x, y + 5);
}

function drawTree() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawNode(tree.root, canvas.width / 2, 50, 1);
}

function insertNode() {
    const value = parseInt(document.getElementById('nodeValue').value);
    if (!isNaN(value)) {
        tree.insert(value);
        drawTree();
    }
}

function resetTree() {
    tree.reset();
    createDefaultTree();
    drawTree();
}

function createDefaultTree() {
    [10, 5, 15, 3, 7, 12, 18].forEach(value => tree.insert(value));
}

async function highlightNode(node, x, y, level) {
    drawNode(node, x, y, level, true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    drawNode(node, x, y, level, false);
}

async function traversePreOrder(node = tree.root, x = canvas.width / 2, y = 50, level = 1) {
    if (node !== null) {
        await highlightNode(node, x, y, level);
        await traversePreOrder(node.left, x - 100 / level, y + 80, level + 1);
        await traversePreOrder(node.right, x + 100 / level, y + 80, level + 1);
    }
}

async function traverseInOrder(node = tree.root, x = canvas.width / 2, y = 50, level = 1) {
    if (node !== null) {
        await traverseInOrder(node.left, x - 100 / level, y + 80, level + 1);
        await highlightNode(node, x, y, level);
        await traverseInOrder(node.right, x + 100 / level, y + 80, level + 1);
    }
}

async function traversePostOrder(node = tree.root, x = canvas.width / 2, y = 50, level = 1) {
    if (node !== null) {
        await traversePostOrder(node.left, x - 100 / level, y + 80, level + 1);
        await traversePostOrder(node.right, x + 100 / level, y + 80, level + 1);
        await highlightNode(node, x, y, level);
    }
}

// Create default tree and draw it
createDefaultTree();
drawTree();