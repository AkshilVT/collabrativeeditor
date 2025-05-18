import { Editor } from "@monaco-editor/react";
import { useStore } from "../store/useStore";
import { useEffect, useState, useRef } from "react";
import type { editor } from "monaco-editor";
import styles from "./CodeEditor.module.css";

declare global {
  interface Window {
    monaco: typeof import("monaco-editor");
  }
}

const LANGUAGES = [
  { id: "typescript", name: "TypeScript" },
  { id: "javascript", name: "JavaScript" },
  { id: "html", name: "HTML" },
  { id: "css", name: "CSS" },
  { id: "json", name: "JSON" },
  { id: "markdown", name: "Markdown" },
  { id: "python", name: "Python" },
  { id: "java", name: "Java" },
  { id: "csharp", name: "C#" },
  { id: "cpp", name: "C++" },
];

const THEMES = [
  { id: "vs-dark", name: "Dark" },
  { id: "vs-light", name: "Light" },
  { id: "hc-black", name: "High Contrast Dark" },
  { id: "hc-light", name: "High Contrast Light" },
];

export function CodeEditor() {
  const { setCodeEditor } = useStore();
  const [wordCount, setWordCount] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState("python");
  const [selectedTheme, setSelectedTheme] = useState("vs-dark");
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  const handleEditorDidMount = (editor: editor.IStandaloneCodeEditor) => {
    editorRef.current = editor;
    setCodeEditor(editor);
    setWordCount(editor.getValue().trim().split(/\s+/).filter(Boolean).length);
    editor.onDidChangeModelContent(() => {
      setWordCount(
        editor.getValue().trim().split(/\s+/).filter(Boolean).length
      );
    });
  };

  const handleLanguageChange = (newLanguage: string) => {
    setSelectedLanguage(newLanguage);
    if (editorRef.current) {
      const model = editorRef.current.getModel();
      if (model) {
        window.monaco.editor.setModelLanguage(model, newLanguage);
      }
    }
  };

  useEffect(() => {
    return () => {
      setCodeEditor(null);
    };
  }, [setCodeEditor]);

  return (
    <div className="h-full max-h-[calc(100%-82px)] flex flex-col gap-4">
      {/* Toolbar */}
      <div className={styles.toolbar}>
        <div className="flex items-center gap-2">
          <label htmlFor="language" className={styles.label}>
            Language:
          </label>
          <select
            id="language"
            value={selectedLanguage}
            onChange={(e) => handleLanguageChange(e.target.value)}
            className={styles.select}
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.id} value={lang.id}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="theme" className={styles.label}>
            Theme:
          </label>
          <select
            id="theme"
            value={selectedTheme}
            onChange={(e) => setSelectedTheme(e.target.value)}
            className={styles.select}
          >
            {THEMES.map((theme) => (
              <option key={theme.id} value={theme.id}>
                {theme.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div
        className={`h-full flex flex-col relative glass-bg ${styles.editorContainer}`}
      >
        <div className="flex-1 overflow-auto m-4 relative">
          <div className={`${styles.editorWrapper}`}>
            <Editor
              height="100%"
              defaultLanguage={selectedLanguage}
              defaultValue="// Welcome to the Code Editor\n// Start coding here..."
              theme={selectedTheme}
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
        </div>
        {/* Word Count */}
        <div className={styles.wordCount}>
          {wordCount} word{wordCount !== 1 ? "s" : ""}
        </div>
      </div>
    </div>
  );
}
