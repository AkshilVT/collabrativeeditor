# Collaborative Editor Suite Documentation

## Overview

This documentation covers the implementation details, architecture, and guidelines for the Collaborative Editor Suite - a modern web application built with Next.js that provides three distinct editor modes: Markdown, Rich Text, and Code.

## Features

### Markdown Editor

- Clean, distraction-free markdown editing experience
- Live preview of rendered markdown
- Word count and basic statistics
- Default editor selection for quick access
- Export capabilities for markdown and HTML formats

### Code Editor

- Syntax highlighting for multiple programming languages
- Customizable themes for different coding preferences
- Language-specific features and support
- Line numbers and code folding
- Real-time error detection and linting

### Collaborative Editor

- Real-time multi-user collaboration
- Live presence indicators showing active users
- Floating toolbar for quick formatting
- Selection-based collaboration with cursor tracking
- Rich text formatting capabilities
- Conflict-free editing with automatic merging

## Engineer's Note

This project was built in approximately 10 hours, including research and development time. The development process involved:

- Creating comprehensive documentation first to guide the AI-assisted development
- Using Cursor IDE as a development companion
- Following a structured approach with clear project requirements (see [PRD.md](../PRD.md))

For those interested in the development process and technical decisions, I've documented everything in the [PRD.md](../PRD.md) and the [docs](./) directory. Your feedback and suggestions are welcome! If you find this project interesting, sharing it on social media would be greatly appreciated and would motivate me to build more similar projects.

## Documentation Structure

### Core Documentation

- [Getting Started](./getting-started.md)
- [Architecture Overview](./architecture.md)
- [Design System](./design-system.md)

### Source Code Structure

```
src/
├── components/           # React components
│   ├── ActiveUsers.tsx  # Real-time user presence
│   ├── CodeEditor.tsx   # Code editor implementation
│   ├── CollaborativeEditor.tsx  # Real-time collaborative editor
│   ├── Footer.tsx       # Application footer
│   ├── MarkdownEditor.tsx  # Markdown editor implementation
│   └── ShareModal.tsx   # Social sharing functionality
├── store/               # State management
│   └── useStore.ts     # Global state hooks
├── assets/             # Static assets
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

### Editor Documentation

- [Markdown Editor](./editors/markdown-editor.md)
- [Rich Text Editor](./editors/rich-text-editor.md)
- [Code Editor](./editors/code-editor.md)

### Technical Guides

- [Real-time Collaboration](./guides/real-time-collaboration.md)
- [State Management](./guides/state-management.md)
- [Performance Optimization](./guides/performance.md)
- [Accessibility Guidelines](./guides/accessibility.md)

### Development

- [Development Setup](./development/setup.md)
- [Contributing Guidelines](./development/contributing.md)
- [Testing Strategy](./development/testing.md)
- [Deployment Guide](./development/deployment.md)

### API Reference

- [Components API](./api/components.md)
- [Hooks API](./api/hooks.md)
- [Utilities API](./api/utilities.md)

## Quick Links

- [GitHub Repository](https://github.com/yourusername/collaborative-editor)
- [Live Demo](https://your-demo-url.vercel.app)
- [Issue Tracker](https://github.com/yourusername/collaborative-editor/issues)

## Tech Stack

- **Frontend Framework**: React with Vite
- **Language**: TypeScript
- **UI Library**: React
- **Rich Text Editor**: TipTap (ProseMirror)
- **Code Editor**: Monaco Editor
- **Real-time Collaboration**: Liveblocks
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

## Browser Compatibility

> **Note:** This application works best in Google Chrome on desktop/laptop devices. While it may function in other browsers, some features (particularly real-time collaboration and advanced editor capabilities) are optimized for Chrome.

## Features

- Markdown editor with live preview
- Collaborative rich text editor
- Code editor with syntax highlighting
- Real-time collaboration
- Modern, responsive design
- Dark mode support
- Accessibility compliance

## Getting Started

See [Getting Started Guide](./getting-started.md) for detailed setup instructions.

## Contributing

We welcome contributions! Please see our [Contributing Guidelines](./development/contributing.md) for details.

## License

MIT License - see [LICENSE](../LICENSE) for details

## Known Issues

### Monaco Editor Scrollbar Hiding

- **Issue:** Hiding Monaco Editor's scrollbars (while keeping scrolling functional and overlays working) is not fully supported. Attempts using both CSS and Monaco's `scrollbar` options either break overlays, scrolling, or do not work consistently across all browsers and themes.
- **Status:** Unresolved due to time constraints and limited knowledge of Monaco's internal rendering and custom scrollbar system.
- **Impact:** Scrollbars may remain visible in the code editor, or hiding them may cause UI/UX issues.
- **Workaround:** None at this time. Further research and/or community support is needed for a robust solution.
