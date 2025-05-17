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
      <div className="border-b border-gray-200 p-2 flex items-center gap-4 pb-4">
        <button
          onClick={() => editor?.chain().focus().toggleBold().run()}
          aria-label="Bold"
          className={`px-5 py-2 glass-btn-bg shadow rounded-full font-semibold text-gray-700 text-lg hover:bg-white border border-gray-100 transition-all${
            editor?.isActive("bold") ? " ring-2 ring-blue-200 !bg-blue-50 " : ""
          }`}
        >
          B
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          className={`px-5 py-2 glass-btn-bg shadow rounded-full font-semibold text-gray-700 text-lg hover:bg-white border border-gray-100 transition-all${
            editor?.isActive("italic")
              ? " ring-2 ring-blue-200 !bg-blue-50 "
              : ""
          }`}
        >
          /
        </button>
        <button
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={`px-5 py-2 glass-btn-bg shadow rounded-full font-semibold text-gray-700 text-lg hover:bg-white border border-gray-100 transition-all${
            editor?.isActive("heading", { level: 1 })
              ? " ring-2 ring-blue-200 !bg-blue-50 "
              : ""
          }`}
        >
          H1
        </button>
        <button
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`px-5 py-2 glass-btn-bg shadow rounded-full font-semibold text-gray-700 text-lg hover:bg-white border border-gray-100 transition-all${
            editor?.isActive("heading", { level: 2 })
              ? " ring-2 ring-blue-200 !bg-blue-50 "
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
    </div>
  );
}
