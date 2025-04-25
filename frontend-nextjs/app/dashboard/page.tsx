'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import WelcomeCard from '@/components/dashboard/WelcomeCard';
import ProgressSection from '@/components/dashboard/ProgressSection';
import ProblemOfTheDay from '@/components/dashboard/ProblemOfTheDay';
import FeaturedCourses from '@/components/dashboard/FeaturedCourses';
import RecentActivity from '@/components/dashboard/RecentActivity';
import ShimmerLoader from '@/components/dashboard/ShimmerLoader';
import CustomNavBar from '@/components/CustomNavbar';
import ResponsiveDrawer from '@/components/ResponsiveDrawer';

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isDarkMode = useMediaQuery({ query: '(prefers-color-scheme: dark)' });
  const isSmallScreen = useMediaQuery({ query: '(max-width: 768px)' });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <CustomNavBar onMenuClick={toggleDrawer} />
      
      <ResponsiveDrawer open={drawerOpen} onClose={toggleDrawer} />

      <main className="relative z-10 pt-16 pb-10 px-4 md:px-6">
        <AnimatePresence>
          {isLoading ? (
            <ShimmerLoader dark={isDarkMode} />
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-7xl mx-auto"
            >
              <div className={`rounded-xl overflow-hidden ${isDarkMode ? 'bg-gray-800/70 backdrop-blur-sm border border-gray-700/50' : 'bg-white shadow-md'}`}>
                <div className="p-6 md:p-8">
                  <div className="space-y-8">
                    <WelcomeCard />
                    <ProgressSection />
                    <ProblemOfTheDay />
                    <FeaturedCourses />
                    <RecentActivity />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}