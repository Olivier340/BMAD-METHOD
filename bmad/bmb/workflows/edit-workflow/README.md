# Workflow Edit-Workflow - BMAD BMB

## Vue d'ensemble

Le workflow `edit-workflow` fait partie du module **BMAD Method Builder (BMB)** et fournit des capacités d'édition sécurisée et contrôlée pour les workflows BMAD existants.

## Fonctionnalités principales

### Édition interactive

- Interface interactive pour la modification des workflows
- Prévisualisation des changements avant application
- Validation en temps réel de la syntaxe

### Sécurité intégrée

- Sauvegarde automatique avant chaque modification
- Système de rollback en cas d'erreur
- Détection et résolution des conflits

### Types d'édition supportés

- **Métadonnées** : nom, description, auteur, version
- **Structure** : étapes, variables, chemins d'accès
- **Configuration** : paramètres et variables de configuration
- **Templates** : références aux fichiers d'instructions et modèles
- **Intégrations** : points d'intégration Claude Code

## Structure du workflow

```
bmad/bmb/workflows/edit-workflow/
├── workflow.yaml              # Configuration principale du workflow
├── instructions.md            # Instructions d'utilisation détaillées
├── backup-instructions.md     # Guide de sauvegarde et restauration
├── workflow-template.yaml     # Template pour nouveaux workflows
├── validation-template.md     # Template de rapport de validation
├── backup-template.md         # Template pour les sauvegardes
└── README.md                  # Cette documentation
```

## Utilisation de base

### Démarrage du workflow

```bash
# Lancer l'édition interactive d'un workflow
bmad-bmb-edit-workflow [module] [workflow-name]
```

### Commandes principales

- `list-workflows` : Lister les workflows disponibles par module
- `select-workflow [module] [nom]` : Sélectionner un workflow à éditer
- `edit-metadata` : Modifier les métadonnées de base
- `edit-structure` : Modifier la structure du workflow
- `validate-workflow` : Valider la structure actuelle
- `backup-current` : Créer une sauvegarde manuelle
- `rollback [timestamp]` : Restaurer une version précédente

## Exemple d'utilisation

```bash
# 1. Lister les workflows disponibles dans le module BMM
bmad-bmb-edit-workflow list-workflows bmm

# 2. Sélectionner un workflow à éditer
bmad-bmb-edit-workflow select-workflow bmm prd

# 3. Modifier les métadonnées
bmad-bmb-edit-workflow edit-metadata

# 4. Prévisualiser les changements
bmad-bmb-edit-workflow preview-changes

# 5. Appliquer les modifications
bmad-bmb-edit-workflow apply-changes

# 6. Valider le workflow modifié
bmad-bmb-edit-workflow validate-workflow
```

## Fonctionnalités de sécurité

### Sauvegardes automatiques

- Création d'une sauvegarde avant chaque modification importante
- Format : `workflow-backup-[YYYYMMDD-HHMMSS].yaml`
- Emplacement : `{output_folder}/workflow-backups/`

### Validation multi-niveaux

1. **Syntaxe YAML** : Vérification de la validité du format
2. **Structure** : Contrôle des champs requis et optionnels
3. **Références** : Vérification des chemins d'accès et fichiers référencés
4. **Intégrité** : Contrôle de cohérence globale

### Gestion des erreurs

- Messages d'erreur détaillés et contextuels
- Suggestions de correction automatique
- Mode de récupération en cas d'échec

## Intégration avec BMAD

### Compatibilité

Ce workflow est compatible avec tous les modules BMAD :

- **BMB** : BMAD Method Builder
- **BMM** : BMAD Method Manager
- **CORE** : BMAD Core
- **CIS** : BMAD Creative Intelligence System

### Points d'intégration Claude Code

- Injection point : `workflow-editor`
- Sous-agents disponibles :
  - `workflow-parser` : Analyse de structure
  - `validation-engine` : Moteur de validation
  - `backup-manager` : Gestion des sauvegardes
  - `change-preview` : Prévisualisation des changements

## Configuration

Le workflow utilise la configuration BMAD standard définie dans :

- `{project-root}/bmad/bmb/config.yaml` (configuration BMB)
- Variables d'environnement du projet

## Support et maintenance

### Logs et rapports

- Fichier de statut : `{output_folder}/edit-workflow-status.md`
- Rapport de validation : `{output_folder}/workflow-validation-report.md`
- Logs détaillés disponibles via l'interface interactive

### Résolution de problèmes

Consulter les fichiers d'instructions spécialisés :

- `instructions.md` : Guide d'utilisation complet
- `backup-instructions.md` : Gestion des sauvegardes et restauration

## Historique des versions

- **v1.0.0** : Version initiale avec fonctionnalités de base
- Support pour l'édition de métadonnées et structure
- Système de sauvegarde et validation intégré
