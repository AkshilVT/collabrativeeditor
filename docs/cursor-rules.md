# Cursor Rules

## Core Principles

1. **TypeScript First**

   - All new code must be written in TypeScript
   - No `any` types allowed without explicit justification
   - Use proper type definitions and interfaces
   - Leverage TypeScript's type inference where possible

2. **React Best Practices**

   - Use functional components exclusively
   - Implement proper prop typing
   - Follow React hooks rules
   - Use proper dependency arrays in useEffect
   - Implement proper cleanup in useEffect

3. **Code Organization**
   - Follow the established project structure
   - Keep components small and focused
   - Use proper file naming conventions
   - Implement proper module exports

## Component Rules

### 1. Component Structure

```typescript
import { FC } from 'react';

interface Props {
  // Required props
  requiredProp: string;
  // Optional props
  optionalProp?: number;
}

export const Component: FC<Props> = ({
  requiredProp,
  optionalProp,
}) => {
  // Component logic
  return (
    // JSX
  );
};
```

### 2. Props Interface Rules

- Use descriptive prop names
- Document complex props with JSDoc
- Use proper TypeScript types
- Mark optional props with `?`
- Use proper prop validation

### 3. State Management Rules

- Use local state for component-specific state
- Use context for global state
- Implement proper state updates
- Use proper state initialization
- Handle loading and error states

## Editor-Specific Rules

### 1. Markdown Editor

```typescript
interface MarkdownEditorProps {
  content: string;
  onChange: (content: string) => void;
  onSave?: () => void;
}

// Implementation must include:
- Live preview
- Word count
- Markdown syntax highlighting
- Export functionality
```

### 2. Rich Text Editor

```typescript
interface RichTextEditorProps {
  roomId: string;
  initialContent?: string;
  onSave?: () => void;
}

// Implementation must include:
- Real-time collaboration
- Presence awareness
- Cursor positions
- Basic formatting
```

### 3. Code Editor

```typescript
interface CodeEditorProps {
  language: string;
  value: string;
  onChange: (value: string) => void;
  theme?: 'light' | 'dark';
}

// Implementation must include:
- Syntax highlighting
- Line numbers
- Language support
- Theme support
```

## Styling Rules

### 1. Tailwind CSS

- Use Tailwind classes for styling
- Follow the design system
- Use proper responsive classes
- Implement dark mode support
- Use proper spacing scale

### 2. CSS Modules

- Use for component-specific styles
- Follow BEM naming convention
- Use proper CSS variables
- Implement proper scoping

## State Management Rules

### 1. Local State

```typescript
const [state, setState] = useState<StateType>(initialState);
```

### 2. Global State

```typescript
const { state, setState } = useStore();
```

### 3. Real-time State

```typescript
const { presence, updatePresence } = useMyPresence();
```

## Error Handling Rules

### 1. Component Level

```typescript
try {
  // Component logic
} catch (error) {
  // Error handling
}
```

### 2. API Level

```typescript
const handleError = (error: Error) => {
  // Error handling
};
```

## Performance Rules

### 1. Component Optimization

- Use React.memo for pure components
- Implement proper useCallback
- Use proper useMemo
- Avoid unnecessary re-renders

### 2. Data Fetching

- Implement proper loading states
- Handle errors properly
- Use proper caching
- Implement proper retry logic

## Testing Rules

### 1. Component Testing

```typescript
describe("Component", () => {
  it("should render correctly", () => {
    // Test implementation
  });
});
```

### 2. Hook Testing

```typescript
describe("useHook", () => {
  it("should work correctly", () => {
    // Test implementation
  });
});
```

## Documentation Rules

### 1. Component Documentation

```typescript
/**
 * Component description
 * @param {string} prop1 - Description of prop1
 * @param {number} prop2 - Description of prop2
 * @returns {JSX.Element} Component JSX
 */
```

### 2. Function Documentation

```typescript
/**
 * Function description
 * @param {string} param1 - Description of param1
 * @returns {Promise<void>} Description of return value
 */
```

## Git Rules

### 1. Commit Messages

```
feat: add new feature
fix: fix bug
docs: update documentation
style: update styling
refactor: refactor code
test: add tests
chore: update dependencies
```

### 2. Branch Naming

```
feature/feature-name
bugfix/bug-name
hotfix/issue-name
```

## Deployment Rules

### 1. Build Process

- Run type checking
- Run linting
- Run tests
- Build production bundle

### 2. Environment Variables

- Use proper environment variables
- Document required variables
- Use proper validation

## Security Rules

### 1. Input Validation

- Validate all user input
- Sanitize data
- Prevent XSS attacks

### 2. API Security

- Use proper authentication
- Implement proper authorization
- Use proper error handling

## Accessibility Rules

### 1. Semantic HTML

- Use proper HTML elements
- Implement proper ARIA attributes
- Use proper heading hierarchy

### 2. Keyboard Navigation

- Implement proper focus management
- Use proper keyboard shortcuts
- Handle proper keyboard events

## Real-time Collaboration Rules

### 1. Presence

```typescript
const { presence, updatePresence } = useMyPresence();
```

### 2. Cursor Positions

```typescript
const { cursor, updateCursor } = useCursor();
```

### 3. Document Sync

```typescript
const { document, updateDocument } = useDocument();
```

## Code Review Checklist

1. **TypeScript**

   - [ ] Proper types used
   - [ ] No any types
   - [ ] Proper interfaces

2. **React**

   - [ ] Functional components
   - [ ] Proper hooks usage
   - [ ] Proper prop types

3. **Styling**

   - [ ] Tailwind classes
   - [ ] Proper responsive design
   - [ ] Dark mode support

4. **Performance**

   - [ ] No unnecessary re-renders
   - [ ] Proper memoization
   - [ ] Proper code splitting

5. **Testing**

   - [ ] Unit tests
   - [ ] Integration tests
   - [ ] E2E tests

6. **Documentation**

   - [ ] JSDoc comments
   - [ ] README updates
   - [ ] Code comments

7. **Security**

   - [ ] Input validation
   - [ ] XSS prevention
   - [ ] Proper error handling

8. **Accessibility**
   - [ ] Semantic HTML
   - [ ] ARIA attributes
   - [ ] Keyboard navigation
