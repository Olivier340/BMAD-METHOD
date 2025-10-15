import { Router, Request, Response } from 'express';
import config from '../config/environment';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  const healthCheck = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0',
    environment: config.nodeEnv,
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    config: {
      port: config.port,
      corsOrigins: config.corsOrigins.length,
      logLevel: config.logLevel,
    },
  };

  res.json(healthCheck);
});

// Detailed health check for load balancers
router.get('/detailed', (req: Request, res: Response) => {
  const detailedHealth = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0',
    environment: config.nodeEnv,
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    platform: process.platform,
    nodeVersion: process.version,
    config: {
      port: config.port,
      corsOrigins: config.corsOrigins,
      logLevel: config.logLevel,
      databaseUrl: config.databaseUrl.replace(/:[^:]+@/, ':***@'), // Hide password
    },
    dependencies: {
      express: require('express/package.json').version,
      cors: require('cors/package.json').version,
    },
  };

  res.json(detailedHealth);
});

export default router;
