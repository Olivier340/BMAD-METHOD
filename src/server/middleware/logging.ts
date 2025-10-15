import morgan from 'morgan';
import config from '../config/environment';

export const setupLogging = (app: any) => {
  if (config.nodeEnv === 'development') {
    // Development: detailed console logging
    app.use(morgan('dev'));
  } else {
    // Production: structured JSON logging
    app.use(
      morgan('combined', {
        skip: (req, res) => res.statusCode < 400,
        stream: {
          write: (message: string) => {
            console.log(
              JSON.stringify({
                timestamp: new Date().toISOString(),
                level: 'info',
                message: message.trim(),
                type: 'http_request',
              }),
            );
          },
        },
      }),
    );
  }
};

export default setupLogging;
