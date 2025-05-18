import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useStore } from "../store/useStore";
import { useEffect, useState } from "react";
import { EditorToolbar } from "./EditorToolbar";

export function MarkdownEditor() {
  const { setRichTextEditor } = useStore();
  const [wordCount, setWordCount] = useState(0);

  const editor = useEditor({
    extensions: [StarterKit],
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none",
      },
    },
  });

  useEffect(() => {
    if (editor) {
      setRichTextEditor(editor);
      setWordCount(editor.getText().trim().split(/\s+/).filter(Boolean).length);
      editor.on("update", () => {
        setWordCount(
          editor.getText().trim().split(/\s+/).filter(Boolean).length
        );
      });
    }
    return () => {
      setRichTextEditor(null);
    };
  }, [editor, setRichTextEditor]);

  return (
    <div className="h-full max-h-[calc(100%-82px)] flex flex-col gap-4">
      {/* Toolbar */}
      <div className="p-4 flex items-center gap-4 glass-bg">
        <EditorToolbar editor={editor} />
      </div>

      <div className="h-full flex flex-col relative glass-bg">
        {/* Editor */}
        <div className="flex-1 overflow-auto m-4 relative">
          <div className="rounded-2xl h-full">
            <EditorContent editor={editor} className="editor" />
          </div>
        </div>

        {/* Word Count */}
        <div className="absolute bottom-4 right-8 bg-white/60 backdrop-blur px-3 py-1 rounded-full text-xs text-gray-700 shadow">
          {wordCount} word{wordCount !== 1 ? "s" : ""}
        </div>
      </div>
    </div>
  );
}
