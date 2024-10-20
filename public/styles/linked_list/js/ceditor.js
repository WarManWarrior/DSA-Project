require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.21.2/min/vs' } });
require(['vs/editor/editor.main'], function() {
  monaco.editor.create(document.getElementById('editor'), {
    value: `#include <iostream>

class Node {
public:
    int data;       // Data part of the node
    Node* next;     // Pointer to the next node

    Node(int val) {
        data = val;
        next = nullptr;
    }
};

class CircularLinkedList {
private:
    Node* tail;  // Pointer to the tail of the list

public:
    CircularLinkedList() : tail(nullptr) {}

    // Function to insert a node at the end of the list
    void insertEnd(int value) {
        Node* newNode = new Node(value);
        if (tail == nullptr) {
            tail = newNode;
            tail->next = tail; // Point to itself
        } else {
            newNode->next = tail->next; // New node points to head
            tail->next = newNode;       // Tail points to new node
            tail = newNode;             // Update tail
        }
    }

    // Function to insert a node at the beginning of the list
    void insertBeginning(int value) {
        Node* newNode = new Node(value);
        if (tail == nullptr) {
            tail = newNode;
            tail->next = tail; // Point to itself
        } else {
            newNode->next = tail->next; // New node points to head
            tail->next = newNode;       // Tail points to new node
        }
    }

    // Function to delete a node by value
    void deleteNode(int value) {
        if (tail == nullptr) return; // Empty list

        Node* current = tail->next; // Start from the head
        Node* prev = tail;

        do {
            if (current->data == value) {
                if (current == tail && current->next == tail) {
                    // Only one node in the list
                    delete current;
                    tail = nullptr;
                    return;
                } else if (current == tail) {
                    // If tail node is to be deleted
                    tail = prev; // Update tail
                }
                prev->next = current->next; // Bypass the current node
                delete current; // Free memory
                return;
            }
            prev = current;
            current = current->next;
        } while (current != tail->next);
    }

    // Function to display the circular linked list
    void display() {
        if (tail == nullptr) {
            std::cout << "List is empty." << std::endl;
            return;
        }
        
        Node* current = tail->next; // Start from the head
        do {
            std::cout << current->data << " -> ";
            current = current->next;
        } while (current != tail->next);
        std::cout << "(head)" << std::endl; // Indicate the circular link
    }

    // Function to search for a value in the list
    bool search(int value) {
        if (tail == nullptr) return false;

        Node* current = tail->next; // Start from the head
        do {
            if (current->data == value) {
                return true; // Value found
            }
            current = current->next;
        } while (current != tail->next);
        
        return false; // Value not found
    }
};

int main() {
    CircularLinkedList cll;

    cll.insertEnd(10);
    cll.insertEnd(20);
    cll.insertEnd(30);
    cll.display(); // Output: 10 -> 20 -> 30 -> (head)

    cll.insertBeginning(5);
    cll.display(); // Output: 5 -> 10 -> 20 -> 30 -> (head)

    cll.deleteNode(20);
    cll.display(); // Output: 5 -> 10 -> 30 -> (head)

    std::cout << "Searching for 10: " << (cll.search(10) ? "Found" : "Not Found") << std::endl;
    std::cout << "Searching for 40: " << (cll.search(40) ? "Found" : "Not Found") << std::endl;

    return 0;
}
`,
    language: 'cpp',
    theme: 'vs-dark'
  });
});
