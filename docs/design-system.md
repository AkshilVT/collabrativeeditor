# Design System Guide - Collaborative Editor Suite

## Core Design Principles

- **Clarity First**: Every interface element must be immediately understandable
- **Minimal & Focused**: Remove unnecessary elements to keep focus on content
- **Collaborative Awareness**: Make real-time collaboration features intuitive
- **Consistent Experience**: Maintain uniform design patterns across all editor modes

## 1. Color System

### Primary Colors

```css
--primary-100: #e6f3ff; /* Lightest */
--primary-500: #0066cc; /* Main brand color */
--primary-900: #003366; /* Darkest */
```

### Neutral Colors

```css
--neutral-50: #ffffff; /* White */
--neutral-100: #f5f7fa; /* Light background */
--neutral-200: #e4e7eb; /* Borders */
--neutral-500: #7b8794; /* Secondary text */
--neutral-900: #1f2933; /* Primary text */
```

### Semantic Colors

```css
--success: #0b875b; /* Success states */
--warning: #e6a23c; /* Warning states */
--error: #dc2626; /* Error states */
--info: #3b82f6; /* Information states */
```

### Collaboration Colors

```css
--cursor-1: #ff0000; /* User 1 cursor */
--cursor-2: #00ff00; /* User 2 cursor */
--cursor-3: #0000ff; /* User 3 cursor */
--cursor-4: #ff00ff; /* User 4 cursor */
```

## 2. Typography

### Font Families

```css
--font-primary: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
--font-mono: "JetBrains Mono", "Fira Code", monospace;
```

### Type Scale

```css
--text-xs: 0.75rem; /* 12px */
--text-sm: 0.875rem; /* 14px */
--text-base: 1rem; /* 16px */
--text-lg: 1.125rem; /* 18px */
--text-xl: 1.25rem; /* 20px */
--text-2xl: 1.5rem; /* 24px */
--text-3xl: 1.875rem; /* 30px */
```

### Font Weights

```css
--font-regular: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

## 3. Spacing System

```css
--space-1: 0.25rem; /* 4px */
--space-2: 0.5rem; /* 8px */
--space-3: 0.75rem; /* 12px */
--space-4: 1rem; /* 16px */
--space-6: 1.5rem; /* 24px */
--space-8: 2rem; /* 32px */
--space-12: 3rem; /* 48px */
--space-16: 4rem; /* 64px */
```

## 4. Component Design

### Editor Toolbar

```css
.toolbar {
  background: var(--neutral-50);
  border-bottom: 1px solid var(--neutral-200);
  padding: var(--space-2) var(--space-4);
  display: flex;
  gap: var(--space-2);
  align-items: center;
}
```

### Editor Container

```css
.editor-container {
  background: var(--neutral-50);
  border: 1px solid var(--neutral-200);
  border-radius: 8px;
  padding: var(--space-4);
  min-height: 400px;
}
```

### Collaboration Indicators

```css
.presence-indicator {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-1) var(--space-2);
  background: var(--neutral-100);
  border-radius: 4px;
}
```

## 5. Interactive States

### Buttons

```css
.button {
  padding: var(--space-2) var(--space-4);
  border-radius: 6px;
  font-weight: var(--font-medium);
  transition: all 0.2s ease;
}

.button-primary {
  background: var(--primary-500);
  color: var(--neutral-50);
}

.button-secondary {
  background: var(--neutral-100);
  color: var(--neutral-900);
}
```

### Input Fields

```css
.input {
  padding: var(--space-2) var(--space-3);
  border: 1px solid var(--neutral-200);
  border-radius: 6px;
  transition: border-color 0.2s ease;
}

.input:focus {
  border-color: var(--primary-500);
  outline: none;
}
```

## 6. Animation & Transitions

```css
--transition-fast: 150ms ease;
--transition-normal: 250ms ease;
--transition-slow: 350ms ease;

/* Cursor movement */
.cursor {
  transition: transform var(--transition-fast);
}

/* Presence updates */
.presence-update {
  transition: opacity var(--transition-normal);
}
```

## 7. Responsive Breakpoints

```css
--breakpoint-sm: 640px;
--breakpoint-md: 768px;
--breakpoint-lg: 1024px;
--breakpoint-xl: 1280px;
```

## 8. Accessibility Guidelines

- Minimum contrast ratio: 4.5:1 for normal text
- Focus states must be visible
- Interactive elements must be at least 44x44px on mobile
- All icons must have text alternatives
- Use ARIA labels for complex interactions

## 9. Editor-Specific Styles

### Markdown Editor

```css
.markdown-editor {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4);
}

.markdown-preview {
  background: var(--neutral-100);
  padding: var(--space-4);
  border-radius: 6px;
}
```

### Rich Text Editor

```css
.rich-text-editor {
  min-height: 500px;
  padding: var(--space-4);
}

.rich-text-toolbar {
  position: sticky;
  top: 0;
  z-index: 10;
}
```

### Code Editor

```css
.code-editor {
  font-family: var(--font-mono);
  line-height: 1.6;
}

.code-line-numbers {
  color: var(--neutral-500);
  padding-right: var(--space-4);
  user-select: none;
}
```

## 10. Implementation Notes

1. Use CSS variables for all design tokens
2. Implement dark mode using CSS custom properties
3. Use CSS Grid and Flexbox for layouts
4. Maintain consistent spacing using the spacing system
5. Use semantic HTML elements
6. Implement responsive design using mobile-first approach
7. Use CSS modules or styled-components for component styling
8. Follow BEM naming convention for CSS classes

## 11. Performance Guidelines

1. Minimize CSS bundle size
2. Use CSS containment where appropriate
3. Optimize animations for performance
4. Use will-change property for animated elements
5. Implement lazy loading for non-critical styles
6. Use CSS custom properties for theme switching
7. Minimize repaints and reflows
8. Use hardware-accelerated properties for animations
