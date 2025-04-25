'use client';
import { motion } from 'framer-motion';
import ProgressCard from './ProgressCard';

export default function ProgressSection() {
  const progressItems = [
    { 
      title: 'HTML/CSS', 
      percent: 75, 
      color: 'bg-orange-500',
      imageUrl: '/html-css.png'
    },
    { 
      title: 'JavaScript', 
      percent: 60, 
      color: 'bg-yellow-500',
      imageUrl: '/javascript.png'
    },
    { 
      title: 'React', 
      percent: 45, 
      color: 'bg-blue-500',
      imageUrl: '/react.png'
    },
    { 
      title: 'TypeScript', 
      percent: 30, 
      color: 'bg-cyan-500',
      imageUrl: '/typescript.png'
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="space-y-6"
    >
      <h3 className="text-xl font-bold">Your Progress</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {progressItems.map((item, index) => (
          <ProgressCard
            key={index}
            title={item.title}
            percent={item.percent}
            color={item.color}
            imageUrl={item.imageUrl}
          />
        ))}
      </div>
    </motion.div>
  );
}