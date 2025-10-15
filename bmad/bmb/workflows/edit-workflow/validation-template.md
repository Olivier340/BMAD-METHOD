# Template de rapport de validation de workflow

## Rapport de validation - {workflow_name}

**Date :** {date}
**Validé par :** {user_name}
**Version du workflow :** {workflow_version}

## Résumé de la validation

- **Statut :** {validation_status}
- **Score global :** {overall_score}/100
- **Problèmes critiques :** {critical_issues}
- **Problèmes mineurs :** {minor_issues}

## Détails de la validation

### 1. Syntaxe YAML

- **Statut :** {yaml_status}
- **Erreurs :** {yaml_errors}
- **Avertissements :** {yaml_warnings}

### 2. Structure du workflow

- **Statut :** {structure_status}
- **Champs requis présents :** {required_fields}
- **Champs optionnels :** {optional_fields}

### 3. Intégrité des références

- **Statut :** {references_status}
- **Fichiers manquants :** {missing_files}
- **Chemins invalides :** {invalid_paths}

### 4. Variables de configuration

- **Statut :** {config_status}
- **Variables définies :** {defined_variables}
- **Variables utilisées :** {used_variables}

### 5. Métadonnées BMAD

- **Statut :** {metadata_status}
- **Module valide :** {valid_module}
- **Type de workflow :** {workflow_type}

## Recommandations

### Corrections immédiates

{critical_fixes}

### Améliorations suggérées

{suggested_improvements}

### Bonnes pratiques

{best_practices}

## Historique des validations

- **Dernière validation réussie :** {last_successful_validation}
- **Nombre de validations :** {validation_count}
- **Tendance :** {validation_trend}

## Actions suivantes

{next_actions}

---

_Rapport généré par le système de validation BMAD BMB_
