# bmad-method-perso - Epic Breakdown

**Author:** Olivier
**Date:** 2025-10-14
**Project Level:** 2
**Target Scale:** Medium project - multiple features/epics

---

## Epic Overview

BMad Visual Studio nécessite deux épics principaux pour sa construction : l'infrastructure backend complète et l'interface utilisateur React. Cette structure permet un développement parallèle efficace avec intégration continue.

---

## Epic Details

### Epic 1: Infrastructure Backend (Priorité Haute)

**Objectif** : Construire la fondation serveur, API et persistence nécessaire au fonctionnement de la plateforme.

**Stories** :

1. **Serveur Express** - Configuration du serveur Node.js avec Express, gestion des routes et middleware
2. **API REST** - Implémentation des endpoints pour projets, workflows, agents et événements
3. **Base de données** - Schéma SQLite avec services de persistence pour tous les modèles de données
4. **Service de projets** - Scan automatique des projets BMad et gestion du contexte actif
5. **Service de workflows** - Découverte, organisation et exécution des workflows par phases
6. **Service d'agents** - Gestion des agents BMad avec activation et configuration
7. **Hub d'intégration IDE** - Architecture générique pour connexions multi-IDEs
8. **Événements temps réel** - Implémentation Server-Sent Events pour synchronisation

**Critères d'acceptation** :

- Serveur démarre sans erreur sur le port configuré
- API répond correctement à toutes les routes définies
- Base de données persiste et récupère les données correctement
- Services de projets et workflows fonctionnent avec les données de test

---

### Epic 2: Interface Utilisateur (Priorité Haute)

**Objectif** : Développer l'interface React complète avec navigation, dashboard et gestion des entités.

**Stories** :

1. **Application React** - Configuration de base avec TypeScript, Material-UI et Redux
2. **Layout principal** - Sidebar de navigation et structure responsive
3. **Dashboard** - Page principale avec métriques temps réel et actions rapides
4. **Gestion des projets** - Interface de sélection et configuration des projets
5. **Interface workflows** - Navigation par phases et exécution des workflows
6. **Gestion des agents** - Contrôle visuel des agents avec toggles et paramètres
7. **Hub intégrations IDE** - Interface de connexion et monitoring des IDEs
8. **État global** - Stores Redux pour gestion centralisée de l'état

**Critères d'acceptation** :

- Interface se charge correctement dans le navigateur
- Navigation fluide entre toutes les sections
- Dashboard affiche des métriques cohérentes
- Interactions avec les projets et workflows fonctionnent
- Design responsive sur différentes tailles d'écran

**Note** : Lancement progressif recommandé - commencer par le dashboard et la gestion de projets avant d'ajouter les workflows complexes.
