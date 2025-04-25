// components/ProblemOfTheDay.tsx
import { motion } from 'framer-motion';
import ProblemCard from './ProblemCard';
import { problems } from '@/lib/constants';

export default function ProblemOfTheDay() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="space-y-4"
    >
      <h3 className="text-xl font-bold">Problem of the Day</h3>
      <div className="space-y-4">
        {problems.map((problem) => (
          <ProblemCard 
            key={problem.id}
            problem={problem}
          />
        ))}
      </div>
    </motion.div>
  );
}