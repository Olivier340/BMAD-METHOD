import express from 'express';
import helmet from 'helmet';
import corsMiddleware from './middleware/cors';
import { setupLogging } from './middleware/logging';
import { errorHandler } from './middleware/error-handler';
import healthRoutes from './routes/health';
import { createAPIRouter } from './api';
// import { prisma } from './database/prisma'; // Not currently used
import config from './config/environment';
// import SSEServer from '../events/sse-server'; // Not currently used

const app = express();

// Initialize Prisma (no need for manual initialization)

// Security middleware
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:', 'https:'],
      },
    },
  }),
);

// CORS configuration
app.use(corsMiddleware);

// Logging setup
setupLogging(app);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check routes
app.use('/health', healthRoutes);

// API routes
const apiRouter = createAPIRouter();
app.use('/api', apiRouter);

// Initialize SSE server
// const sseServer = new SSEServer(app); // Not currently used
// console.log('📡 SSE Server initialized for real-time events');

// Catch-all handler for unmatched routes
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    message: `Route ${req.originalUrl} not found`,
  });
});

// Global error handler (must be last)
app.use(errorHandler);

// Graceful shutdown handling
const server = app.listen(config.port, () => {
  console.log(`🚀 BMad Visual Studio Server running on port ${config.port}`);
  console.log(`📊 Environment: ${config.nodeEnv}`);
  console.log(`🔗 Health check: http://localhost:${config.port}/health`);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
});

export default app;
