# Collaborative Editor Suite Documentation

## Overview

This documentation covers the implementation details, architecture, and guidelines for the Collaborative Editor Suite - a modern web application built with Next.js that provides three distinct editor modes: Markdown, Rich Text, and Code.

## Documentation Structure

### Core Documentation

- [Getting Started](./getting-started.md)
- [Architecture Overview](./architecture.md)
- [Project Structure](./project-structure.md)
- [Design System](./design-system.md)

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

- **Frontend Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **UI Library**: React
- **Rich Text Editor**: TipTap (ProseMirror)
- **Code Editor**: CodeMirror 6
- **Real-time Collaboration**: Liveblocks/Yjs
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

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
