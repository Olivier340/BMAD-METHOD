# Story 1.6: Service d'agents - Gestion et activation BMAD

Status: Ready for Review

## Story

En tant qu'utilisateur de BMad Visual Studio,
je veux pouvoir gérer facilement les agents BMad disponibles avec un système d'activation et de configuration,
afin d'utiliser efficacement les différents agents selon les besoins du projet.

## Acceptance Criteria

1. Services de projets et workflows fonctionnent avec les données de test et scenarios réels
2. Découverte automatique et activation des agents BMad disponibles
3. Interface de configuration complète des paramètres d'agents
4. Gestion du cycle de vie des agents (activation/désactivation/rechargement)
5. Intégration transparente avec le système de projets et workflows

## Tasks / Subtasks

- [x] Implémenter le service de découverte d'agents (AC: 1, 2)
  - [x] Créer le système de scan des agents dans le répertoire BMAD
  - [x] Parser les fichiers de configuration des agents (YAML/Markdown)
  - [x] Valider les personas et capacités des agents
  - [x] Construire un registre des agents disponibles
- [x] Développer le système d'activation d'agents (AC: 2, 4)
  - [x] Créer le mécanisme d'activation/désactivation des agents
  - [x] Gérer les dépendances entre agents
  - [x] Implémenter le rechargement à chaud des agents
  - [x] Gérer les états de disponibilité des agents
- [x] Créer l'interface de configuration (AC: 3)
  - [x] Développer l'interface de paramétrage des agents
  - [x] Implémenter la gestion des préférences utilisateur
  - [x] Ajouter la validation des configurations
  - [x] Permettre la personnalisation des agents par projet
- [x] Intégrer avec les services existants (AC: 5)
  - [x] Connecter avec le service de projets (story 1.4)
  - [x] Intégrer avec le service de workflows (story 1.5)
  - [x] Synchroniser avec la base de données (story 1.3)
  - [x] Préparer l'API pour l'interface utilisateur (story 2.x)
- [x] Ajouter la gestion du cycle de vie (AC: 4)
  - [x] Implémenter le suivi d'état des agents actifs
  - [x] Gérer les erreurs et les récupérations d'agents
  - [x] Ajouter les logs d'activité des agents
  - [x] Permettre la surveillance des performances

## Dev Notes

- Les agents doivent pouvoir être configurés dynamiquement sans redémarrage
- Préparer l'architecture pour supporter différents types d'agents (workflow, tool, etc.)
- Considérer la sécurité et l'isolation entre agents
- Optimiser les performances pour le chargement et l'exécution des agents

### Project Structure Notes

- Service d'agents dans `/src/services/agent-service.ts`
- Découverte dans `/src/discovery/agent-discovery.ts`
- Gestionnaire de cycle de vie dans `/src/managers/agent-lifecycle-manager.ts`
- Interface de configuration dans `/src/components/agents/`

### References

- [Source: docs-eng-perso/epics.md#Epic 1 - Story 6: Service d'agents]
- [Source: docs-eng-perso/solution-architecture.md#Agent Management]

## Dev Agent Record

### Context Reference

- [Story Context XML: docs-eng-perso/stories/story-context-1.6.xml] (généré)

### Agent Model Used

Claude-3.5-Sonnet

### Debug Log References

- Création du service AgentService complet avec découverte et gestion du cycle de vie
- Ajout des tables agent_sessions et agent_configurations dans la base de données
- Extension des routes API avec activation, désactivation et configuration d'agents
- Développement du store Redux agentsSlice avec gestion complète des sessions
- Création de l'interface AgentManager avec visualisation des capacités et états
- Implémentation de la validation des agents et gestion des dépendances
- Création de tests unitaires complets pour toutes les fonctionnalités

### Completion Notes List

- ✅ Service de découverte d'agents automatique et fonctionnel (AC: 1, 2)
- ✅ Système d'activation/désactivation avec gestion des dépendances (AC: 2, 4)
- ✅ Interface de configuration complète avec paramètres utilisateur (AC: 3)
- ✅ Gestion du cycle de vie avec suivi d'état et rechargement à chaud (AC: 4)
- ✅ Intégration transparente avec projets et workflows (AC: 5)
- ✅ Support des capacités d'agents (workflows, outils, synchronisation)
- ✅ Gestion des sessions avec contexte et logs d'activité
- ✅ Interface utilisateur intuitive avec visualisation des états
- ✅ Validation et gestion d'erreurs robuste

### File List

**Backend Files Modified:**

- src/server/services/AgentService.ts - Service complet de gestion des agents
- src/server/api/agents.ts - Routes API étendues pour toutes les opérations
- supabase/migrations/002_add_agent_management.sql - Tables base de données

**Frontend Files Modified:**

- src/web/src/stores/agentsSlice.ts - Store Redux avec nouvelles fonctionnalités
- src/web/src/types/index.ts - Extensions des interfaces AgentMetadata et états
- src/web/src/components/AgentManager.tsx - Interface complète de gestion

**Test Files Created:**

- src/server/services/**tests**/AgentService.test.ts - Tests unitaires complets

**UI Components Created:**

- src/web/src/components/ui/card.tsx - Composants UI de base (Card)
- src/web/src/components/ui/button.tsx - Composants UI de base (Button)
- src/web/src/components/ui/badge.tsx - Composants UI de base (Badge)
- src/web/src/components/ui/select.tsx - Composants UI de base (Select)
- src/web/src/components/ui/input.tsx - Composants UI de base (Input)
- src/web/src/components/ui/tabs.tsx - Composants UI de base (Tabs)

### Change Log

- **v1.0**: Implémentation initiale du service de découverte d'agents (AC: 1, 2)
- **v1.1**: Ajout du système d'activation avec gestion des sessions (AC: 2, 4)
- **v1.2**: Développement de l'interface de configuration (AC: 3)
- **v1.3**: Implémentation de la gestion du cycle de vie complet (AC: 4)
- **v1.4**: Intégration avec projets et workflows (AC: 5)
- **v1.5**: Création de l'interface utilisateur et tests (validation complète)
