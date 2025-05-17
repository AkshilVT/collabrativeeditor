import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useStore } from "../store/useStore";
import { useEffect } from "react";

export function MarkdownEditor() {
  const { setMarkdownEditor } = useStore();

  const editor = useEditor({
    extensions: [StarterKit],
    content: "# Welcome to the Markdown Editor\n\nStart typing to begin...",
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
    }
    return () => {
      setMarkdownEditor(null);
    };
  }, [editor, setMarkdownEditor]);

  return (
    <div className="h-full flex flex-col">
      {/* Toolbar */}
      <div className="border-b border-gray-200 p-2 flex items-center space-x-2">
        <button
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className={`p-2 rounded ${
            editor?.isActive("bold") ? "bg-gray-200" : "hover:bg-gray-100"
          }`}
        >
          Bold
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          className={`p-2 rounded ${
            editor?.isActive("italic") ? "bg-gray-200" : "hover:bg-gray-100"
          }`}
        >
          Italic
        </button>
        <button
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={`p-2 rounded ${
            editor?.isActive("heading", { level: 1 })
              ? "bg-gray-200"
              : "hover:bg-gray-100"
          }`}
        >
          H1
        </button>
        <button
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`p-2 rounded ${
            editor?.isActive("heading", { level: 2 })
              ? "bg-gray-200"
              : "hover:bg-gray-100"
          }`}
        >
          H2
        </button>
      </div>

      {/* Editor */}
      <div className="flex-1 overflow-auto p-4">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
