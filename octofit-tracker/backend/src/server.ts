import express, { Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { connectDatabase } from './config/database';
import { ActivityModel } from './models/Activity';
import { LeaderboardModel } from './models/Leaderboard';
import { TeamModel } from './models/Team';
import { UserModel } from './models/User';
import { WorkoutModel } from './models/Workout';

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

const allowedOrigins = ['http://localhost:5173'];
if (process.env.CODESPACE_NAME) {
  allowedOrigins.push(`https://${process.env.CODESPACE_NAME}-5173.app.github.dev`);
}

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error('Not allowed by CORS'));
    },
  }),
);

app.get('/api/health', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    service: 'octofit-backend',
    mongodb: mongoose.connection.readyState,
    apiUrl: getApiUrl(),
  });
});

app.get('/api/users', async (_req: Request, res: Response) => {
  try {
    const users = await UserModel.find().lean();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.post('/api/users', (_req: Request, res: Response) => {
  res.status(201).json({
    message: 'Create new user',
    endpoint: '/api/users',
  });
});

app.get('/api/teams', async (_req: Request, res: Response) => {
  try {
    const teams = await TeamModel.find().lean();
    res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch teams' });
  }
});

app.post('/api/teams', (_req: Request, res: Response) => {
  res.status(201).json({
    message: 'Create new team',
    endpoint: '/api/teams',
  });
});

app.get('/api/activities', async (_req: Request, res: Response) => {
  try {
    const activities = await ActivityModel.find().lean();
    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activities' });
  }
});

app.post('/api/activities', (_req: Request, res: Response) => {
  res.status(201).json({
    message: 'Log new activity',
    endpoint: '/api/activities',
  });
});

app.get('/api/leaderboard', async (_req: Request, res: Response) => {
  try {
    const leaderboard = await LeaderboardModel.find().sort({ rank: 1 }).lean();
    res.status(200).json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

app.get('/api/workouts', async (_req: Request, res: Response) => {
  try {
    const workouts = await WorkoutModel.find().lean();
    res.status(200).json(workouts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workouts' });
  }
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

