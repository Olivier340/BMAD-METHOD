# Instructions pour l'édition de workflow BMAD

## Vue d'ensemble

Ce workflow vous guide à travers l'édition sécurisée et contrôlée des workflows BMAD existants.

## Prérequis

- Workflow cible doit exister
- Droits d'écriture sur le système de fichiers
- Configuration BMAD valide

## Étapes du workflow

### 1. Sélection du workflow cible

- Choisir le module (bmb/bmm/core/cis)
- Sélectionner le workflow spécifique à éditer
- Vérifier l'existence et l'accessibilité

### 2. Analyse du workflow actuel

- Parser la structure YAML existante
- Identifier les composants critiques
- Détecter les dépendances et références

### 3. Sélection des modifications

- Choisir le type d'édition (métadonnées/structure/configuration)
- Spécifier les modifications souhaitées
- Prévisualiser les changements

### 4. Validation et sauvegarde

- Créer une sauvegarde automatique
- Valider la syntaxe et l'intégrité
- Appliquer les modifications
- Générer un rapport de validation

## Types d'édition supportés

### Métadonnées du workflow

- Nom et description
- Auteur et version
- Configuration de base

### Structure du workflow

- Étapes et séquencement
- Variables de configuration
- Chemins d'accès aux templates

### Templates et instructions

- Références aux fichiers d'instructions
- Templates de sortie
- Fichiers de configuration

### Points d'intégration

- Intégrations Claude Code
- Sous-agents disponibles
- Points d'injection

## Fonctionnalités de sécurité

### Sauvegarde automatique

- Création d'une sauvegarde avant toute modification
- Stockage horodaté des versions précédentes
- Capacité de restauration en cas d'erreur

### Validation en temps réel

- Vérification de la syntaxe YAML
- Contrôle d'intégrité des références
- Détection des conflits potentiels

### Prévisualisation des changements

- Affichage des modifications avant application
- Confirmation utilisateur obligatoire
- Possibilité d'annulation

## Commandes disponibles

### Navigation

- `list-workflows` : Lister les workflows disponibles
- `select-workflow [module] [nom]` : Sélectionner un workflow à éditer
- `show-current` : Afficher le workflow actuel
- `backup-current` : Créer une sauvegarde manuelle

### Édition

- `edit-metadata` : Modifier les métadonnées de base
- `edit-structure` : Modifier la structure du workflow
- `edit-config` : Modifier les variables de configuration
- `edit-templates` : Modifier les références de templates

### Validation et sauvegarde

- `validate-workflow` : Valider la structure actuelle
- `preview-changes` : Prévisualiser les modifications
- `apply-changes` : Appliquer les modifications validées
- `rollback [timestamp]` : Restaurer une version précédente

## Codes de sortie

- `0` : Succès
- `1` : Erreur de validation
- `2` : Workflow non trouvé
- `3` : Droits insuffisants
- `4` : Conflit détecté
