import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export interface ServerConfig {
  port: number;
  nodeEnv: 'development' | 'staging' | 'production';
  corsOrigins: string[];
  logLevel: 'debug' | 'info' | 'warn' | 'error';
  databaseUrl: string;
  jwtSecret: string;
  jwtExpiresIn: string;
}

const config: ServerConfig = {
  port: Number.parseInt(process.env.PORT || '3000', 10),
  nodeEnv: (process.env.NODE_ENV as 'development' | 'staging' | 'production') || 'development',
  corsOrigins: process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',') : ['http://localhost:42065', 'http://localhost:3000'],
  logLevel: (process.env.LOG_LEVEL as 'debug' | 'info' | 'warn' | 'error') || 'info',
  databaseUrl: process.env.DATABASE_URL || 'file:./dev.db',
  jwtSecret: process.env.JWT_SECRET || 'dev-secret-key-change-in-production',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '24h',
};

export default config;
