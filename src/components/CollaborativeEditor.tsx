import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  FloatingToolbar,
  useLiveblocksExtension,
  useIsEditorReady,
} from "@liveblocks/react-tiptap";
import { useEffect, useState } from "react";
import { EditorToolbar } from "./EditorToolbar";
import "./CollaborativeEditor.css";

export function CollaborativeEditor() {
  const liveblocks = useLiveblocksExtension();
  const isEditorReady = useIsEditorReady();

  const editor = useEditor({
    extensions: [
      liveblocks,
      StarterKit.configure({
        // The Liveblocks extension comes with its own history handling
        history: false,
      }),
    ],
  });

  // Word count state
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    if (!editor) return;
    const updateCount = () => {
      setWordCount(editor.getText().trim().split(/\s+/).filter(Boolean).length);
    };
    updateCount();
    editor.on("update", updateCount);
    return () => {
      editor.off("update", updateCount);
    };
  }, [editor]);

  if (!isEditorReady) {
    return (
      <div className="flex flex-1 items-center justify-center h-full w-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
      </div>
    );
  }

  return (
    <div className="h-full max-h-[calc(100%-82px)] flex flex-col gap-4">
      {/* Toolbar */}
      <div className="p-4 flex items-center gap-4 glass-bg toolbar-enter">
        <EditorToolbar editor={editor} />
      </div>
      <div className="h-full flex flex-col relative glass-bg">
        {/* Editor */}
        <div className="flex-1 overflow-auto m-4 relative">
          <div className="rounded-2xl h-full">
            <EditorContent editor={editor} className="editor" />
          </div>
          <FloatingToolbar
            editor={editor}
            offset={12}
            className="glass-btn-bg shadow-lg w-max rounded-xl border border-gray-100 px-4 py-2 flex items-center gap-4"
          >
            <EditorToolbar
              editor={editor}
              toolbarItems={["bold", "italic", "strikethrough", "code"]}
            />
          </FloatingToolbar>
          {/* Word Count */}
        </div>
        <div className="absolute bottom-4 right-8 bg-white/60 backdrop-blur px-3 py-1 rounded-full text-xs text-gray-700 shadow">
          {wordCount} word{wordCount !== 1 ? "s" : ""}
        </div>
      </div>
    </div>
  );
}
