import { useState } from "react";
import { useStore } from "./store/useStore";
import { MarkdownEditor } from "./components/MarkdownEditor";
import { RichTextEditor } from "./components/RichTextEditor";
import { CodeEditor } from "./components/CodeEditor";
import { UserList } from "./components/UserList";

function App() {
  const { activeEditor, setActiveEditor } = useStore();
  const [isSidebarOpen] = useState(true);

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
    <div
      className="fixed inset-0 min-h-screen min-w-full flex items-center justify-center"
      style={{
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div className="relative w-full h-full flex flex-col items-center justify-center">
        {/* Navigation Bar */}
        <header className="w-full flex items-center justify-between px-12 pt-10 pb-0">
          <div className=" flex justify-center items-center gap-2">
            <span
              className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2"
              style={{ fontFamily: "Inter, sans-serif", fontSize: 20 }}
            >
              <span className="inline-block align-middle bg-white/40 rounded-full p-2 shadow-md">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="14"
                    cy="14"
                    r="12"
                    fill="#EAF0F8"
                    stroke="#3B82F6"
                    strokeWidth="2"
                  />
                  <circle cx="14" cy="14" r="5" fill="#3B82F6" />
                </svg>
              </span>
            </span>

            <span className="text-2xl font-bold text-gray-900 tracking-tight">
              SyncScribe
            </span>
          </div>
          <button
            className="px-8 py-2 bg-[#3B82F6] text-white rounded-full shadow-lg font-semibold text-lg ml-auto hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
            style={{ boxShadow: "0 4px 24px 0 #3B82F6AA" }}
          >
            Share
          </button>
        </header>
        <div className="flex flex-1 w-full items-center justify-center gap-x-10 px-12 pb-12 pt-4 h-[calc(100vh-90px)]">
          {/* Sidebar */}
          <aside className="flex flex-col justify-between h-full min-w-[260px] max-w-xs px-6 py-10 bg-white/30 backdrop-blur-lg rounded-3xl shadow-xl border border-white/40 transition-all">
            <div className="flex flex-col gap-6">
              {[
                { key: "markdown", label: "Markdown Editor" },
                { key: "richText", label: "Rich Text" },
                { key: "code", label: "Code Editor" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveEditor(tab.key as any)}
                  className={`w-full py-3 text-base font-medium rounded-xl transition-all border
                    ${
                      activeEditor === tab.key
                        ? "bg-white text-blue-600 border-blue-400 shadow-lg"
                        : "bg-white/60 text-gray-700 border-transparent hover:bg-white/80 hover:shadow-md"
                    }
                  `}
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="mt-10 bg-white/40 rounded-2xl shadow-lg border border-white/50 p-5 flex flex-col items-center gap-4">
              <span className="text-base font-semibold text-gray-700 mb-1">
                Active Users
              </span>
              <div className="flex flex-col gap-3">
                <div className="relative">
                  <img
                    src="https://randomuser.me/api/portraits/women/44.jpg"
                    alt="User 1"
                    className="w-10 h-10 rounded-full border-2 border-white shadow"
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full ring-2 ring-white shadow animate-pulse"></span>
                </div>
                <div className="relative">
                  <img
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    alt="User 2"
                    className="w-10 h-10 rounded-full border-2 border-white shadow"
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full ring-2 ring-white shadow animate-pulse"></span>
                </div>
                <div className="relative">
                  <img
                    src="https://randomuser.me/api/portraits/women/68.jpg"
                    alt="User 3"
                    className="w-10 h-10 rounded-full border-2 border-white shadow"
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full ring-2 ring-white shadow animate-pulse"></span>
                </div>
              </div>
            </div>
          </aside>
          {/* Editor Area */}
          <main className="flex-1 flex flex-col items-center justify-center h-full">
            <div className="relative w-full max-w-3xl h-full glass-bg p-10 dotted-grid flex flex-col items-center justify-start">
              <div className="w-full h-full flex flex-col">
                <div
                  className="text-2xl font-bold text-gray-800 mb-6 text-left"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {activeEditor === "markdown" && "Markdown Editor"}
                  {activeEditor === "richText" && "Rich Text Editor"}
                  {activeEditor === "code" && "Code Editor"}
                </div>
                {/* Only the editor area will scroll */}
                <div className="flex-1 min-h-0 max-h-[calc(100vh-320px)] rounded-xl">
                  {renderEditor()}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
