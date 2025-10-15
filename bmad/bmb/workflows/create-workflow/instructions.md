# Instructions pour la création de workflow BMAD

## Vue d'ensemble

Ce workflow vous guide à travers la création complète d'un nouveau workflow BMAD de manière structurée et sécurisée.

## Prérequis

- Droits d'écriture sur le système de fichiers BMAD
- Configuration BMAD valide dans `{project-root}/bmad/bmb/config.yaml`
- Compréhension des modules BMAD cibles (bmb/bmm/core/cis)

## Processus de création

### Étape 1 : Planification du workflow

<step n="1" goal="Analyze requirements and plan workflow structure">
<action>Définir le nom, la description et l'objectif du workflow</action>
<action>Identifier le module cible (bmb/bmm/core/cis)</action>
<action>Déterminer le type de workflow (template ou action)</action>
<action>Planifier les étapes principales du workflow</action>
</step>

### Étape 2 : Structure de base

<step n="2" goal="Create basic workflow structure and files">
<action>Créer le dossier du workflow dans le module approprié</action>
<action>Générer le fichier workflow.yaml de base</action>
<action>Créer la structure de dossiers pour les composants</action>
<action>Définir les variables de configuration de base</action>
</step>

### Étape 3 : Configuration détaillée

<step n="3" goal="Configure workflow parameters and variables">
<action>Définir les métadonnées complètes du workflow</action>
<action>Configurer les variables de configuration et chemins</action>
<action>Définir les fonctionnalités supportées</action>
<action>Configurer les règles de validation</action>
</step>

### Étape 4 : Templates et instructions

<step n="4" goal="Generate instruction files and templates">
<template-output>
<action>Générer le fichier d'instructions principales</action>
<action>Créer les templates nécessaires (validation, sauvegarde, etc.)</action>
<action>Définir les points d'intégration avec le système BMAD</action>
<action>Configurer les intégrations Claude Code</action>
</template-output>
</step>

### Étape 5 : Validation et tests

<step n="5" goal="Validate workflow structure and references">
<action>Valider la syntaxe YAML du workflow créé</action>
<action>Vérifier l'intégrité des références et chemins</action>
<action>Tester la configuration de base</action>
<action>Vérifier la compatibilité avec le système BMAD</action>
</step>

### Étape 6 : Documentation

<step n="6" goal="Create usage documentation and guides">
<action>Générer le fichier README.md</action>
<action>Créer la documentation d'utilisation</action>
<action>Définir les exemples d'utilisation</action>
<action>Documenter les fonctionnalités et limitations</action>
</step>

### Étape 7 : Intégration système

<step n="7" goal="Integrate workflow with BMAD system">
<action>Ajouter le workflow au manifest BMAD</action>
<action>Mettre à jour les fichiers de configuration</action>
<action>Créer les liens d'intégration nécessaires</action>
<action>Finaliser l'enregistrement du workflow</action>
</step>

## Variables et paramètres

### Variables obligatoires

- `workflow_name` : Nom unique du workflow (requis)
- `module` : Module cible (bmb/bmm/core/cis) (requis)
- `description` : Description fonctionnelle (requis)
- `author` : Auteur du workflow (requis)

### Variables optionnelles

- `workflow_type` : Type de workflow (template/action)
- `complexity_level` : Niveau de complexité (1-4)
- `target_audience` : Public cible
- `dependencies` : Dépendances sur d'autres workflows

## Fonctionnalités avancées

### Support multi-modules

Le workflow peut créer des workflows pour tous les modules BMAD :

- **BMB** : Workflows de construction de méthodes
- **BMM** : Workflows de gestion de méthodes
- **CORE** : Workflows système centraux
- **CIS** : Workflows d'intelligence créative

### Intégration automatique

- Enregistrement automatique dans les manifests BMAD
- Création des liens de navigation
- Configuration des intégrations Claude Code
- Mise à jour des fichiers de configuration

## Codes de sortie

- `0` : Succès - Workflow créé et validé
- `1` : Erreur de validation
- `2` : Nom de workflow déjà existant
- `3` : Droits insuffisants
- `4` : Configuration invalide

## Support et maintenance

- Les workflows créés sont automatiquement intégrés
- Documentation générée pour faciliter la maintenance
- Validation continue assurée par le système BMAD
