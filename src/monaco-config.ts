import * as monaco from 'monaco-editor';

export const MonacoConfig = {
  baseUrl: '/assets',
  defaultOptions: {
    scrollBeyondLastLine: false,
    lineNumbers: 'on',
    theme: 'vs-dark',
    automaticLayout: true,
  },
  onMonacoLoad: () => {
    console.log('Monaco Editor Loaded!');
    // Configure Monaco here
    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ES2016,
      allowNonTsExtensions: true
    });
  }
};
