# Getting Started

## Prerequisites

- Node.js 18.17 or later
- npm or yarn
- Git

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/collaborative-editor.git
cd collaborative-editor
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Liveblocks API key:

```env
NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY=your_public_key_here
```

## Development

1. Start the development server:

```bash
npm run dev
# or
yarn dev
```

2. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
collaborative-editor/
├── app/                    # Next.js app directory
│   ├── editor/            # Markdown editor route
│   ├── collab-editor/     # Rich text editor route
│   ├── code-editor/       # Code editor route
│   └── layout.tsx         # Root layout
├── components/            # Shared components
│   ├── editor/           # Editor-specific components
│   ├── ui/               # UI components
│   └── layout/           # Layout components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── styles/              # Global styles
└── types/               # TypeScript types
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Editor Routes

- Markdown Editor: `/editor`
- Rich Text Editor: `/collab-editor`
- Code Editor: `/code-editor`

## Development Guidelines

### TypeScript

- Use TypeScript for all new code
- Define proper types for all components and functions
- Use interfaces for object shapes
- Avoid using `any` type

### React Components

- Use functional components with hooks
- Follow the component structure:

```typescript
import { FC } from 'react';

interface Props {
  // Component props
}

export const Component: FC<Props> = ({ prop1, prop2 }) => {
  // Component logic
  return (
    // JSX
  );
};
```

### Styling

- Use Tailwind CSS for styling
- Follow the design system guidelines
- Use CSS modules for component-specific styles
- Implement dark mode using CSS variables

### State Management

- Use React Context for global state
- Use local state for component-specific state
- Use custom hooks for complex state logic

### Real-time Collaboration

- Use Liveblocks for real-time features
- Implement presence awareness
- Handle cursor positions
- Manage document synchronization

## Next Steps

1. Review the [Architecture Overview](./architecture.md)
2. Check the [Editor Documentation](./editors/)
3. Read the [Technical Guides](./guides/)
4. Follow the [Contributing Guidelines](./development/contributing.md)

## Troubleshooting

### Common Issues

1. **TypeScript Errors**

   - Run `npm run type-check` to identify issues
   - Check type definitions in `types/` directory

2. **Build Errors**

   - Clear `.next` directory: `rm -rf .next`
   - Reinstall dependencies: `npm install`
   - Rebuild: `npm run build`

3. **Real-time Issues**
   - Check Liveblocks connection
   - Verify API key in `.env.local`
   - Check network connectivity

## Support

- Create an issue on GitHub
- Check the [FAQ](./faq.md)
- Join our Discord community

## License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.
