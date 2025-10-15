# Instructions de sauvegarde et restauration

## Vue d'ensemble

Ce document explique comment utiliser le système de sauvegarde intégré au workflow d'édition.

## Sauvegardes automatiques

Le système crée automatiquement une sauvegarde avant chaque modification importante :

- Nom du fichier : `workflow-backup-[timestamp].yaml`
- Emplacement : `{output_folder}/workflow-backups/`
- Format : YAML complet du workflow avant modification

## Sauvegardes manuelles

Vous pouvez créer des sauvegardes à tout moment :

```bash
backup-current
```

## Liste des sauvegardes

Pour voir toutes les sauvegardes disponibles :

```bash
list-backups
```

## Restauration depuis une sauvegarde

Pour restaurer un workflow depuis une sauvegarde :

```bash
rollback [timestamp]
```

Exemple :

```bash
rollback 20250115-143022
```

## Structure des sauvegardes

Chaque sauvegarde contient :

- Métadonnées complètes du workflow
- Configuration et variables
- Templates et chemins d'accès
- Points d'intégration
- Horodatage de création

## Bonnes pratiques

- Créez une sauvegarde avant les modifications importantes
- Notez l'horodatage avant les changements risqués
- Vérifiez la restauration après les modifications critiques
- Conservez les sauvegardes importantes pour l'historique

## Dépannage

Si une restauration échoue :

1. Vérifiez les droits d'écriture
2. Contrôlez l'existence du fichier de sauvegarde
3. Validez la syntaxe du fichier de sauvegarde
4. Consultez les logs d'erreur
