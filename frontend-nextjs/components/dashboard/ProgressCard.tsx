import Image from 'next/image';

interface ProgressCardProps {
  title: string;
  percent: number;
  color: string;
  imageUrl: string;
}

export default function ProgressCard({ title, percent, color, imageUrl }: ProgressCardProps) {
  return (
    <div className="p-4 rounded-lg border border-border">
      <div className="flex items-center gap-3">
        <div className="relative w-10 h-10">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/fallback-skill.png';
            }}
          />
        </div>
        <div className="flex-1">
          <h4 className="font-medium">{title}</h4>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
            <div 
              className={`h-2 rounded-full ${color}`}
              style={{ width: `${percent}%` }}
            ></div>
          </div>
          <p className="text-xs text-muted-foreground mt-1">{percent}% complete</p>
        </div>
      </div>
    </div>
  );
}