import { Editor } from "@monaco-editor/react";
import { useStore } from "../store/useStore";
import { useEffect } from "react";
import type { editor } from "monaco-editor";

export function CodeEditor() {
  const { setCodeEditor } = useStore();

  const handleEditorDidMount = (editor: editor.IStandaloneCodeEditor) => {
    setCodeEditor(editor);
  };

  useEffect(() => {
    return () => {
      setCodeEditor(null);
    };
  }, [setCodeEditor]);

  return (
    <div className="h-full">
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
    </div>
  );
}
