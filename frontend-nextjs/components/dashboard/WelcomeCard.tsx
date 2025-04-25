// components/WelcomeCard.tsx
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useUser } from '@/context/UserContext';

export default function WelcomeCard() {
  const { user, loading, error } = useUser();
  const userName = user?.name || 'Guest';

  if (loading) return <div className="card-loading">Loading...</div>;
  if (error) return <div className="card-error">Error: {error.message}</div>;

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = '/fallback-user.png';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="card shadow-lg"
    >
      <div className="p-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2">
              Welcome back, {userName}!
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Keep practicing to improve your frontend skills. Today we have a new challenge for you!
            </p>
            <button className="btn-primary">
              Start Practicing
            </button>
          </div>
          <div className="relative w-20 h-20">
            <Image
              src={user?.avatar || "https://cdn-icons-png.flaticon.com/512/3242/3242257.png"}
              alt="Welcome illustration"
              fill
              className="object-contain"
              onError={handleImageError}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}