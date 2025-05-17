import { useState } from "react";
import { useStore } from "./store/useStore";
import { MarkdownEditor } from "./components/MarkdownEditor";
import { RichTextEditor } from "./components/RichTextEditor";
import { CodeEditor } from "./components/CodeEditor";
import { UserList } from "./components/UserList";

function App() {
  const { activeEditor, setActiveEditor } = useStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isUserListOpen, setIsUserListOpen] = useState(true);

  const renderEditor = () => {
    switch (activeEditor) {
      case "markdown":
        return <MarkdownEditor />;
      case "richText":
        return <RichTextEditor />;
      case "code":
        return <CodeEditor />;
      default:
        return (
          <div className="h-full flex items-center justify-center text-gray-500">
            Select an editor from the sidebar
          </div>
        );
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <h1 className="text-xl font-semibold text-gray-900">
            Collaborative Editor
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsUserListOpen(!isUserListOpen)}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </button>
          <button className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
            Share
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`${
            isSidebarOpen ? "w-64" : "w-0"
          } bg-white border-r border-gray-200 transition-all duration-300 overflow-hidden`}
        >
          <nav className="p-4">
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setActiveEditor("markdown")}
                  className={`w-full text-left px-4 py-2 rounded-md ${
                    activeEditor === "markdown"
                      ? "bg-primary-50 text-primary-700"
                      : "hover:bg-gray-100"
                  }`}
                >
                  Markdown Editor
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveEditor("richText")}
                  className={`w-full text-left px-4 py-2 rounded-md ${
                    activeEditor === "richText"
                      ? "bg-primary-50 text-primary-700"
                      : "hover:bg-gray-100"
                  }`}
                >
                  Rich Text Editor
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveEditor("code")}
                  className={`w-full text-left px-4 py-2 rounded-md ${
                    activeEditor === "code"
                      ? "bg-primary-50 text-primary-700"
                      : "hover:bg-gray-100"
                  }`}
                >
                  Code Editor
                </button>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Editor Area */}
        <main className="flex-1 overflow-hidden">{renderEditor()}</main>

        {/* User List */}
        {isUserListOpen && <UserList />}
      </div>
    </div>
  );
}

export default App;
