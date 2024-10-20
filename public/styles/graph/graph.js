const canvas = document.getElementById('graphCanvas');
const ctx = canvas.getContext('2d');

// Adjust canvas size dynamically based on the container
function resizeCanvas() {
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

let graph = {};
let nodes = [];
let isDragging = false;
let draggedNode = null;

// Function to draw nodes with neon colors
function drawNode(x, y, label, color = '#00bfff') {
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, 2 * Math.PI, false);
    ctx.fillStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = 15;  // Neon glow
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '16px Arial';
    ctx.fillText(label, x, y);
    ctx.shadowBlur = 0;  // Reset shadow for text
}

// Function to draw edges
function drawEdge(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = '#888';  // Light gray color for edges
    ctx.lineWidth = 2;
    ctx.stroke();
}

// Parse user input and update the graph
function updateGraph() {
    graph = {};

    const nodesInput = document.getElementById('nodes').value.split(',').map(n => n.trim());
    const edgesInput = document.getElementById('edges').value.split(',').map(e => e.trim());

    nodesInput.forEach(node => {
        graph[node] = [];
    });

    edgesInput.forEach(edge => {
        const [from, to] = edge.split('-').map(n => n.trim());
        if (graph[from]) {
            graph[from].push(to);
        }
    });

    drawGraph();
}

// Draw graph in circular layout
function drawGraph() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    nodes = [];

    const nodeCount = Object.keys(graph).length;
    const radius = Math.min(canvas.width, canvas.height) / 2.5;

    Object.keys(graph).forEach((node, i) => {
        const angle = (i / nodeCount) * 2 * Math.PI;
        const x = canvas.width / 2 + radius * Math.cos(angle);
        const y = canvas.height / 2 + radius * Math.sin(angle);
        nodes.push({ id: node, x, y, color: '#00bfff' }); // Use neon blue for all nodes
    });

    nodes.forEach(node => {
        graph[node.id].forEach(neighbor => {
            const target = nodes.find(n => n.id === neighbor);
            drawEdge(node.x, node.y, target.x, target.y);
        });
    });

    nodes.forEach(node => {
        drawNode(node.x, node.y, node.id, node.color);
    });
}

// Drag and drop interaction
canvas.addEventListener('mousedown', function (e) {
    const { offsetX, offsetY } = e;
    nodes.forEach(node => {
        const dist = Math.sqrt((offsetX - node.x) ** 2 + (offsetY - node.y) ** 2);
        if (dist <= 20) {
            isDragging = true;
            draggedNode = node;
        }
    });
});

canvas.addEventListener('mousemove', function (e) {
    if (isDragging && draggedNode) {
        const { offsetX, offsetY } = e;
        draggedNode.x = offsetX;
        draggedNode.y = offsetY;
        drawGraph();
    }
});

canvas.addEventListener('mouseup', function () {
    isDragging = false;
    draggedNode = null;
});
