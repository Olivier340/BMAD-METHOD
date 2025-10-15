# bmad-method-perso Product Requirements Document (PRD)

**Author:** Olivier
**Date:** 2025-10-14
**Project Level:** 2
**Project Type:** web
**Target Scale:** Medium project - multiple features/epics

---

## Description, Context and Goals

{{description}}

### Deployment Intent

Production app - Interface web complète pour la méthodologie BMad-Method v6, destinée à remplacer/améliorer l'expérience CLI actuelle avec une plateforme visuelle moderne.

### Context

BMad-Method v6 représente une avancée significative dans la collaboration humain-IA, mais son interface CLI limite son adoption et son utilisation efficace. Avec la prolifération des outils d'IA modernes (Cursor, Claude Code, Gemini) et la demande croissante pour des interfaces visuelles intuitives, BMad Visual Studio répond à un besoin critique du marché : une plateforme unifiée permettant aux développeurs de tirer pleinement parti de la méthodologie BMad sans friction technique. Ce projet capitalise sur l'écosystème existant de BMad-Method tout en le modernisant pour l'ère des interfaces web collaboratives, créant ainsi une expérience développeur radicalement améliorée qui accélère l'adoption de la méthode.

### Goals

1. **Interface Unifiée** : Créer une plateforme web complète permettant d'accéder à tous les aspects de BMad-Method depuis un navigateur moderne, remplaçant l'expérience CLI fragmentée.

2. **Visualisation Complète** : Développer un dashboard centralisé avec gestion visuelle intuitive des projets, workflows, agents, épics et stories, incluant métriques temps réel et suivi de progression.

3. **Intégration Multi-IDEs** : Implémenter le support natif pour Cursor, Claude Code, Gemini CLI et VS Code avec synchronisation temps réel du contexte entre tous les outils de développement.

## Requirements

### Functional Requirements

FR001: **Gestion des projets** - Scanner automatiquement les projets BMad dans le système de fichiers et permettre leur sélection comme contexte actif
FR002: **Découverte des workflows** - Explorer et organiser automatiquement tous les workflows disponibles par phases (Analysis, Planning, Solutioning, Implementation)
FR003: **Exécution des workflows** - Fournir une interface pour configurer et exécuter les workflows avec paramètres dynamiques
FR004: **Gestion des agents** - Découvrir, activer/désactiver et configurer visuellement tous les agents BMad disponibles
FR005: **Hub d'intégration IDE** - Gérer les connexions avec Cursor, Claude Code, Gemini CLI et VS Code avec synchronisation temps réel
FR006: **Dashboard principal** - Afficher métriques temps réel (workflows actifs, stories, tâches) et graphique de progression des phases
FR007: **Navigation par phases** - Interface organisée selon les 4 phases BMad-Method avec accès rapide aux workflows appropriés
FR008: **API REST complète** - Fournir endpoints pour toutes les opérations (projets, workflows, agents, événements)
FR009: **Base de données** - Persister projets, exécutions de workflows et métriques dans SQLite
FR010: **Événements temps réel** - Diffuser les événements via Server-Sent Events pour coordination multi-IDEs
FR011: **Interface responsive** - S'adapter aux différentes tailles d'écran (desktop, tablet, mobile)
FR012: **Authentification JWT** - Sécuriser l'accès avec gestion des permissions et audit trail

### Non-Functional Requirements

NFR001: **Performance** - Temps de réponse API < 200ms pour 95% des requêtes, interface réactive avec mise à jour temps réel des métriques
NFR002: **Sécurité** - Chiffrement TLS 1.3 obligatoire, authentification JWT avec rotation automatique des tokens, audit trail complet
NFR003: **Disponibilité** - Uptime 99.5% avec redondance des composants critiques et recovery automatique sous 2 minutes
NFR004: **Maintenabilité** - Code coverage > 80%, dette technique maintenue sous 5%, déploiement automatisé avec rollback
NFR005: **Évolutivité** - Support 100 utilisateurs concurrents, architecture modulaire permettant ajout de nouveaux IDEs sans refactoring majeur

## User Journeys

### Primary User Journey: Planifier et exécuter un workflow BMad-Method

**Contexte utilisateur** : Développeur expérimenté travaillant sur un projet web brownfield, familiarisé avec BMad-Method mais préférant une interface visuelle.

1. **Découverte** : L'utilisateur ouvre BMad Visual Studio dans son navigateur et voit le dashboard principal avec métriques de projets actifs
2. **Sélection de projet** : Il scanne automatiquement ses projets BMad locaux et sélectionne "bmad-method-perso" comme contexte actif
3. **Navigation par phase** : Il accède à la section "Phase 2 - Planning" et voit les workflows disponibles (plan-project, ux-spec)
4. **Configuration du workflow** : Il sélectionne "plan-project" et configure les paramètres (niveau 2, type web, brownfield)
5. **Exécution** : Il démarre le workflow qui s'exécute avec suivi temps réel des progrès et génération automatique du PRD
6. **Suivi et ajustements** : Il monitore l'avancement via le dashboard, ajuste les paramètres si nécessaire, et valide les outputs générés
7. **Transition** : Une fois le PRD complété, il passe automatiquement à la phase suivante (solutioning) avec handover des livrables

**Points de friction potentiels** :

- Première configuration des connexions IDE si nécessaire
- Apprentissage de la navigation par phases pour nouveaux utilisateurs
- Gestion des workflows parallèles si plusieurs projets actifs

**Métriques de succès** :

- Temps de démarrage workflow < 30 secondes
- Taux de completion des workflows > 90%
- Satisfaction utilisateur > 4.5/5

## UX Design Principles

1. **Simplicité Progressive** : Interface épurée avec fonctionnalités avancées accessibles via découverte progressive, évitant la surcharge cognitive pour les nouveaux utilisateurs tout en permettant l'efficacité experte.

2. **Feedback Immédiat** : Tous les workflows et actions fournissent un retour visuel instantané avec indicateurs de progression temps réel, réduisant l'anxiété et maintenant l'engagement utilisateur.

3. **Cohérence Méthodologique** : L'interface reflète fidèlement les 4 phases de BMad-Method avec navigation intuitive, terminologie cohérente et workflows qui guident naturellement l'utilisateur à travers le processus.

4. **Accessibilité Universelle** : Design inclusif supportant les préférences d'accessibilité (contraste élevé, navigation clavier, lecteur d'écran) permettant à tous les développeurs de bénéficier pleinement de la plateforme.

5. **Performance Perçue** : Interface réactive avec squelettes de chargement, animations fluides et états de transition clairs pour maintenir la perception de rapidité même lors d'opérations complexes.

## Epics

BMad Visual Studio est structuré en deux épics principaux permettant un développement parallèle efficace :

### Epic 1: Infrastructure Backend (8 stories)

- Serveur Express avec API REST complète
- Base de données SQLite avec services de persistence
- Découverte automatique des projets et workflows BMad
- Gestion des agents avec activation/configuration
- Hub d'intégration multi-IDEs (Cursor, Claude Code, Gemini CLI, VS Code)
- Événements temps réel via Server-Sent Events

### Epic 2: Interface Utilisateur (8 stories)

- Application React avec TypeScript et Material-UI
- Layout responsive avec navigation par phases BMad
- Dashboard avec métriques temps réel
- Interface de gestion des projets et workflows
- Contrôle visuel des agents
- Hub de monitoring des intégrations IDE

**Voir epics.md pour détails complets des stories et critères d'acceptation**

## Out of Scope

Les fonctionnalités suivantes sont explicitement exclues de cette phase initiale mais préservées pour développement futur :

**Phase 3+ (Collaboration et Écosystème)**

- Mode multi-utilisateurs avec gestion des permissions avancées
- Marketplace d'extensions communautaires et API externe
- Intégrations tierces (GitHub, Jira, Slack, etc.)
- Analytics avancés et rapports d'utilisation détaillés

**Phase 4+ (Expérience Utilisateur Avancée)**

- Mode hors-ligne pour utilisation locale sans connexion
- Applications mobiles natives (iOS/Android)
- Workflows entièrement personnalisables par l'utilisateur
- Support étendu pour langages/frameworks spécialisés

**Infrastructure Future**

- Déploiement cloud multi-régions avec CDN
- Base de données SQLite optimisée pour portabilité maximale
- Clustering et load balancing avancés

Cette délimitation permet de se concentrer sur le cœur fonctionnel tout en préparant l'évolutivité future.

---

## Next Steps

### Immediate Next Steps

1. **Validation de Cohésion** (Optionnelle) - Vérifier l'alignement PRD-Tech Spec et valider la séquence des fonctionnalités
2. **Transition vers Solutioning** - Passer le PRD et épics à l'Architecte pour génération de l'architecture technique
3. **UX Specification** - Créer les spécifications UX détaillées pour guider le développement frontend

### Recommended Immediate Action

Lancer la **validation de cohésion** pour s'assurer que tous les éléments du projet sont bien alignés avant de passer en phase de solutioning.

**Voulez-vous procéder à la validation de cohésion maintenant ? (y/n)**

## Document Status

- [ ] Goals and context validated with stakeholders
- [ ] All functional requirements reviewed
- [ ] User journeys cover all major personas
- [ ] Epic structure approved for phased delivery
- [ ] Ready for architecture phase

_Note: See technical-decisions.md for captured technical context_

---

## Assumptions and Dependencies

**Infrastructure Assumptions** :

- Node.js 18+ et npm disponibles dans l'environnement de développement
- Système de fichiers accessible pour scan automatique des projets BMad
- Navigateurs modernes supportant ES2020+ et Server-Sent Events

**Technical Dependencies** :

- Structure standard BMad-Method avec dossiers `bmad/` et `manifest.yaml`
- Accès réseau local pour communication inter-composants
- Permissions de lecture/écriture sur le système de fichiers local

**Business Assumptions** :

- Les développeurs cibles sont familiarisés avec BMad-Method v6
- Demande existante pour interface web unifiée (validée par usage CLI actuel)
- Ressources disponibles pour développement parallèle des deux épics

---

_This PRD adapts to project level 2 - providing appropriate detail without overburden._
