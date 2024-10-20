require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.21.2/min/vs' } });
require(['vs/editor/editor.main'], function() {
  monaco.editor.create(document.getElementById('editor'), {
    value: `#include <iostream>
using namespace std;

// Class definition for Queue
class Queue {
private:
    int *arr;      // Pointer to store queue elements
    int front;     // Front index
    int rear;      // Rear index
    int capacity;  // Maximum capacity of the queue
    int count;     // Current size of the queue

public:
    // Constructor to initialize the queue
    Queue(int size = 10) {
        arr = new int[size];
        capacity = size;
        front = 0;
        rear = -1;
        count = 0;
    }

    // Destructor to free allocated memory
    ~Queue() {
        delete[] arr;
    }

    // Function to add an element to the queue (enqueue)
    void enqueue(int x) {
        if (isFull()) {
            cout << "Queue Overflow! Cannot enqueue element." << endl;
            return;
        }

        rear = (rear + 1) % capacity;  // Circular increment of rear
        arr[rear] = x;
        count++;
        cout << "Enqueued " << x << " to the queue." << endl;
    }

    // Function to remove an element from the queue (dequeue)
    int dequeue() {
        if (isEmpty()) {
            cout << "Queue Underflow! Cannot dequeue element." << endl;
            return -1;
        }

        int x = arr[front];
        front = (front + 1) % capacity;  // Circular increment of front
        count--;
        cout << "Dequeued " << x << " from the queue." << endl;
        return x;
    }

    // Function to get the front element of the queue (peek)
    int peek() {
        if (isEmpty()) {
            cout << "Queue is empty! No front element." << endl;
            return -1;
        }
        return arr[front];
    }

    // Function to check if the queue is empty
    bool isEmpty() {
        return (count == 0);
    }

    // Function to check if the queue is full
    bool isFull() {
        return (count == capacity);
    }

    // Function to get the current size of the queue
    int size() {
        return count;
    }
};

// Driver code
int main() {
    Queue q(5);  // Create a queue of capacity 5

    q.enqueue(10);
    q.enqueue(20);
    q.enqueue(30);
    q.enqueue(40);
    q.enqueue(50);

    cout << "Front element is: " << q.peek() << endl;

    q.dequeue();
    q.dequeue();

    cout << "Queue size is: " << q.size() << endl;

    q.enqueue(60);

    if (q.isFull()) {
        cout << "Queue is full!" << endl;
    }

    q.dequeue();
    q.dequeue();
    q.dequeue();
    q.dequeue();

    if (q.isEmpty()) {
        cout << "Queue is empty!" << endl;
    }

    return 0;
}
`,
    language: 'cpp',
    theme: 'vs-dark'
  });
});
