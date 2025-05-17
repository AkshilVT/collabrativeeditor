import { Editor } from "@monaco-editor/react";
import { useStore } from "../store/useStore";
import { useEffect, useState } from "react";
import type { editor } from "monaco-editor";

export function CodeEditor() {
  const { setCodeEditor } = useStore();
  const [wordCount, setWordCount] = useState(0);

  const handleEditorDidMount = (editor: editor.IStandaloneCodeEditor) => {
    setCodeEditor(editor);
    setWordCount(editor.getValue().trim().split(/\s+/).filter(Boolean).length);
    editor.onDidChangeModelContent(() => {
      setWordCount(
        editor.getValue().trim().split(/\s+/).filter(Boolean).length
      );
    });
  };

  useEffect(() => {
    return () => {
      setCodeEditor(null);
    };
  }, [setCodeEditor]);

  return (
    <div className="h-full relative">
      <Editor
        height="100%"
        defaultLanguage="typescript"
        defaultValue="// Welcome to the Code Editor\n// Start coding here..."
        theme="vs-dark"
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: true },
          fontSize: 14,
          wordWrap: "on",
          lineNumbers: "on",
          renderWhitespace: "selection",
          tabSize: 2,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
      {/* Word Count */}
      <div className="absolute bottom-4 right-8 bg-white/60 backdrop-blur px-3 py-1 rounded-full text-xs text-gray-700 shadow">
        {wordCount} word{wordCount !== 1 ? "s" : ""}
      </div>
    </div>
  );
}
