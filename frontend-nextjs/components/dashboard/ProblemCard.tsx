import { Problem } from '@/lib/constants';

interface ProblemCardProps {
  problem: Problem;
}

export default function ProblemCard({ problem }: ProblemCardProps) {
  const difficultyColors = {
    easy: 'bg-green-500',
    medium: 'bg-yellow-500',
    hard: 'bg-red-500',
  };

  return (
    <div className="p-4 rounded-lg border border-border">
      <div className="flex justify-between items-center">
        <h4 className="font-medium">{problem.title}</h4>
        <span className={`px-2 py-1 rounded-full text-xs ${difficultyColors[problem.difficulty]}`}>
          {problem.difficulty}
        </span>
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {problem.tags.map(tag => (
          <span key={tag} className="text-xs px-2 py-1 rounded-full bg-accent text-accent-foreground">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}