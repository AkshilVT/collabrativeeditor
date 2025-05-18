import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useRoom } from "@liveblocks/react";
import {
  Toolbar,
  FloatingToolbar,
  useLiveblocksExtension,
} from "@liveblocks/react-tiptap";
import "./CollaborativeEditor.css";

export function CollaborativeEditor() {
  const room = useRoom();
  const liveblocks = useLiveblocksExtension();

  const editor = useEditor({
    extensions: [
      liveblocks,
      StarterKit.configure({
        // The Liveblocks extension comes with its own history handling
        history: false,
      }),
    ],
  });

  return (
    <div className="h-full flex flex-col relative">
      {/* Toolbar */}
      <div className="border-b border-gray-200 p-2 pb-4 flex items-center gap-4 bg-transparent">
        <Toolbar
          editor={editor}
          className="flex items-center w-full gap-4 liveblocks-toolbar"
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
        <div className="rounded-2xl shadow-xl h-full">
          <EditorContent editor={editor} className="editor" />
        </div>
        <FloatingToolbar
          editor={editor}
          className="glass-btn-bg shadow-lg rounded-xl border border-gray-100 p-2 flex items-center gap-2"
        />
      </div>
    </div>
  );
}
