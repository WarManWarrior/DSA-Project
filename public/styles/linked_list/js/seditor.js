require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.21.2/min/vs' } });
require(['vs/editor/editor.main'], function() {
  monaco.editor.create(document.getElementById('editor'), {
    value: `#include <iostream>

class Node {
public:
    int data;
    Node* next;

    Node(int val) {
        data = val;
        next = nullptr;
    }
};

class SinglyLinkedList {
private:
    Node* head;

public:
    SinglyLinkedList() {
        head = nullptr;
    }

    // Insert at the beginning
    void insertAtBeginning(int val) {
        Node* newNode = new Node(val);
        newNode->next = head;
        head = newNode;
    }

    // Insert at the end
    void insertAtEnd(int val) {
        Node* newNode = new Node(val);
        if (head == nullptr) {
            head = newNode;
            return;
        }
        Node* temp = head;
        while (temp->next != nullptr) {
            temp = temp->next;
        }
        temp->next = newNode;
    }

    // Insert after a given node
    void insertAfter(Node* prevNode, int val) {
        if (prevNode == nullptr) {
            std::cout << "The given previous node cannot be nullptr." << std::endl;
            return;
        }
        Node* newNode = new Node(val);
        newNode->next = prevNode->next;
        prevNode->next = newNode;
    }

    // Delete a node by value
    void deleteNode(int val) {
        if (head == nullptr) return;

        // If the node to be deleted is the head node
        if (head->data == val) {
            Node* temp = head;
            head = head->next;
            delete temp;
            return;
        }

        Node* current = head;
        Node* previous = nullptr;

        while (current != nullptr && current->data != val) {
            previous = current;
            current = current->next;
        }

        // If the value was not found
        if (current == nullptr) return;

        // Unlink the node from the linked list
        previous->next = current->next;
        delete current;
    }

    // Search for a value
    bool search(int val) {
        Node* current = head;
        while (current != nullptr) {
            if (current->data == val) {
                return true;
            }
            current = current->next;
        }
        return false;
    }

    // Traverse the list
    void traverse() {
        Node* current = head;
        while (current != nullptr) {
            std::cout << current->data << " -> ";
            current = current->next;
        }
        std::cout << "nullptr" << std::endl;
    }

    // Reverse the linked list
    void reverse() {
        Node* prev = nullptr;
        Node* current = head;
        Node* next = nullptr;

        while (current != nullptr) {
            next = current->next; // Store next node
            current->next = prev; // Reverse current node's pointer
            prev = current;       // Move pointers one position ahead
            current = next;
        }
        head = prev; // Update head to the new first element
    }

    // Destructor to free memory
    ~SinglyLinkedList() {
        Node* current = head;
        Node* nextNode = nullptr;
        while (current != nullptr) {
            nextNode = current->next;
            delete current;
            current = nextNode;
        }
    }
};

int main() {
    SinglyLinkedList list;

    list.insertAtEnd(10);
    list.insertAtEnd(20);
    list.insertAtEnd(30);
    list.insertAtBeginning(5);
    list.insertAfter(list.head->next, 15); // Insert 15 after 10

    std::cout << "Current Linked List: ";
    list.traverse();

    std::cout << "Searching for 20: " << (list.search(20) ? "Found" : "Not Found") << std::endl;
    std::cout << "Searching for 40: " << (list.search(40) ? "Found" : "Not Found") << std::endl;

    list.deleteNode(20);
    std::cout << "Linked List after deleting 20: ";
    list.traverse();

    list.reverse();
    std::cout << "Reversed Linked List: ";
    list.traverse();

    return 0;
}
`,
    language: 'cpp',
    theme: 'vs-dark'
  });
});
