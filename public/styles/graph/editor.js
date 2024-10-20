require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.21.2/min/vs' } });
require(['vs/editor/editor.main'], function() {
  monaco.editor.create(document.getElementById('editor'), {
    value: `#include <iostream>
#include <list>
#include <queue>
#include <stack>
#include <vector>

using namespace std;

class Graph {
private:
    int V; // Number of vertices
    list<int> *adj; // Pointer to an array containing adjacency lists

public:
    // Constructor
    Graph(int V) {
        this->V = V;
        adj = new list<int>[V];
    }

    // Destructor
    ~Graph() {
        delete[] adj;
    }

    // Add edge to the graph
    void addEdge(int v, int w) {
        adj[v].push_back(w); // Add w to v's list (Directed graph)
        adj[w].push_back(v); // Add v to w's list (Undirected graph)
    }

    // Display the graph
    void displayGraph() {
        for (int v = 0; v < V; ++v) {
            cout << v << " --> ";
            for (auto x : adj[v])
                cout << x << " ";
            cout << endl;
        }
    }

    // Depth-First Search (DFS)
    void DFS(int start) {
        vector<bool> visited(V, false); // Mark all vertices as not visited
        stack<int> s; // Stack for DFS

        s.push(start);
        while (!s.empty()) {
            int v = s.top();
            s.pop();

            if (!visited[v]) {
                cout << v << " ";
                visited[v] = true;
            }

            // Get all adjacent vertices of the dequeued vertex
            for (auto i = adj[v].rbegin(); i != adj[v].rend(); ++i) {
                if (!visited[*i]) {
                    s.push(*i);
                }
            }
        }
    }

    // Breadth-First Search (BFS)
    void BFS(int start) {
        vector<bool> visited(V, false); // Mark all vertices as not visited
        queue<int> q; // Queue for BFS

        visited[start] = true;
        q.push(start);

        while (!q.empty()) {
            int v = q.front();
            cout << v << " ";
            q.pop();

            // Get all adjacent vertices of the dequeued vertex
            for (auto i : adj[v]) {
                if (!visited[i]) {
                    visited[i] = true;
                    q.push(i);
                }
            }
        }
    }

    // Check if there is a path between two nodes (using DFS)
    bool isPathDFS(int src, int dest) {
        vector<bool> visited(V, false); // Mark all vertices as not visited
        return isPathDFSUtil(src, dest, visited);
    }

    // Utility function for isPathDFS
    bool isPathDFSUtil(int src, int dest, vector<bool> &visited) {
        if (src == dest)
            return true;

        visited[src] = true;

        for (auto i : adj[src]) {
            if (!visited[i]) {
                if (isPathDFSUtil(i, dest, visited))
                    return true;
            }
        }
        return false;
    }
};

int main() {
    // Create a graph
    int vertices = 5;
    Graph g(vertices);

    // Add edges
    g.addEdge(0, 1);
    g.addEdge(0, 4);
    g.addEdge(1, 2);
    g.addEdge(1, 3);
    g.addEdge(1, 4);
    g.addEdge(2, 3);
    g.addEdge(3, 4);

    // Display graph
    cout << "Graph adjacency list:" << endl;
    g.displayGraph();
    
    // Perform DFS
    cout << "\nDFS starting from vertex 0:" << endl;
    g.DFS(0);

    // Perform BFS
    cout << "\n\nBFS starting from vertex 0:" << endl;
    g.BFS(0);

    // Check for path
    int src = 0, dest = 3;
    cout << "\n\nIs there a path between " << src << " and " << dest << "?" << endl;
    if (g.isPathDFS(src, dest))
        cout << "Yes, there is a path." << endl;
    else
        cout << "No, there is no path." << endl;

    return 0;
}
`,
    language: 'cpp',
    theme: 'vs-dark'
  });
});
