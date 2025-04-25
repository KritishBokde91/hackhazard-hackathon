import Image from 'next/image';
import { motion } from 'framer-motion';

interface CourseCardProps {
  title: string;
  subtitle: string;
  imageUrl: string;
  color: string;
}

export default function CourseCard({ title, subtitle, imageUrl, color }: CourseCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className={`w-64 h-full rounded-lg overflow-hidden shadow-md ${color} bg-opacity-10 backdrop-blur-sm`}
    >
      <div className="relative h-32 w-full">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/fallback-course.png';
          }}
        />
      </div>
      <div className="p-4">
        <h4 className="font-bold text-lg">{title}</h4>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>
    </motion.div>
  );
}