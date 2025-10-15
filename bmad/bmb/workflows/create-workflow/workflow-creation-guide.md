# Guide de création de workflow BMAD

## Introduction

Ce guide fournit des conseils détaillés pour créer des workflows BMAD efficaces et bien intégrés.

## Principes fondamentaux

### 1. Clarté d'objectif

<elicit-required>
Chaque workflow doit avoir un objectif unique et clairement défini. Posez-vous ces questions :
- Quel problème résout ce workflow ?
- Qui va l'utiliser et dans quel contexte ?
- Quels sont les résultats attendus ?
</elicit-required>

### 2. Cohérence BMAD

- Respecter la structure et les conventions BMAD
- Utiliser les mêmes patterns que les workflows existants
- Maintenir la compatibilité avec tous les modules

### 3. Sécurité et validation

- Toujours inclure des mécanismes de sauvegarde
- Valider les entrées et les sorties
- Gérer les erreurs de manière appropriée

## Structure recommandée

### Métadonnées essentielles

```yaml
name: 'nom-unique-du-workflow'
description: 'Description claire et concise'
author: 'Votre nom'
module: 'bmb|bmm|core|cis'
```

### Variables de configuration

- Utiliser des références `{config_source}:variable` quand possible
- Définir des valeurs par défaut pour les variables optionnelles
- Documenter toutes les variables utilisées

### Instructions structurées

- Diviser en étapes logiques numérotées
- Utiliser des balises XML pour les actions spéciales
- Inclure des exemples et des cas d'usage

## Patterns courants

### Pattern de création de fichiers

```xml
<action>Créer le fichier avec le contenu généré</action>
<action>Vérifier que le fichier a été créé correctement</action>
<check if="fichier existe">
  <action>Continuer avec l'étape suivante</action>
</check>
```

### Pattern de validation

```xml
<action>Valider la syntaxe du fichier créé</action>
<check if="validation échoue">
  <action>Afficher les erreurs de validation</action>
  <ask>Corriger les erreurs maintenant ?</ask>
</check>
```

### Pattern d'intégration

```xml
<action>Mettre à jour le manifest BMAD</action>
<action>Créer les liens de navigation nécessaires</action>
<action>Vérifier l'intégration</action>
```

## Bonnes pratiques

### Nommage

- Utiliser des noms en kebab-case (ex: `create-workflow`)
- Être descriptif mais concis
- Éviter les caractères spéciaux sauf necessity

### Documentation

- Créer un README.md pour chaque workflow
- Inclure des exemples d'utilisation
- Documenter les paramètres et variables
- Fournir des guides de dépannage

### Tests et validation

- Tester le workflow dans différents scénarios
- Valider avec différents niveaux de complexité
- Vérifier l'intégration avec les autres workflows

## Ressources disponibles

### Templates fournis

- Template de workflow de base
- Template de validation
- Template de documentation
- Template d'instructions

### Intégrations supportées

- Système de configuration BMAD
- Intégrations Claude Code
- Manifests et fichiers de configuration
- Système de validation

## Support et évolution

- Les workflows créés sont maintenus par le système BMAD
- Mises à jour automatiques des dépendances
- Support pour l'évolution des interfaces

---

_Ce guide est maintenu à jour avec les meilleures pratiques BMAD actuelles._
