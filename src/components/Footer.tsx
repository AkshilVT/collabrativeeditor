import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full py-4 px-12 text-center text-sm text-gray-600 animate-[fadeIn_0.5s_ease-in-out]">
      <a
        href="https://github.com/AkshilVT/collabrativeeditor?tab=readme-ov-file#engineers-note"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-blue-600 transition-colors duration-200"
      >
        Check out the Engineer's Note on this project
      </a>
    </footer>
  );
};
