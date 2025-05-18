import { useStore } from "./store/useStore";
import { MarkdownEditor } from "./components/MarkdownEditor";
import { CodeEditor } from "./components/CodeEditor";
import { CollaborativeEditor } from "./components/CollaborativeEditor";
import { LiveblocksProvider, RoomProvider } from "@liveblocks/react";
import { ActiveUsers } from "./components/ActiveUsers";
import { ShareModal } from "./components/ShareModal";
import { useState } from "react";

function App() {
  const { activeEditor, setActiveEditor } = useStore();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const renderEditor = () => {
    switch (activeEditor) {
      case "richText":
        return <MarkdownEditor />;
      case "code":
        return <CodeEditor />;
      case "collaborative":
        return <CollaborativeEditor />;
      default:
        return (
          <div className="h-full flex items-center justify-center text-gray-500">
            Select an editor from the sidebar
          </div>
        );
    }
  };

  return (
    <LiveblocksProvider
      publicApiKey={import.meta.env.VITE_LIVEBLOCKS_PUBLIC_KEY}
    >
      <RoomProvider id="my-room">
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
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs>
                        <radialGradient id="logo-bg" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stopColor="#e0e7ff" />
                          <stop offset="100%" stopColor="#f0abfc" />
                        </radialGradient>
                        <radialGradient
                          id="logo-inner"
                          cx="50%"
                          cy="50%"
                          r="50%"
                        >
                          <stop offset="0%" stopColor="#a5b4fc" />
                          <stop offset="100%" stopColor="#818cf8" />
                        </radialGradient>
                      </defs>
                      <circle
                        cx="16"
                        cy="16"
                        r="14"
                        fill="url(#logo-bg)"
                        stroke="#a5b4fc"
                        strokeWidth="2"
                        style={{ filter: "drop-shadow(0 2px 12px #a5b4fc55)" }}
                      />
                      <circle
                        cx="16"
                        cy="16"
                        r="6"
                        fill="url(#logo-inner)"
                        fillOpacity="0.85"
                        style={{ filter: "blur(0.5px)" }}
                      />
                      <circle
                        cx="16"
                        cy="16"
                        r="2"
                        fill="#3B82F6"
                        fillOpacity="0.9"
                      />
                    </svg>
                  </span>
                </span>

                <span className="text-2xl font-bold text-gray-900 tracking-tight">
                  SyncScribe
                </span>
              </div>
              <button
                onClick={() => setIsShareModalOpen(true)}
                className="px-8 py-2 glass-btn-primary text-blue-800 rounded-full shadow-lg font-semibold text-lg ml-auto border transition-all
                  hover:bg-white/70 active:bg-white/90 focus:ring-2 focus:ring-blue-200 focus:outline-none"
              >
                Share
              </button>
            </header>
            <div className="flex flex-1 w-full items-center justify-center gap-x-10 px-12 pb-12 pt-4 h-[calc(100vh-90px)]">
              {/* Sidebar */}
              <aside className="flex flex-col justify-between h-full min-w-[260px] max-w-xs px-6 py-10 bg-white/30 backdrop-blur-lg rounded-3xl shadow-xl border border-white/40 transition-all">
                <div className="flex flex-col gap-6">
                  {[
                    { key: "richText", label: "Markdown Editor" },
                    { key: "code", label: "Code Editor" },
                    {
                      key: "collaborative",
                      label: "Collaborative Editor",
                      tag: (
                        <span className="flex items-center gap-1.5 text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                          Live
                        </span>
                      ),
                    },
                  ].map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveEditor(tab.key as any)}
                      className={`w-full py-3 text-base font-medium rounded-xl transition-all border glass-btn-bg
                        hover:bg-white/70
                        ${
                          activeEditor === tab.key
                            ? "!bg-white text-blue-600 border-blue-400 shadow-lg"
                            : " text-gray-700 border-transparent hover:shadow-md"
                        }
                      `}
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      <div className="flex flex-col items-center gap-1">
                        <span>{tab.label}</span>
                        {tab.tag || null}
                      </div>
                    </button>
                  ))}
                </div>
                {/* Active users */}
                <div className="mt-10 w-full flex justify-center">
                  <ActiveUsers />
                </div>
              </aside>
              {/* Editor Area */}
              <main className="flex-1 flex flex-col items-center justify-center h-full">
                <div className="relative w-full max-w-5xl h-full dotted-grid flex flex-col items-center justify-start">
                  <div className="w-full h-full flex flex-col">
                    {/* Heading */}
                    <div className="mb-6">
                      <div
                        className="text-2xl font-bold text-gray-800 text-left glass-bg px-6 py-4 rounded-xl cursor-pointer flex items-center justify-between"
                        style={{ fontFamily: "Inter, sans-serif" }}
                        onClick={() => setIsAccordionOpen(!isAccordionOpen)}
                      >
                        <span>
                          {activeEditor === "richText" && "Markdown Editor"}
                          {activeEditor === "code" && "Code Editor"}
                          {activeEditor === "collaborative" &&
                            "Collaborative Editor"}
                        </span>
                        <svg
                          className={`w-6 h-6 transform transition-transform duration-200 ${
                            isAccordionOpen ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                      <div
                        className={`glass-bg px-6 py-4 mt-2 rounded-xl transition-all duration-200 ${
                          isAccordionOpen ? "block" : "hidden"
                        }`}
                      >
                        {activeEditor === "richText" && (
                          <p className="text-gray-600">
                            A powerful markdown editor with live preview, syntax
                            highlighting, and export capabilities.
                          </p>
                        )}
                        {activeEditor === "code" && (
                          <p className="text-gray-600">
                            A feature-rich code editor with syntax highlighting,
                            line numbers, and multiple language support.
                          </p>
                        )}
                        {activeEditor === "collaborative" && (
                          <p className="text-gray-600">
                            Real-time collaborative editor with presence
                            awareness, cursor tracking, and rich text
                            formatting.
                          </p>
                        )}
                      </div>
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
          <ShareModal
            isOpen={isShareModalOpen}
            onClose={() => setIsShareModalOpen(false)}
          />
        </div>
      </RoomProvider>
    </LiveblocksProvider>
  );
}

export default App;
