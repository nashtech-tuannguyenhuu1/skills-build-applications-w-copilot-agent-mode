import { connectDatabase, disconnectDatabase } from '../config/database';
import { ActivityModel } from '../models/Activity';
import { LeaderboardModel } from '../models/Leaderboard';
import { TeamModel } from '../models/Team';
import { UserModel } from '../models/User';
import { WorkoutModel } from '../models/Workout';

// Seed the octofit_db database with test data
const seed = async (): Promise<void> => {
  await connectDatabase();

  // Clear collections
  await Promise.all([
    ActivityModel.deleteMany({}),
    LeaderboardModel.deleteMany({}),
    TeamModel.deleteMany({}),
    UserModel.deleteMany({}),
    WorkoutModel.deleteMany({}),
  ]);

  // Create users
  const [alice, bob, charlie, diana] = await UserModel.create([
    {
      username: 'alicefit',
      email: 'alice@example.com',
      profileName: 'Alice Runner',
    },
    {
      username: 'boblift',
      email: 'bob@example.com',
      profileName: 'Bob Lifter',
    },
    {
      username: 'charlieyogi',
      email: 'charlie@example.com',
      profileName: 'Charlie Yogi',
    },
    {
      username: 'dianacycle',
      email: 'diana@example.com',
      profileName: 'Diana Cyclist',
    },
  ]);

  // Create teams
  const [sprinters, climbers] = await TeamModel.create([
    { name: 'Octo Sprinters', city: 'Ho Chi Minh City' },
    { name: 'Octo Climbers', city: 'Da Nang' },
  ]);

  // Create activities
  await ActivityModel.create([
    {
      userId: alice._id,
      activityType: 'Running',
      durationMinutes: 35,
      caloriesBurned: 320,
    },
    {
      userId: bob._id,
      activityType: 'Strength',
      durationMinutes: 45,
      caloriesBurned: 280,
    },
    {
      userId: charlie._id,
      activityType: 'Yoga',
      durationMinutes: 60,
      caloriesBurned: 150,
    },
    {
      userId: diana._id,
      activityType: 'Cycling',
      durationMinutes: 40,
      caloriesBurned: 400,
    },
    {
      userId: alice._id,
      activityType: 'Running',
      durationMinutes: 30,
      caloriesBurned: 280,
    },
  ]);

  // Create leaderboard entries
  await LeaderboardModel.create([
    {
      userId: diana._id,
      totalCalories: 400,
      totalMinutes: 40,
      rank: 1,
    },
    {
      userId: alice._id,
      totalCalories: 600,
      totalMinutes: 65,
      rank: 2,
    },
    {
      userId: bob._id,
      totalCalories: 280,
      totalMinutes: 45,
      rank: 3,
    },
    {
      userId: charlie._id,
      totalCalories: 150,
      totalMinutes: 60,
      rank: 4,
    },
  ]);

  // Create workout suggestions
  await WorkoutModel.create([
    {
      userId: alice._id,
      name: 'Morning Run',
      description: 'Easy 5K run to start the day',
      difficulty: 'easy',
      estimatedCalories: 300,
      duration: 30,
    },
    {
      userId: bob._id,
      name: 'Strength Training',
      description: 'Full body strength routine',
      difficulty: 'hard',
      estimatedCalories: 350,
      duration: 45,
    },
    {
      userId: charlie._id,
      name: 'Evening Yoga',
      description: 'Relaxing vinyasa flow',
      difficulty: 'medium',
      estimatedCalories: 150,
      duration: 60,
    },
    {
      userId: diana._id,
      name: 'Long Bike Ride',
      description: 'Scenic cycling tour',
      difficulty: 'medium',
      estimatedCalories: 450,
      duration: 90,
    },
  ]);

  console.log('Seed the octofit_db database with test data');
  console.log('✅ Database seeded successfully with test data');
  console.log(`   - ${4} users created`);
  console.log(`   - ${2} teams created`);
  console.log(`   - ${5} activities logged`);
  console.log(`   - ${4} leaderboard entries`);
  console.log(`   - ${4} workout suggestions`);

  await disconnectDatabase();
};

void seed().catch(async (error: unknown) => {
  console.error('Seed failed:', error);
  await disconnectDatabase();
  process.exit(1);
});

