require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.21.2/min/vs' } });
require(['vs/editor/editor.main'], function() {
  monaco.editor.create(document.getElementById('editor'), {
    value: `#include <iostream>

class Node {
public:
    int data;
    Node* left;
    Node* right;

    Node(int value) {
        data = value;
        left = right = nullptr;
    }
};

class BinaryTree {
private:
    Node* root;

    void insert(Node*& node, int value) {
        if (node == nullptr) {
            node = new Node(value);
        } else if (value < node->data) {
            insert(node->left, value);
        } else {
            insert(node->right, value);
        }
    }

    void inOrder(Node* node) {
        if (node != nullptr) {
            inOrder(node->left);
            std::cout << node->data << " ";
            inOrder(node->right);
        }
    }

    void preOrder(Node* node) {
        if (node != nullptr) {
            std::cout << node->data << " ";
            preOrder(node->left);
            preOrder(node->right);
        }
    }

    void postOrder(Node* node) {
        if (node != nullptr) {
            postOrder(node->left);
            postOrder(node->right);
            std::cout << node->data << " ";
        }
    }

    Node* deleteNode(Node* node, int value) {
        if (node == nullptr) {
            return node;
        }

        if (value < node->data) {
            node->left = deleteNode(node->left, value);
        } else if (value > node->data) {
            node->right = deleteNode(node->right, value);
        } else {
            // Node with only one child or no child
            if (node->left == nullptr) {
                Node* temp = node->right;
                delete node;
                return temp;
            } else if (node->right == nullptr) {
                Node* temp = node->left;
                delete node;
                return temp;
            }

            // Node with two children: Get the inorder successor (smallest in the right subtree)
            Node* temp = minValueNode(node->right);
            node->data = temp->data; // Copy the inorder successor's value to this node
            node->right = deleteNode(node->right, temp->data); // Delete the inorder successor
        }
        return node;
    }

    Node* minValueNode(Node* node) {
        Node* current = node;
        while (current && current->left != nullptr) {
            current = current->left;
        }
        return current;
    }

public:
    BinaryTree() {
        root = nullptr;
    }

    void insert(int value) {
        insert(root, value);
    }

    void inOrder() {
        std::cout << "In-Order Traversal: ";
        inOrder(root);
        std::cout << std::endl;
    }

    void preOrder() {
        std::cout << "Pre-Order Traversal: ";
        preOrder(root);
        std::cout << std::endl;
    }

    void postOrder() {
        std::cout << "Post-Order Traversal: ";
        postOrder(root);
        std::cout << std::endl;
    }

    void deleteNode(int value) {
        root = deleteNode(root, value);
    }
};

int main() {
    BinaryTree tree;

    tree.insert(50);
    tree.insert(30);
    tree.insert(20);
    tree.insert(40);
    tree.insert(70);
    tree.insert(60);
    tree.insert(80);

    tree.inOrder();  // Output: 20 30 40 50 60 70 80
    tree.preOrder(); // Output: 50 30 20 40 70 60 80
    tree.postOrder(); // Output: 20 40 30 60 80 70 50

    std::cout << "Deleting 20\n";
    tree.deleteNode(20);
    tree.inOrder(); // Output: 30 40 50 60 70 80

    std::cout << "Deleting 30\n";
    tree.deleteNode(30);
    tree.inOrder(); // Output: 40 50 60 70 80

    std::cout << "Deleting 50\n";
    tree.deleteNode(50);
    tree.inOrder(); // Output: 40 60 70 80

    return 0;
}
`,
    language: 'cpp',
    theme: 'vs-dark'
  });
});
