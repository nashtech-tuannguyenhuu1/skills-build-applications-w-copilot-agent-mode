import express, { Request, Response } from 'express';
import mongoose from 'mongoose';

const app = express();

const PORT = Number(process.env.PORT ?? 8000);
const MONGODB_URI = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';

app.use(express.json());

app.get('/api/health', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    service: 'octofit-backend',
    mongodb: mongoose.connection.readyState,
  });
});

const startServer = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log(`Connected to MongoDB at ${MONGODB_URI}`);

    app.listen(PORT, () => {
      console.log(`OctoFit backend listening on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start backend service:', error);
    process.exit(1);
  }
};

void startServer();

