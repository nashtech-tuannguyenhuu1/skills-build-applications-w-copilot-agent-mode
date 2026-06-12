import { InferSchemaType, Schema, Types, model } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: 'User', required: true, unique: true },
    totalCalories: { type: Number, required: true, default: 0 },
    totalMinutes: { type: Number, required: true, default: 0 },
    rank: { type: Number, required: true },
  },
  { timestamps: true },
);

export type Leaderboard = InferSchemaType<typeof leaderboardSchema>;
export const LeaderboardModel = model('Leaderboard', leaderboardSchema);

