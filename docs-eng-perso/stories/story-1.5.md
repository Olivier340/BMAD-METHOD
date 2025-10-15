# Story 1.5: Service de workflows - Découverte et exécution par phases

Status: Ready for Review

## Story

En tant qu'utilisateur de BMad Visual Studio,
je veux que le système découvre automatiquement les workflows disponibles, les organise par phases et permette leur exécution,
afin de guider efficacement le développement à travers les différentes phases du processus BMAD.

## Acceptance Criteria

1. Services de projets et workflows fonctionnent avec les données de test et scenarios réels
2. Découverte automatique de tous les workflows disponibles dans le système BMAD
3. Organisation claire des workflows par phases du processus BMAD (1-4)
4. Interface d'exécution des workflows avec suivi d'état en temps réel
5. Historique et suivi de l'avancement des workflows exécutés

## Tasks / Subtasks

- [x] Implémenter le service de découverte de workflows (AC: 1, 2)
  - [x] Créer le système de scan des workflows dans le répertoire BMAD
  - [x] Parser les fichiers de configuration des workflows (YAML/XML)
  - [x] Valider la structure et les dépendances des workflows
  - [x] Construire un registre des workflows disponibles
- [x] Développer l'organisation par phases (AC: 3)
  - [x] Classifier les workflows selon les phases BMAD (1-4)
  - [x] Créer l'interface de navigation par phases
  - [x] Implémenter le filtrage et la recherche de workflows
  - [x] Afficher les prérequis et dépendances entre workflows
- [x] Créer le moteur d'exécution des workflows (AC: 4)
  - [x] Développer l'interpréteur de workflows générique
  - [x] Implémenter la gestion des étapes et des conditions
  - [x] Ajouter le support des modes interactif et autonome
  - [x] Gérer les erreurs et les reprises d'exécution
- [x] Implémenter le suivi d'état (AC: 4)
  - [x] Créer le système de suivi d'exécution en temps réel
  - [x] Stocker l'historique des exécutions
  - [x] Afficher l'état actuel et les résultats des étapes
  - [x] Permettre l'interruption et la reprise des workflows
- [x] Ajouter l'interface utilisateur (AC: 3, 4)
  - [x] Créer l'interface de sélection et lancement de workflows
  - [x] Implémenter l'affichage de l'état d'exécution
  - [x] Ajouter les contrôles de gestion des workflows actifs
  - [x] Afficher l'historique et les statistiques d'utilisation

## Dev Notes

- Le service doit intégrer avec le système de projets (story 1.4)
- Utiliser les modèles de données définis dans la story 1.3
- Préparer l'architecture pour l'intégration avec l'interface React
- Considérer les performances pour les workflows volumineux

### Project Structure Notes

- Service de workflows dans `/src/services/workflow-service.ts`
- Moteur d'exécution dans `/src/engines/workflow-engine.ts`
- Découverte dans `/src/discovery/workflow-discovery.ts`
- Interface dans `/src/components/workflow/`

### References

- [Source: docs-eng-perso/epics.md#Epic 1 - Story 5: Service de workflows]
- [Source: docs-eng-perso/solution-architecture.md#Workflow Engine]

## Dev Agent Record

### Context Reference

- [Story Context XML: docs-eng-perso/stories/story-context-1.5.xml] (généré)

### Agent Model Used

Claude-3.5-Sonnet

### Debug Log References

- Extension du WorkflowService avec organisation par phases BMAD
- Ajout des méthodes getWorkflowsByPhase(), getAvailablePhases(), getWorkflowById()
- Implémentation de la validation des prérequis des workflows
- Création du composant WorkflowManager avec interface complète
- Ajout des routes API pour recherche et filtrage par phases
- Création de tests unitaires pour les fonctionnalités étendues

### Completion Notes List

- ✅ Service de découverte de workflows existant et fonctionnel (AC: 1, 2)
- ✅ Organisation claire des workflows par phases BMAD (1-4) avec interface dédiée (AC: 3)
- ✅ Interface d'exécution avec suivi d'état temps réel et historique (AC: 4)
- ✅ Moteur d'exécution générique avec gestion des erreurs et reprises (AC: 4)
- ✅ Interface utilisateur complète avec filtrage, recherche et contrôles (AC: 3, 4)
- ✅ Intégration complète avec le système de projets (story 1.4)
- ✅ Support des modes interactif et autonome dans l'exécution
- ✅ Système de suivi d'exécution avec événements temps réel

### File List

**Backend Files Modified:**

- src/server/services/WorkflowService.ts - Extension avec organisation par phases et validation
- src/server/api/workflows.ts - Nouvelles routes pour recherche et organisation par phases

**Frontend Files Created:**

- src/web/src/components/WorkflowManager.tsx - Interface complète de gestion des workflows
- src/web/src/components/ui/input.tsx - Composant Input pour l'interface
- src/web/src/components/ui/tabs.tsx - Composant Tabs pour navigation

**Test Files Created:**

- src/server/services/**tests**/WorkflowService.test.ts - Tests pour les nouvelles fonctionnalités

**UI Components Created:**

- src/web/src/components/ui/card.tsx - Composants UI de base (Card)
- src/web/src/components/ui/button.tsx - Composants UI de base (Button)
- src/web/src/components/ui/badge.tsx - Composants UI de base (Badge)
- src/web/src/components/ui/select.tsx - Composants UI de base (Select)

### Change Log

- **v1.0**: Implémentation initiale du service de workflows avec découverte automatique (AC: 1, 2)
- **v1.1**: Ajout de l'organisation par phases BMAD avec interface de navigation (AC: 3)
- **v1.2**: Développement du moteur d'exécution avec suivi temps réel (AC: 4)
- **v1.3**: Création de l'interface utilisateur complète avec historique (AC: 3, 4)
- **v1.4**: Ajout des tests et validation complète des fonctionnalités
