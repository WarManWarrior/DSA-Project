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

function drawNode(node, x, y, level) {
    if (node === null) return;

    const nodeRadius = 20;
    const horizontalSpacing = 100 / level;
    const verticalSpacing = 80;

    // Draw current node
    ctx.fillStyle = "#0084ff";
    ctx.beginPath();
    ctx.arc(x, y, nodeRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();

    // Draw node value
    ctx.fillStyle = "#000";
    ctx.font = "16px Arial";
    ctx.textAlign = "center";
    ctx.fillText(node.value, x, y + 5);

    // Draw left child
    if (node.left !== null) {
        ctx.strokeStyle = "#ffffff";
        ctx.beginPath();
        ctx.moveTo(x, y + nodeRadius);
        ctx.lineTo(x - horizontalSpacing, y + verticalSpacing);
        ctx.stroke();
        drawNode(node.left, x - horizontalSpacing, y + verticalSpacing, level + 1);
    }

    // Draw right child
    if (node.right !== null) {
        ctx.strokeStyle = "#ffffff";
        ctx.beginPath();
        ctx.moveTo(x, y + nodeRadius);
        ctx.lineTo(x + horizontalSpacing, y + verticalSpacing);
        ctx.stroke();
        drawNode(node.right, x + horizontalSpacing, y + verticalSpacing, level + 1);
    }
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
    drawTree();
}

// Initial tree drawing
drawTree();
