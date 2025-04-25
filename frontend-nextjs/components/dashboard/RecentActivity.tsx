'use client';
import { motion } from 'framer-motion';

export default function RecentActivity() {
  const activities = [
    { id: 1, action: 'Completed CSS Grid challenge', time: '2 hours ago' },
    { id: 2, action: 'Started React Hooks course', time: '1 day ago' },
    { id: 3, action: 'Earned JavaScript badge', time: '3 days ago' },
    { id: 4, action: 'Joined TypeScript community', time: '1 week ago' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
      className="space-y-4"
    >
      <h3 className="text-xl font-bold">Recent Activity</h3>
      <div className="space-y-3">
        {activities.map((activity) => (
          <div 
            key={activity.id}
            className="p-4 rounded-lg border border-gray-200 dark:border-gray-700"
          >
            <p className="font-medium">{activity.action}</p>
            <p className="text-sm text-gray-500">{activity.time}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}