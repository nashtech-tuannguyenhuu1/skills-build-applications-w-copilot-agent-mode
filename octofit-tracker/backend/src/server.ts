import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { connectDatabase } from './config/database';

const app = express();
const PORT = Number(process.env.PORT ?? 8000);

// Build API URL for Codespaces when CODESPACE_NAME is available.
const getApiUrl = (): string => {
  if (process.env.CODESPACE_NAME) {
    return `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`;
  }

  return `http://localhost:${PORT}`;
};

app.use(express.json());

app.get('/api/health', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    service: 'octofit-backend',
    mongodb: mongoose.connection.readyState,
    apiUrl: getApiUrl(),
  });
});

app.get('/api/users', (_req: Request, res: Response) => {
  res.status(200).json({
    message: 'Get all users',
    endpoint: '/api/users',
  });
});

app.post('/api/users', (_req: Request, res: Response) => {
  res.status(201).json({
    message: 'Create new user',
    endpoint: '/api/users',
  });
});

app.get('/api/teams', (_req: Request, res: Response) => {
  res.status(200).json({
    message: 'Get all teams',
    endpoint: '/api/teams',
  });
});

app.post('/api/teams', (_req: Request, res: Response) => {
  res.status(201).json({
    message: 'Create new team',
    endpoint: '/api/teams',
  });
});

app.get('/api/activities', (_req: Request, res: Response) => {
  res.status(200).json({
    message: 'Get all activities',
    endpoint: '/api/activities',
  });
});

app.post('/api/activities', (_req: Request, res: Response) => {
  res.status(201).json({
    message: 'Log new activity',
    endpoint: '/api/activities',
  });
});

app.get('/api/leaderboard', (_req: Request, res: Response) => {
  res.status(200).json({
    message: 'Get competitive leaderboard',
    endpoint: '/api/leaderboard',
  });
});

app.get('/api/workouts', (_req: Request, res: Response) => {
  res.status(200).json({
    message: 'Get personalized workout suggestions',
    endpoint: '/api/workouts',
  });
});

const startServer = async (): Promise<void> => {
  try {
    await connectDatabase();

    app.listen(PORT, () => {
      console.log(`OctoFit backend listening on ${getApiUrl()}`);
    });
  } catch (error) {
    console.error('Failed to start backend service:', error);
    process.exit(1);
  }
};

void startServer();

