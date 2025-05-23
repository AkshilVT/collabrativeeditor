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
    <div className="relative h-full w-full">
      <div className="h-full max-h-[calc(100%-82px)] flex flex-col gap-4">
        {/* Toolbar */}
        <div className="p-4 flex items-center gap-4 glass-bg toolbar-enter">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <label htmlFor="language" className="font-medium text-gray-700">
                Language:
              </label>
              <select
                id="language"
                value={selectedLanguage}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="rounded-lg border px-2 py-1 bg-white/80 text-gray-800"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang.id} value={lang.id}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="theme" className="font-medium text-gray-700">
                Theme:
              </label>
              <select
                id="theme"
                value={selectedTheme}
                onChange={(e) => setSelectedTheme(e.target.value)}
                className="rounded-lg border px-2 py-1 bg-white/80 text-gray-800"
              >
                {THEMES.map((theme) => (
                  <option key={theme.id} value={theme.id}>
                    {theme.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="h-full flex flex-col relative glass-bg">
          <div className="flex-1 overflow-auto m-4 relative ">
            <div className={`${styles.editorWrapper}`}>
              <Editor
                height="100%"
                defaultLanguage={selectedLanguage}
                defaultValue="// Start coding here..."
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
        </div>
      </div>
      {/* Word Count - OUTSIDE the scrollable area */}
      <div className="absolute bottom-8 right-12 bg-white/60 backdrop-blur px-3 py-1 rounded-full text-xs text-gray-700 shadow z-50 pointer-events-none">
        {wordCount} word{wordCount !== 1 ? "s" : ""}
      </div>
    </div>
  );
}
