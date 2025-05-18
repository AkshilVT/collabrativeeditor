import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useRoom } from "@liveblocks/react";
import {
  Toolbar,
  FloatingToolbar,
  useLiveblocksExtension,
  useIsEditorReady,
} from "@liveblocks/react-tiptap";
import { useEffect, useState } from "react";
import "./CollaborativeEditor.css";

export function CollaborativeEditor() {
  const room = useRoom();
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
    <div className="h-full flex flex-col relative">
      {/* Toolbar */}
      <div className="border-b border-gray-200 p-2 pb-4 flex items-center gap-4 bg-transparent">
        <Toolbar
          editor={editor}
          className="flex flex-wrap items-center w-full gap-4 liveblocks-toolbar"
        >
          <Toolbar.SectionHistory />
          <Toolbar.BlockSelector />
          <Toolbar.Toggle
            name="Bold"
            active={editor ? editor.isActive("bold") : false}
            onClick={() => editor?.chain().focus().toggleBold().run()}
          />
          <Toolbar.Toggle
            name="Italic"
            active={editor ? editor.isActive("italic") : false}
            onClick={() => editor?.chain().focus().toggleItalic().run()}
          />
          <Toolbar.Toggle
            name="Strikethrough"
            active={editor ? editor.isActive("strike") : false}
            onClick={() => editor?.chain().focus().toggleStrike().run()}
          />
          <Toolbar.Toggle
            name="<>"
            active={editor ? editor.isActive("code") : false}
            onClick={() => editor?.chain().focus().toggleCode().run()}
          />
        </Toolbar>
      </div>

      {/* Editor */}
      <div className="flex-1 overflow-auto m-4">
        <div className="rounded-2xl h-full">
          <EditorContent editor={editor} className="editor" />
        </div>
        <FloatingToolbar
          editor={editor}
          className="glass-btn-bg shadow-lg rounded-xl border border-gray-100 p-2 flex items-center gap-2"
        />
        {/* Word Count */}
        <div className="absolute bottom-4 right-8 bg-white/60 backdrop-blur px-3 py-1 rounded-full text-xs text-gray-700 shadow">
          {wordCount} word{wordCount !== 1 ? "s" : ""}
        </div>
      </div>
    </div>
  );
}
