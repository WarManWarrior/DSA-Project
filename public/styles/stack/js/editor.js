require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.21.2/min/vs' } });
require(['vs/editor/editor.main'], function() {
  monaco.editor.create(document.getElementById('editor'), {
    value: `#include <iostream>
using namespace std;

class Stack {
private:
    int top;      // Index of the top element
    int capacity; // Maximum size of the stack
    int* arr;     // Array to store the stack elements

public:
    // Constructor to initialize the stack
    Stack(int size) {
        capacity = size;
        arr = new int[capacity];
        top = -1; // Stack is empty initially
    }

    // Destructor to free up memory
    ~Stack() {
        delete[] arr;
    }

    // Function to add an element to the stack
    void push(int value) {
        if (isFull()) {
            cout << "Stack Overflow! Cannot push " << value << endl;
            return;
        }
        arr[++top] = value; // Increment top and add value
        cout << value << " pushed to the stack.\n";
    }

    // Function to remove the top element from the stack
    void pop() {
        if (isEmpty()) {
            cout << "Stack Underflow! No elements to pop.\n";
            return;
        }
        cout << arr[top--] << " popped from the stack.\n"; // Decrement top
    }

    // Function to return the top element of the stack
    int peek() {
        if (isEmpty()) {
            cout << "Stack is empty! No top element.\n";
            return -1;
        }
        return arr[top];
    }

    // Function to check if the stack is empty
    bool isEmpty() {
        return top == -1;
    }

    // Function to check if the stack is full
    bool isFull() {
        return top == capacity - 1;
    }

    // Function to display the current stack
    void display() {
        if (isEmpty()) {
            cout << "Stack is empty!\n";
            return;
        }
        cout << "Stack elements: ";
        for (int i = 0; i <= top; i++) {
            cout << arr[i] << " ";
        }
        cout << endl;
    }
};

int main() {
    Stack s(5); // Stack of size 5

    s.push(10);
    s.push(20);
    s.push(30);
    s.display();

    cout << "Top element is: " << s.peek() << endl;

    s.pop();
    s.display();

    cout << "Top element is: " << s.peek() << endl;

    s.push(40);
    s.push(50);
    s.push(60);
    s.display();

    s.push(70); // Should display stack overflow

    return 0;
}
`,
    language: 'cpp',
    theme: 'vs-dark'
  });
});
