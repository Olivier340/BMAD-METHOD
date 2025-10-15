# BMad Visual Studio Server

Backend Express.js server pour BMad Visual Studio - Interface web révolutionnaire pour BMad-Method v6.

## 🚀 Démarrage Rapide

### Installation

```bash
cd src/server
npm install
```

### Développement

```bash
# Démarrer en mode développement avec hot reload
npm run dev

# Le serveur démarre sur http://localhost:3000
```

### Production

```bash
# Build TypeScript
npm run build

# Démarrer en production
npm start
```

## 📁 Structure du Projet

```
src/server/
├── index.ts                 # Point d'entrée serveur
├── config/
│   └── environment.ts       # Configuration environnement
├── middleware/
│   ├── cors.ts             # Configuration CORS
│   ├── logging.ts          # Logging structuré
│   └── error-handler.ts    # Gestion erreurs globale
├── routes/
│   └── health.ts           # Health check endpoint
├── api/                    # Routes API (à implémenter story 1.2)
├── services/               # Logique métier (à implémenter)
├── database/               # Configuration base données (story 1.3)
└── integrations/           # Adaptateurs IDE (stories futures)
```

## 🔧 Configuration

### Variables d'Environnement

| Variable       | Description            | Défaut                                         |
| -------------- | ---------------------- | ---------------------------------------------- |
| `NODE_ENV`     | Environnement          | `development`                                  |
| `PORT`         | Port serveur           | `3000`                                         |
| `DATABASE_URL` | URL base données       | `file:./dev.db`                                |
| `JWT_SECRET`   | Clé JWT                | `dev-secret-key`                               |
| `CORS_ORIGINS` | Origins CORS autorisés | `http://localhost:42065,http://localhost:3000` |
| `LOG_LEVEL`    | Niveau logging         | `info`                                         |

### Fichiers de Configuration

- `.env` - Variables environnement (copier depuis `.env.example`)
- `package.json` - Dépendances et scripts
- `tsconfig.json` - Configuration TypeScript

## 🏗️ Architecture

### Technologies Utilisées

- **Runtime** : Node.js 18+
- **Framework** : Express.js v4.18.0
- **Language** : TypeScript 5.2.0
- **Sécurité** : Helmet, CORS, JWT
- **Validation** : Joi, express-validator
- **Logging** : Morgan avec format JSON
- **Base de Données** : SQLite (dev), Prisma ORM

### Middleware Stack

1. **Helmet** - Headers sécurité
2. **CORS** - Configuration cross-origin
3. **Logging** - Morgan avec format structuré
4. **JSON Parser** - Body parsing avec limite 10MB
5. **Error Handler** - Gestion erreurs globale

### Endpoints Disponibles

| Method | Endpoint           | Description                         |
| ------ | ------------------ | ----------------------------------- |
| `GET`  | `/health`          | Health check avec métriques système |
| `GET`  | `/health/detailed` | Health check détaillé               |

## 🧪 Tests

### Exécution des Tests

```bash
# Tests unitaires
npm test

# Tests avec coverage
npm run test:coverage

# Tests en mode watch
npm run test:watch
```

### Structure des Tests

```
src/server/
├── __tests__/
│   ├── index.test.ts           # Tests serveur principal
│   ├── middleware/
│   │   ├── cors.test.ts        # Tests middleware CORS
│   │   ├── logging.test.ts     # Tests logging
│   │   └── error-handler.test.ts # Tests gestion erreurs
│   └── routes/
│       └── health.test.ts      # Tests endpoint health
└── test-setup.ts               # Configuration tests
```

## 🔒 Sécurité

### Authentification

- JWT avec expiration automatique
- Refresh tokens pour sessions longues
- Sécurisation cookies httpOnly

### Autorisation

- Role-based access control (RBAC)
- Permissions granulaires par ressource
- Audit trail pour actions sensibles

### Sécurité Infrastructure

- Headers sécurité Helmet
- Rate limiting configurable
- Validation inputs stricte
- Prévention injection SQL via Prisma

## 📊 Monitoring

### Health Checks

- `/health` - Health check basique
- `/health/detailed` - Métriques détaillées système

### Logging

- Format JSON structuré
- Niveaux configurables (debug, info, warn, error)
- Correlation IDs pour suivi requête

### Métriques

- Performance API (latence, throughput)
- Utilisation ressources (mémoire, CPU)
- Erreurs par endpoint

## 🚀 Déploiement

### Développement

```bash
npm run dev  # Démarrage avec hot reload
```

### Production

```bash
npm run build  # Build TypeScript
npm start      # Démarrage production
```

### Docker (Préparation)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

## 🔧 Développement

### Ajout de Nouvelles Routes

1. Créer fichier dans `routes/`
2. Définir routes avec validation
3. Ajouter au routeur principal
4. Ajouter tests correspondants

### Middleware Personnalisé

1. Créer dans `middleware/`
2. Exporter fonction middleware
3. Ajouter à la stack dans `index.ts`

### Services Métier

1. Créer dans `services/`
2. Implémenter logique métier
3. Intégrer avec routes API
4. Ajouter tests unitaires

## 📚 Documentation

- [API Documentation](../../docs/api/README.md)
- [Architecture](../../docs/solution-architecture.md)
- [Stories](../../docs/story-*.md)

## 🤝 Contribution

1. Créer branche feature
2. Implémenter avec tests
3. Soumettre PR avec description
4. Review et merge

## 📄 Licence

MIT License - Voir fichier LICENSE
