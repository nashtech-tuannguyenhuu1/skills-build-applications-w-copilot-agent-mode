import { InferSchemaType, Schema, Types, model } from 'mongoose';

const workoutSchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
    estimatedCalories: { type: Number, required: true, min: 1 },
    duration: { type: Number, required: true, min: 1 },
  },
  { timestamps: true },
);

export type Workout = InferSchemaType<typeof workoutSchema>;
export const WorkoutModel = model('Workout', workoutSchema);

