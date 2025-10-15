# Story 2.2: Layout Principal

Status: Ready for Review

## Story

As a frontend developer,
I want to implement the main application layout with responsive sidebar navigation and header structure,
so that users can easily navigate between different sections of BMad Visual Studio and access key functionality.

## Acceptance Criteria

1. **Application Shell Structure** - Create main layout component with header, sidebar, and content area using Material-UI responsive patterns
2. **Responsive Sidebar Navigation** - Implement collapsible sidebar with phase-based navigation (Analysis, Planning, Solutioning, Implementation) and smooth animations
3. **Header with User Controls** - Design header bar with project selector, user profile, theme toggle, and notification indicators
4. **Mobile-First Responsive Design** - Ensure layout adapts seamlessly across desktop, tablet, and mobile breakpoints with appropriate drawer behavior
5. **Accessibility Compliance** - Implement ARIA labels, keyboard navigation support, and screen reader compatibility throughout the layout structure

## Tasks / Subtasks

- [x] **Application Shell (AC: 1)**
  - [x] Create AppLayout component as main application shell
  - [x] Implement CSS Grid/Flexbox layout structure (header + sidebar + main content)
  - [x] Set up React Router outlet for page content rendering
  - [x] Configure Material-UI theme provider integration
- [x] **Sidebar Navigation (AC: 2)**
  - [x] Create PhaseNavigation component with collapsible sidebar
  - [x] Implement phase-based menu items (Analysis, Planning, Solutioning, Implementation)
  - [x] Add smooth open/close animations with Material-UI transitions
  - [x] Include workflow shortcuts and quick actions in sidebar
- [x] **Header Controls (AC: 3)**
  - [x] Create AppHeader component with project selector dropdown
  - [x] Add user profile section with avatar and settings access
  - [x] Implement theme toggle (light/dark mode) with persistence
  - [x] Add notification bell with badge counter and dropdown
- [x] **Responsive Design (AC: 4)**
  - [x] Configure Material-UI breakpoints for mobile-first approach
  - [x] Implement responsive sidebar (drawer on mobile, permanent on desktop)
  - [x] Optimize touch targets for mobile interaction (min 44px)
  - [x] Test layout behavior across different screen sizes
- [x] **Accessibility Implementation (AC: 5)**
  - [x] Add ARIA labels and roles for screen readers
  - [x] Implement keyboard navigation (Tab, Enter, Escape, Arrow keys)
  - [x] Ensure color contrast ratios meet WCAG 2.1 AA standards
  - [x] Add skip navigation links for keyboard users

## Dev Notes

- **Layout Architecture**: CSS Grid for main structure with Flexbox for component-level layouts, following Material-UI responsive patterns
- **Navigation Design**: Phase-based organization matching BMad-Method workflow with visual indicators for current phase
- **State Management**: Sidebar state (open/closed) managed in Redux with persistence across sessions
- **Performance**: Lazy loading of navigation sections, memoization of expensive layout calculations
- **Theme Integration**: Full Material-UI theme support with custom BMad Visual Studio design tokens

### Project Structure Notes

- **Component Architecture**: Layout components in src/web/src/components/layout/ with subdirectories for Header/, Sidebar/, Main/
- **State Management**: Layout state in Redux store under ui.layout namespace with actions for sidebar toggle and theme switching
- **Responsive Strategy**: Mobile-first approach using Material-UI's useMediaQuery hook for breakpoint detection
- **Navigation State**: Active phase tracking with URL synchronization and breadcrumb support

### References

- **Solution Architecture**: [Source: docs-eng-perso/solution-architecture.md#4. System Architecture - Frontend Components]
- **UX Specification**: [Source: docs-eng-perso/ux-specification.md#Navigation Structure]
- **PRD Requirements**: [Source: docs-eng-perso/PRD.md#FR007 Navigation par phases]
- **Epic Definition**: [Source: docs-eng-perso/epics.md#Epic 2: Interface Utilisateur - Story 2]
- **Accessibility Guidelines**: [Source: docs-eng-perso/solution-architecture.md#WCAG 2.1 AA Compliance]

## Dev Agent Record

### Context Reference

- Story Context: docs-eng-perso/stories/story-context-2.2.xml
- Solution Architecture: docs-eng-perso/solution-architecture.md#4. System Architecture - Frontend Components
- UX Specification: docs-eng-perso/ux-specification.md#Navigation Structure

### Agent Model Used

Claude-3.5-Sonnet

### Debug Log References

### Completion Notes List

✅ **Application Shell Structure (AC: 1)** - Layout.tsx créé avec AppLayout composant utilisant CSS Grid/Flexbox et Material-UI theme provider
✅ **Responsive Sidebar Navigation (AC: 2)** - PhaseSidebar.tsx implémenté avec navigation par phases BMad-Method, animations Material-UI et drawer responsive
✅ **Header with User Controls (AC: 3)** - AppHeader.tsx créé avec sélecteur projet, profil utilisateur, toggle thème et notifications
✅ **Mobile-First Responsive Design (AC: 4)** - Design responsive avec breakpoints Material-UI, drawer mobile et touch targets 44px minimum
✅ **Accessibility Compliance (AC: 5)** - ARIA labels, navigation clavier, skip links, contraste WCAG 2.1 AA et screen reader support

### File List

**Components créés/modifiés:**

- src/web/src/components/Layout.tsx - Composant principal du layout
- src/web/src/components/layout/AppHeader.tsx - Header avec contrôles utilisateur
- src/web/src/components/layout/PhaseSidebar.tsx - Navigation sidebar par phases
- src/web/src/components/layout/MainContent.tsx - Zone de contenu principale
- src/web/src/types/ui.ts - Types UIState et Notification ajoutés

**Tests créés:**

- src/web/src/components/layout/AppHeader.test.tsx - Tests existants validés
- src/web/src/components/layout/MainContent.test.tsx - Tests créés pour accessibilité et responsive design
- src/web/src/components/layout/PhaseSidebar.test.tsx - Tests créés pour navigation et interactions

**Architecture respectée:**

- CSS Grid pour structure principale avec Flexbox pour composants
- Redux state management pour layout preferences (sidebar, thème)
- Mobile-first responsive design avec Material-UI breakpoints
- WCAG 2.1 AA accessibility compliance complète
