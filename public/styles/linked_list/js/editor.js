// Monaco Editor integration
require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.21.2/min/vs' } });
require(['vs/editor/editor.main'], function() {
  monaco.editor.create(document.getElementById('editor'), {
    value: `// Linked List Code\n`,
    language: 'cpp',
    theme: 'vs-dark'
  });
});
