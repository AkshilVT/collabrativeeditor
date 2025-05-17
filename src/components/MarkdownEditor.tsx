import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useStore } from "../store/useStore";
import { useEffect, useState } from "react";

export function MarkdownEditor() {
  const { setMarkdownEditor } = useStore();
  const [wordCount, setWordCount] = useState(0);

  const editor = useEditor({
    extensions: [StarterKit],
    content: "Start typing to begin...",
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none",
      },
    },
  });

  useEffect(() => {
    if (editor) {
      setMarkdownEditor(editor);
      setWordCount(editor.getText().trim().split(/\s+/).filter(Boolean).length);
      editor.on("update", () => {
        setWordCount(
          editor.getText().trim().split(/\s+/).filter(Boolean).length
        );
      });
    }
    return () => {
      setMarkdownEditor(null);
    };
  }, [editor, setMarkdownEditor]);

  return (
    <div className="h-full flex flex-col relative">
      {/* Toolbar */}
      <div className="border-b border-gray-200 p-2 flex items-center gap-4 pb-4">
        <button
          onClick={() => editor?.chain().focus().toggleBold().run()}
          aria-label="Bold"
          className={`px-5 py-2 glass-btn-bg shadow rounded-full font-semibold text-gray-700 text-lg border border-gray-100 transition-all
            hover:bg-white/70 active:bg-white/90 focus:ring-2 focus:ring-blue-200
            ${
              editor?.isActive("bold")
                ? " ring-2 ring-blue-200 !bg-blue-50 !text-blue-600"
                : ""
            }`}
        >
          B
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          className={`px-5 py-2 glass-btn-bg shadow rounded-full font-semibold text-gray-700 text-lg border border-gray-100 transition-all
            hover:bg-white/70 active:bg-white/90 focus:ring-2 focus:ring-blue-200
            ${
              editor?.isActive("italic")
                ? " ring-2 ring-blue-200 !bg-blue-50 !text-blue-600"
                : ""
            }`}
        >
          /
        </button>
        <button
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={`px-5 py-2 glass-btn-bg shadow rounded-full font-semibold text-gray-700 text-lg border border-gray-100 transition-all
            hover:bg-white/70 active:bg-white/90 focus:ring-2 focus:ring-blue-200
            ${
              editor?.isActive("heading", { level: 1 })
                ? " ring-2 ring-blue-200 !bg-blue-50 !text-blue-600"
                : ""
            }`}
        >
          H1
        </button>
        <button
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`px-5 py-2 glass-btn-bg shadow rounded-full font-semibold text-gray-700 text-lg border border-gray-100 transition-all
            hover:bg-white/70 active:bg-white/90 focus:ring-2 focus:ring-blue-200
            ${
              editor?.isActive("heading", { level: 2 })
                ? " ring-2 ring-blue-200 !bg-blue-50 !text-blue-600"
                : ""
            }`}
        >
          H2
        </button>
      </div>

      {/* Editor */}
      <div className="flex-1 overflow-auto m-4">
        <EditorContent editor={editor} />
      </div>

      {/* Word Count */}
      <div className="absolute bottom-4 right-8 bg-white/60 backdrop-blur px-3 py-1 rounded-full text-xs text-gray-700 shadow">
        {wordCount} word{wordCount !== 1 ? "s" : ""}
      </div>
    </div>
  );
}
