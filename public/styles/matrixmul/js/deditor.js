require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.21.2/min/vs' } });
require(['vs/editor/editor.main'], function() {
  monaco.editor.create(document.getElementById('editor'), {
    value: `#include <iostream>
using namespace std;

// Function to allocate memory for a matrix of size rows x cols
int** allocateMatrix(int rows, int cols) {
    int** matrix = new int*[rows];
    for (int i = 0; i < rows; ++i) {
        matrix[i] = new int[cols];
    }
    return matrix;
}

// Function to free dynamically allocated memory for a matrix
void freeMatrix(int** matrix, int rows) {
    for (int i = 0; i < rows; ++i) {
        delete[] matrix[i];
    }
    delete[] matrix;
}

// Function to input values for a matrix
void inputMatrix(int** matrix, int rows, int cols) {
    cout << "Enter elements of the matrix (" << rows << "x" << cols << "):\n";
    for (int i = 0; i < rows; ++i) {
        for (int j = 0; j < cols; ++j) {
            cin >> matrix[i][j];
        }
    }
}

// Function to print a matrix
void printMatrix(int** matrix, int rows, int cols) {
    cout << "Matrix (" << rows << "x" << cols << "):\n";
    for (int i = 0; i < rows; ++i) {
        for (int j = 0; j < cols; ++j) {
            cout << matrix[i][j] << " ";
        }
        cout << endl;
    }
}

// Function to multiply two matrices A and B, and store the result in matrix C
void multiplyMatrices(int** A, int** B, int** C, int m, int n, int p) {
    for (int i = 0; i < m; ++i) {
        for (int j = 0; j < p; ++j) {
            C[i][j] = 0;
            for (int k = 0; k < n; ++k) {
                C[i][j] += A[i][k] * B[k][j];
            }
        }
    }
}

int main() {
    int m, n, p;

    // Input dimensions for matrices A and B
    cout << "Enter the number of rows and columns for matrix A (m x n): ";
    cin >> m >> n;
    cout << "Enter the number of columns for matrix B (n x p): ";
    cin >> p;

    // Dynamically allocate memory for matrices A (m x n), B (n x p), and C (m x p)
    int** A = allocateMatrix(m, n);
    int** B = allocateMatrix(n, p);
    int** C = allocateMatrix(m, p);

    // Input matrices A and B
    inputMatrix(A, m, n);
    inputMatrix(B, n, p);

    // Multiply matrices A and B, and store the result in C
    multiplyMatrices(A, B, C, m, n, p);

    // Print matrices A, B, and the result matrix C
    cout << "\nMatrix A:\n";
    printMatrix(A, m, n);
    cout << "\nMatrix B:\n";
    printMatrix(B, n, p);
    cout << "\nResultant Matrix C (A x B):\n";
    printMatrix(C, m, p);

    // Free dynamically allocated memory
    freeMatrix(A, m);
    freeMatrix(B, n);
    freeMatrix(C, m);

    return 0;
}
`,
    language: 'cpp',
    theme: 'vs-dark'
  });
});
