# Workflow Create-Workflow - BMAD BMB

## Vue d'ensemble

Le workflow `create-workflow` fait partie du module **BMAD Method Builder (BMB)** et fournit des capacités complètes de création de nouveaux workflows BMAD de manière guidée et structurée.

## Fonctionnalités principales

### Création interactive

- Interface interactive pour la création de workflows
- Guidage étape par étape avec validation
- Prévisualisation avant création finale

### Support multi-modules

- Création de workflows pour tous les modules BMAD :
  - **BMB** : BMAD Method Builder workflows
  - **BMM** : BMAD Method Manager workflows
  - **CORE** : BMAD Core workflows
  - **CIS** : BMAD Creative Intelligence workflows

### Automatisation complète

- Génération automatique de la structure de fichiers
- Création des templates et instructions
- Intégration automatique dans le système BMAD
- Validation et tests automatisés

## Structure du workflow

```
bmad/bmb/workflows/create-workflow/
├── workflow.yaml                    # Configuration principale
├── instructions.md                  # Instructions détaillées
├── workflow-creation-guide.md       # Guide de création avancé
├── workflow-template/               # Templates pour nouveaux workflows
│   ├── workflow-template.yaml       # Template de base
│   ├── validation-template.md       # Template de validation
│   └── instructions.md              # Template d'instructions
└── README.md                        # Cette documentation
```

## Utilisation de base

### Démarrage de la création

```bash
# Lancer la création interactive d'un workflow
bmad-bmb-create-workflow [module] [workflow-name]
```

### Exemple d'utilisation

```bash
# 1. Créer un workflow dans le module BMM
bmad-bmb-create-workflow bmm analyse-projet

# 2. Le système va vous guider à travers :
#    - Définition des métadonnées
#    - Configuration des variables
#    - Création des fichiers d'instructions
#    - Génération des templates
#    - Validation et intégration
```

## Processus de création

### 1. Planification

- Définition du nom et de la description
- Sélection du module cible
- Analyse des besoins et objectifs

### 2. Structure

- Création du dossier et fichiers de base
- Configuration des variables et chemins
- Définition des fonctionnalités supportées

### 3. Contenu

- Génération des fichiers d'instructions
- Création des templates nécessaires
- Configuration des intégrations

### 4. Validation

- Vérification de la syntaxe et structure
- Test de l'intégration BMAD
- Validation des références

### 5. Documentation

- Génération du README
- Création des guides d'utilisation
- Documentation des fonctionnalités

### 6. Intégration

- Enregistrement dans les manifests
- Mise à jour des configurations
- Finalisation de l'intégration

## Fonctionnalités avancées

### Templates intelligents

- Génération automatique basée sur le type de workflow
- Adaptation aux spécificités de chaque module
- Personnalisation selon les besoins

### Validation intégrée

- Contrôle de syntaxe YAML en temps réel
- Vérification d'intégrité des références
- Tests de compatibilité BMAD

### Intégration automatique

- Mise à jour du manifest des fichiers
- Création des liens de navigation
- Configuration des intégrations Claude Code

## Configuration

Le workflow utilise la configuration BMAD standard définie dans :

- `{project-root}/bmad/bmb/config.yaml` (configuration BMB)
- Variables d'environnement du projet

## Variables de création

### Variables principales

- `workflow_name` : Nom unique du workflow (obligatoire)
- `module` : Module cible (bmb/bmm/core/cis) (obligatoire)
- `description` : Description fonctionnelle (obligatoire)
- `author` : Auteur du workflow (obligatoire)

### Options avancées

- `workflow_type` : Type de workflow (template/action)
- `complexity_level` : Niveau de complexité (1-4)
- `interactive` : Mode interactif (true/false)
- `require_validation` : Validation obligatoire (true/false)

## Codes de sortie

- `0` : Succès - Workflow créé et intégré
- `1` : Erreur de validation
- `2` : Nom de workflow déjà existant
- `3` : Droits insuffisants
- `4` : Configuration invalide

## Support et maintenance

### Logs et rapports

- Fichier de statut : `{output_folder}/create-workflow-status.md`
- Rapport de validation : `{output_folder}/workflow-validation-report.md`
- Logs détaillés disponibles via l'interface interactive

### Ressources disponibles

- Guide de création avancé : `workflow-creation-guide.md`
- Instructions détaillées : `instructions.md`
- Templates et exemples fournis

## Historique des versions

- **v1.0.0** : Version initiale avec création de base
- Support complet pour tous les modules BMAD
- Génération automatique de documentation
- Intégration et validation automatisées

## Contribuer

Pour améliorer ce workflow :

1. Tester avec différents types de workflows
2. Signaler les problèmes dans la documentation
3. Proposer des améliorations via les canaux appropriés
4. Contribuer aux templates et guides

---

_Documentation générée automatiquement par le système BMAD_
