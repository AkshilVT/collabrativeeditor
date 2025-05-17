import { create } from "zustand";
import { Editor } from "@tiptap/react";
import type { editor } from "monaco-editor";

interface User {
  id: string;
  name: string;
  color: string;
}

interface EditorState {
  activeEditor: "markdown" | "richText" | "code";
  markdownEditor: Editor | null;
  richTextEditor: Editor | null;
  codeEditor: editor.IStandaloneCodeEditor | null;
  currentUser: User;
  users: User[];
  setActiveEditor: (editor: "markdown" | "richText" | "code") => void;
  setMarkdownEditor: (editor: Editor | null) => void;
  setRichTextEditor: (editor: Editor | null) => void;
  setCodeEditor: (editor: editor.IStandaloneCodeEditor | null) => void;
  addUser: (user: User) => void;
  removeUser: (userId: string) => void;
}

const generateRandomColor = () => {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
};

export const useStore = create<EditorState>((set) => ({
  activeEditor: "markdown",
  markdownEditor: null,
  richTextEditor: null,
  codeEditor: null,
  currentUser: {
    id: Math.random().toString(36).substr(2, 9),
    name: "User " + Math.floor(Math.random() * 100),
    color: generateRandomColor(),
  },
  users: [],
  setActiveEditor: (editor) => set({ activeEditor: editor }),
  setMarkdownEditor: (editor) => set({ markdownEditor: editor }),
  setRichTextEditor: (editor) => set({ richTextEditor: editor }),
  setCodeEditor: (editor) => set({ codeEditor: editor }),
  addUser: (user) => set((state) => ({ users: [...state.users, user] })),
  removeUser: (userId) =>
    set((state) => ({
      users: state.users.filter((user) => user.id !== userId),
    })),
}));
