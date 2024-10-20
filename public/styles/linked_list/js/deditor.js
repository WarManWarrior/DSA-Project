require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.21.2/min/vs' } });
require(['vs/editor/editor.main'], function() {
  monaco.editor.create(document.getElementById('editor'), {
    value: `#include <iostream>

class Node {
public:
    int data;
    Node* next;
    Node* prev;

    Node(int value) {
        data = value;
        next = nullptr;
        prev = nullptr;
    }
};

class DoublyLinkedList {
private:
    Node* head;
    Node* tail;

public:
    DoublyLinkedList() {
        head = nullptr;
        tail = nullptr;
    }

    // Insert at the beginning
    void insertAtBeginning(int value) {
        Node* newNode = new Node(value);
        if (head == nullptr) {
            head = tail = newNode;  // First node
        } else {
            newNode->next = head;
            head->prev = newNode;
            head = newNode;
        }
    }

    // Insert at the end
    void insertAtEnd(int value) {
        Node* newNode = new Node(value);
        if (tail == nullptr) {
            head = tail = newNode;  // First node
        } else {
            tail->next = newNode;
            newNode->prev = tail;
            tail = newNode;
        }
    }

    // Insert after a specific node
    void insertAfter(Node* prevNode, int value) {
        if (prevNode == nullptr) {
            std::cout << "The given previous node cannot be nullptr." << std::endl;
            return;
        }
        Node* newNode = new Node(value);
        newNode->next = prevNode->next;
        prevNode->next = newNode;
        newNode->prev = prevNode;

        if (newNode->next != nullptr) {
            newNode->next->prev = newNode;
        } else {
            tail = newNode; // Update tail if the new node is at the end
        }
    }

    // Delete a node
    void deleteNode(Node* delNode) {
        if (head == nullptr || delNode == nullptr) {
            std::cout << "Node to be deleted is null or list is empty." << std::endl;
            return;
        }
        
        // If node to be deleted is head
        if (head == delNode) {
            head = delNode->next;
        }
        
        // If node to be deleted is tail
        if (tail == delNode) {
            tail = delNode->prev;
        }
        
        // Change next only if node to be deleted is not the last node
        if (delNode->next != nullptr) {
            delNode->next->prev = delNode->prev;
        }
        
        // Change prev only if node to be deleted is not the first node
        if (delNode->prev != nullptr) {
            delNode->prev->next = delNode->next;
        }
        
        delete delNode;  // Free memory
    }

    // Search for a node
    Node* search(int value) {
        Node* current = head;
        while (current != nullptr) {
            if (current->data == value) {
                return current;
            }
            current = current->next;
        }
        return nullptr;  // Not found
    }

    // Traverse and print the list from head to tail
    void traverseForward() {
        Node* current = head;
        while (current != nullptr) {
            std::cout << current->data << " ";
            current = current->next;
        }
        std::cout << std::endl;
    }

    // Traverse and print the list from tail to head
    void traverseBackward() {
        Node* current = tail;
        while (current != nullptr) {
            std::cout << current->data << " ";
            current = current->prev;
        }
        std::cout << std::endl;
    }

    // Destructor to free memory
    ~DoublyLinkedList() {
        Node* current = head;
        Node* nextNode;
        while (current != nullptr) {
            nextNode = current->next;
            delete current;
            current = nextNode;
        }
    }
};

int main() {
    DoublyLinkedList dll;

    dll.insertAtEnd(10);
    dll.insertAtEnd(20);
    dll.insertAtBeginning(5);
    dll.insertAfter(dll.search(10), 15);

    std::cout << "List after insertions (forward): ";
    dll.traverseForward();

    std::cout << "List after insertions (backward): ";
    dll.traverseBackward();

    Node* nodeToDelete = dll.search(15);
    dll.deleteNode(nodeToDelete);

    std::cout << "List after deleting 15 (forward): ";
    dll.traverseForward();

    return 0;
}
`,
    language: 'cpp',
    theme: 'vs-dark'
  });
});
