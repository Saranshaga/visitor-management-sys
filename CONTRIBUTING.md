# Contributing to Visitor Management System

Thank you for your interest in contributing to the Visitor Management System! This document provides guidelines and information for contributors.

## 🤝 How to Contribute

### Reporting Issues

1. **Search existing issues** first to avoid duplicates
2. **Use the issue template** when creating new issues
3. **Provide detailed information** including:
   - Steps to reproduce the issue
   - Expected vs actual behavior
   - Screenshots or error messages
   - Browser and OS information

### Suggesting Features

1. **Check the roadmap** to see if the feature is already planned
2. **Create a feature request issue** with:
   - Clear description of the feature
   - Use cases and benefits
   - Proposed implementation approach
   - Mockups or examples if applicable

### Code Contributions

1. **Fork the repository**
2. **Create a feature branch** from `main`
3. **Make your changes** following our coding standards
4. **Test your changes** thoroughly
5. **Submit a pull request**

## 🛠️ Development Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git

### Getting Started

```bash
# Clone your fork
git clone https://github.com/your-username/visitor-management-system.git
cd visitor-management-system

# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm run test

# Build for production
npm run build
```

## 📝 Coding Standards

### TypeScript Guidelines

- **Use TypeScript** for all new files
- **Define interfaces** for all data structures
- **Use strict mode** and avoid `any` types
- **Document complex types** with comments

```typescript
// Good
interface Visitor {
  VisitorID: number;
  FirstName: string;
  LastName: string;
  Company?: string;
}

// Avoid
const visitor: any = { ... };
```

### React Best Practices

- **Use functional components** with hooks
- **Keep components small** and focused
- **Use custom hooks** for reusable logic
- **Implement proper error boundaries**

```tsx
// Good
const VisitorForm: React.FC<VisitorFormProps> = ({ onSubmit }) => {
  const [visitor, setVisitor] = useState<Visitor>({});
  
  return (
    <form onSubmit={handleSubmit}>
      {/* form content */}
    </form>
  );
};

// Avoid large, monolithic components
```

### CSS and Styling

- **Use Tailwind CSS** utility classes
- **Follow responsive design** principles
- **Use semantic color tokens** from the design system
- **Maintain consistent spacing** using Tailwind spacing scale

```tsx
// Good
<button className="bg-primary text-primary-foreground hover:bg-primary/90">
  Submit
</button>

// Avoid direct color values
<button className="bg-blue-500 text-white hover:bg-blue-600">
  Submit
</button>
```

### File Organization

- **Group related components** in feature folders
- **Use barrel exports** for cleaner imports
- **Keep assets organized** by type and feature
- **Follow naming conventions**

```
src/
├── features/
│   └── visitor-registration/
│       ├── components/
│       ├── hooks/
│       ├── types/
│       └── index.ts
├── shared/
│   ├── components/
│   ├── hooks/
│   └── utils/
└── assets/
    ├── images/
    └── icons/
```

## 🧪 Testing Guidelines

### Unit Tests

- **Test components** with React Testing Library
- **Test hooks** with appropriate utilities
- **Mock external dependencies**
- **Aim for high test coverage**

```typescript
import { render, screen } from '@testing-library/react';
import { VisitorForm } from './VisitorForm';

describe('VisitorForm', () => {
  it('renders form fields correctly', () => {
    render(<VisitorForm />);
    expect(screen.getByLabelText('First Name')).toBeInTheDocument();
  });
});
```

### Integration Tests

- **Test user workflows** end-to-end
- **Validate data flow** between components
- **Test API integrations** when implemented

## 🎯 Pull Request Guidelines

### Before Submitting

- [ ] Code follows the project's coding standards
- [ ] All tests pass
- [ ] New features include tests
- [ ] Documentation is updated
- [ ] No console errors or warnings
- [ ] Responsive design is maintained

### PR Description Template

```markdown
## Description
Brief description of changes made.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests added/updated
- [ ] Manual testing completed
- [ ] Cross-browser testing done

## Screenshots
Include screenshots for UI changes.

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Tests pass
- [ ] Documentation updated
```

## 🚀 Release Process

### Version Numbering

We follow [Semantic Versioning](https://semver.org/):
- **MAJOR** version for incompatible API changes
- **MINOR** version for backwards-compatible functionality
- **PATCH** version for backwards-compatible bug fixes

### Release Checklist

1. Update version in `package.json`
2. Update `CHANGELOG.md`
3. Create release branch
4. Run full test suite
5. Create GitHub release
6. Deploy to production

## 🎨 Design Guidelines

### UI/UX Principles

- **Accessibility first** - WCAG 2.1 AA compliance
- **Mobile responsive** - Mobile-first approach
- **Consistent spacing** - Use design system tokens
- **Clear hierarchy** - Proper heading structure
- **Error handling** - Clear error messages and recovery

### Design System

- **Colors**: Use semantic tokens from `index.css`
- **Typography**: Follow established font scales
- **Components**: Extend existing UI components
- **Icons**: Use Lucide React icons consistently

## 📚 Resources

### Documentation

- [React Documentation](https://reactjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Radix UI Docs](https://www.radix-ui.com/docs)

### Tools

- [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools)
- [TypeScript Playground](https://www.typescriptlang.org/play)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

## 💬 Communication

### Getting Help

- **GitHub Discussions** for questions and ideas
- **Issues** for bugs and feature requests
- **Email** for private matters: your.email@example.com

### Code of Conduct

We are committed to providing a welcoming and inclusive environment:

- **Be respectful** and constructive in all interactions
- **Use welcoming language** and be mindful of different perspectives
- **Focus on the issue** not the person
- **Accept constructive criticism** gracefully

## 📄 License

By contributing to this project, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to the Visitor Management System! 🎉