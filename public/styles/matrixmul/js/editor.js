require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.21.2/min/vs' } });
require(['vs/editor/editor.main'], function() {
  monaco.editor.create(document.getElementById('editor'), {
    value: `#include <iostream>
#include <vector>

using namespace std;

// Function to input matrix values
void inputMatrix(vector<vector<int>> &matrix, int rows, int cols, string name) {
    cout << "Enter elements for matrix " << name << " (" << rows << " x " << cols << "):\n";
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            cout << name << "[" << i + 1 << "][" << j + 1 << "]: ";
            cin >> matrix[i][j];
        }
    }
}

// Function to display matrix
void displayMatrix(const vector<vector<int>> &matrix, int rows, int cols, string name) {
    cout << "\nMatrix " << name << " (" << rows << " x " << cols << "):\n";
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            cout << matrix[i][j] << " ";
        }
        cout << endl;
    }
}

// Function to multiply two matrices
vector<vector<int>> multiplyMatrices(const vector<vector<int>> &A, const vector<vector<int>> &B, int m, int n, int p) {
    // Resultant matrix C of dimensions m x p
    vector<vector<int>> C(m, vector<int>(p, 0));

    for (int i = 0; i < m; i++) {
        for (int j = 0; j < p; j++) {
            for (int k = 0; k < n; k++) {
                C[i][j] += A[i][k] * B[k][j];
            }
        }
    }

    return C;
}

int main() {
    int m, n, p;

    // Input dimensions for the matrices
    cout << "Enter rows and columns for matrix A (m x n):\n";
    cout << "Rows (m): ";
    cin >> m;
    cout << "Columns (n): ";
    cin >> n;

    cout << "Enter columns for matrix B (n x p):\n";
    cout << "Columns (p): ";
    cin >> p;

    // Initialize matrices A and B
    vector<vector<int>> A(m, vector<int>(n));
    vector<vector<int>> B(n, vector<int>(p));

    // Input values for matrices A and B
    inputMatrix(A, m, n, "A");
    inputMatrix(B, n, p, "B");

    // Display input matrices
    displayMatrix(A, m, n, "A");
    displayMatrix(B, n, p, "B");

    // Check if the matrices are compatible for multiplication
    if (n != B.size()) {
        cout << "\nMatrix multiplication not possible due to incompatible dimensions.\n";
        return -1;
    }

    // Multiply matrices A and B
    vector<vector<int>> C = multiplyMatrices(A, B, m, n, p);

    // Display the resultant matrix C
    displayMatrix(C, m, p, "C");

    return 0;
}
`,
    language: 'cpp',
    theme: 'vs-dark'
  });
});
