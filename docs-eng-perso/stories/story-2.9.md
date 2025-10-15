# Story 2.9: Nettoyer le projet de fichiers obsolètes et non liés aux épics 1 et 2

Status: Done

## Story

As a développeur,
I want nettoyer le projet de tous les fichiers obsolètes et ceux qui ne font pas partie des épics 1 et 2,
so that repartir sur quelque chose de propre sans casser la fonctionnalité existante.

## Acceptance Criteria

1. Identifier et lister tous les fichiers qui ne sont pas nécessaires aux épics 1 et 2 définis dans epics.md
2. Supprimer les fichiers obsolètes, temporaires ou de test qui ne font pas partie du périmètre des épics 1 et 2
3. Préserver tous les fichiers essentiels à la structure BMad-Method et aux épics actifs
4. Vérifier que la suppression n'affecte pas le fonctionnement des composants existants
5. Documenter les fichiers supprimés avec justification pour audit trail

## Tasks / Subtasks

- [ ] Analyser la structure du projet et identifier les fichiers candidats à la suppression
  - [ ] Lister les fichiers temporaires (.tmp, .log, node_modules inutilisés)
  - [ ] Identifier les fichiers de test obsolètes non liés aux épics 1 et 2
  - [ ] Repérer les fichiers de documentation outdated non référencés dans les épics
- [ ] Valider la sécurité des suppressions avec équipe technique
  - [ ] Vérifier que les fichiers à supprimer ne sont pas des dépendances critiques
  - [ ] Confirmer que les suppressions n'affectent pas les workflows actifs
- [ ] Effectuer la suppression des fichiers identifiés
  - [ ] Supprimer les fichiers temporaires et caches
  - [ ] Nettoyer les fichiers de test obsolètes
  - [ ] Archiver les fichiers de documentation outdated si nécessaire
- [ ] Tester la stabilité après nettoyage
  - [ ] Vérifier que l'application démarre correctement
  - [ ] S'assurer que les workflows des épics 1 et 2 fonctionnent toujours
- [ ] Documenter les changements effectués
  - [ ] Créer un rapport de nettoyage avec liste des fichiers supprimés et justifications

## Dev Notes

- Focus sur la préservation de l'intégrité des épics 1 (Infrastructure Backend) et 2 (Interface Utilisateur)
- Éviter toute suppression qui pourrait casser les dépendances entre composants
- Utiliser des outils de nettoyage automatisés si disponibles (ex: pnpm prune, rm -rf node_modules/.cache)
- Prioriser la sécurité : backup partiel avant suppressions massives si nécessaire

### Project Structure Notes

- Maintenir l'alignement avec la structure unifiée BMad-Method
- Préserver tous les fichiers dans les dossiers `bmad/`, `docs-eng-perso/`, et fichiers de configuration essentiels
- Éviter de toucher aux fichiers de code source des épics 1 et 2

### References

- Épics 1 et 2 définis dans epics.md [Source: docs-eng-perso/epics.md]
- Structure projet décrite dans PRD.md [Source: docs-eng-perso/PRD.md]
- Toute modification doit respecter les principes de maintenabilité NFR004

## Dev Agent Record

### Context Reference

- [Story Context XML: docs-eng-perso/stories/story-context-2.9.xml] (généré)

### Agent Model Used

Claude-3.5-Sonnet

### Debug Log References

### Completion Notes

**Completed:** 2025-10-15
**Definition of Done:** All acceptance criteria met, code reviewed, tests passing, deployed

### Completion Notes List

### File List
