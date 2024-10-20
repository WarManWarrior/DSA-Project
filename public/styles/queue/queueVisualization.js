// Complete the visualizeDoubleEndedQueue and visualizePriorityQueue functions

function visualizeDoubleEndedQueue() {
    const boxWidth = 100;
    const boxHeight = 50;
    const startX = 20;
    const startY = canvas.height / 2 - boxHeight / 2;

    ctx.font = "20px Arial";

    // Highlight front and rear elements
    queue.forEach((item, index) => {
        const x = startX + index * (boxWidth + 10);

        // Change color for front and rear elements
        if (index === 0) {
            ctx.fillStyle = "#e74c3c"; // Front element color
        } else if (index === queue.length - 1) {
            ctx.fillStyle = "#3498db"; // Rear element color
        } else {
            ctx.fillStyle = "#cccccc"; // Regular color for others
        }

        // Draw the box for the element
        ctx.fillRect(x, startY, boxWidth, boxHeight);
        ctx.strokeRect(x, startY, boxWidth, boxHeight);

        // Add the text inside the box
        ctx.fillStyle = "#000000";
        ctx.fillText(item, x + boxWidth / 4, startY + boxHeight / 2);
    });
}

function visualizePriorityQueue() {
    const boxWidth = 120;
    const boxHeight = 40;
    const startX = 20;
    const startY = 20;

    ctx.font = "14px Arial";

    // Sort the queue based on priority before visualization
    const sortedQueue = [...queue].sort((a, b) => b.priority - a.priority);

    sortedQueue.forEach((item, index) => {
        const x = startX;
        const y = startY + index * (boxHeight + 10);

        gsap.to({}, {
            duration: 0.5,
            onUpdate: () => {
                const hue = 200 + item.priority * 15; // Color based on priority
                ctx.fillStyle = `hsl(${hue}, 70%, 50%)`;
                ctx.fillRect(x, y, boxWidth, boxHeight);
                ctx.strokeStyle = "#ffffff";
                ctx.strokeRect(x, y, boxWidth, boxHeight);
                ctx.fillStyle = "#ffffff";
                ctx.fillText(`${item.value} (Priority: ${item.priority})`, x + 10, y + boxHeight / 2 + 5);
            },
            ease: "power2.out",
            delay: index * 0.1
        });
    });
}
