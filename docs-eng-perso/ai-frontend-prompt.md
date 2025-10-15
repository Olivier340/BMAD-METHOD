# AI Frontend Prompt - BMad Visual Studio

**Généré le :** 2025-10-14
**Projet :** bmad-method-perso
**Type de génération :** À définir

## Contexte du Projet

BMad Visual Studio est une interface web révolutionnaire qui transforme l'expérience BMad-Method v6 en une plateforme visuelle complète permettant d'utiliser entièrement la méthode depuis un navigateur moderne.

**Objectifs principaux :**

1. Interface Unifiée - Plateforme web complète remplaçant l'expérience CLI fragmentée
2. Visualisation Complète - Dashboard centralisé avec gestion visuelle des projets, workflows, agents, épics et stories
3. Intégration Multi-IDEs - Support natif pour Cursor, Claude Code, Gemini CLI et VS Code avec synchronisation temps réel

**Contraintes techniques :**

- Architecture React + TypeScript + Material-UI
- Backend Node.js + Express + SQLite
- Design system hybride (Material-UI + composants personnalisés)
- Responsive design (mobile-first)
- Accessibilité WCAG 2.1 AA

## Spécifications UX/UI Détaillées

**Design System :**

- Material-UI v5 comme base avec thème personnalisé BMad-Method
- Palette : Primary Blue (#1976d2), Success Green (#4caf50), couleurs de phases BMad
- Typographie : Inter comme police principale, échelle typographique complète
- Composants personnalisés : WorkflowCard, PhaseNavigation, AgentToggle, MetricsCard

**Layout Principal :**

- Header avec navigation, sélecteur projet, recherche globale
- Sidebar collapsible avec navigation par phases BMad
- Dashboard central avec métriques temps réel
- Responsive : Mobile-first avec breakpoints 6 niveaux

**Composants Clés :**

- Dashboard avec cartes métriques et flux d'activité
- Interface workflow avec progression temps réel
- Gestion agents avec toggles et contrôles visuels
- Hub IDE avec connexions et monitoring

## Prompt AI Optimisé

```
Crée une interface React complète pour "BMad Visual Studio" - une plateforme web révolutionnaire pour la méthodologie BMad-Method v6.

🎯 CONTEXTE PROJET :
Application web moderne remplaçant l'expérience CLI de BMad-Method par une interface visuelle unifiée permettant de gérer projets, workflows, agents et intégrations IDE.

🏗️ ARCHITECTURE TECHNIQUE :
- React 18+ avec TypeScript
- Material-UI v5 (MUI) comme base design system
- React Router pour navigation
- Redux Toolkit pour gestion d'état
- Axios pour API calls
- Responsive design mobile-first

🎨 DESIGN SYSTEM BMAD-METHOD :

COULEURS PRIMAIRES :
- Primary Blue: #1976d2 (actions principales, navigation active)
- Success Green: #4caf50 (actions réussies, progression)
- Phase Colors:
  * Analysis: #9c27b0 (violet)
  * Planning: #ff5722 (orange)
  * Solutioning: #607d8b (bleu-gris)
  * Implementation: #4caf50 (vert)

TYPOGRAPHIE :
- Police principale: Inter (excellente lisibilité web)
- Échelle: Display (57px) → Label Small (11px)
- Line-height optimisé pour chaque taille

COMPOSANTS CORE À CRÉER :

1. LAYOUT COMPONENTS :
- AppLayout (header + sidebar + main content)
- ResponsiveSidebar (collapsible avec navigation phases)
- Header (logo, project selector, search, user menu)

2. DASHBOARD COMPONENTS :
- MetricsCard (valeur + icône + label + tendance)
- ActivityFeed (événements temps réel avec timestamps)
- QuickActions (boutons d'actions contextuelles)
- ProgressChart (graphique progression phases)

3. WORKFLOW COMPONENTS :
- WorkflowCard (titre, statut, progression, actions)
- WorkflowWizard (étapes avec indicateurs progression)
- ParameterForm (formulaire dynamique paramètres)
- ProgressIndicator (barre progression avec étapes)

4. AGENT COMPONENTS :
- AgentToggle (switch activation/désactivation)
- AgentCard (nom, statut, paramètres, contrôles)
- AgentConfigPanel (configuration avancée)

5. IDE HUB COMPONENTS :
- IDEConnectionCard (nom IDE, statut connexion, contrôles)
- SyncStatusIndicator (indicateur synchronisation temps réel)
- MultiIDEActivityFeed (activité coordonnée entre IDEs)

NAVIGATION ET FLUX UTILISATEUR :

1. USER JOURNEY PRINCIPAL :
- Accueil Dashboard → Sélection projet → Navigation Phase → Sélection workflow → Configuration → Exécution → Suivi → Validation

2. NAVIGATION PAR PHASES :
- 4 onglets principaux : Analysis, Planning, Solutioning, Implementation
- Chaque phase avec workflows associés
- Indicateurs progression et statut

3. NAVIGATION CONTEXTUELLE :
- Breadcrumbs pour chemin actuel
- Recherche globale (Ctrl+K)
- Raccourcis clavier pour navigation rapide

RESPONSIVE DESIGN :
- Mobile (<768px): Menu hamburger, single colonne, touch-optimized
- Tablet (768-1023px): Navigation réduite, colonnes secondaires
- Desktop (1024px+): Sidebar complète, multi-colonnes, souris/clavier optimisé
- Large Desktop (1440px+): Workspace étendu, vues divisées

ACCESSIBILITÉ (WCAG 2.1 AA) :
- Contraste minimum 4.5:1
- Navigation clavier complète
- Support lecteur d'écran (ARIA labels)
- Taille cibles tactiles 44px minimum
- Préférence "reduce motion" respectée

ANIMATIONS ET MICRO-INTERACTIONS :
- Transitions fluides (200-300ms ease-out)
- Feedback immédiat pour interactions
- Animations loading élégantes
- États hover/focus avec transitions

INTÉGRATION TECHNIQUE :
- API REST pour projets, workflows, agents
- Server-Sent Events pour activité temps réel
- Gestion erreurs avec récupération utilisateur
- Optimisation performance (lazy loading, memoization)

EXIGENCES SPÉCIFIQUES :
- Interface en français (i18n prêt)
- Thème sombre/clair automatique
- Synchronisation multi-IDEs temps réel
- Dashboard avec métriques projets actifs
- Interface workflow avec exécution guidée

LIVRABLES ATTENDUS :
- Structure composants complète et réutilisable
- Design system cohérent et extensible
- Interface responsive sur tous appareils
- Code optimisé et maintenable
- Documentation composants avec Storybook

STYLE DE CODE :
- TypeScript strict avec interfaces définies
- Composants fonctionnels avec hooks
- CSS-in-JS avec Material-UI theme
- Séparation claire logique métier / présentation
- Tests unitaires pour composants critiques
```

## Instructions d'Utilisation

Ce prompt est optimisé pour :

- Vercel v0
- Lovable.ai
- Autres outils de génération AI frontend

**Étapes recommandées :**

1. Copier le prompt ci-dessus dans l'outil AI choisi
2. Fournir le contexte spécifique du projet si demandé
3. Générer le code avec les paramètres suggérés
4. Réviser et tester le code généré
5. Intégrer avec le backend existant

**Note importante :** Le code généré par IA nécessite toujours une révision approfondie et des tests avant déploiement en production.

---

_Prompt généré automatiquement le 2025-10-14 par le système BMad-Method v6_
