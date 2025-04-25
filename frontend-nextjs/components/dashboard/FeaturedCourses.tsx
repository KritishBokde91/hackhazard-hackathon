'use client';
import { motion } from 'framer-motion';
import CourseCard from './CourseCard';

export default function FeaturedCourses() {
  const courses = [
    {
      title: 'Advanced CSS',
      subtitle: 'Master Flexbox, Grid and Animations',
      imageUrl: 'https://miro.medium.com/v2/resize:fit:1400/1*OFsc0SD55jhi8cjo7aCA4w.jpeg',
      color: 'bg-purple-500'
    },
    {
      title: 'JavaScript 2023',
      subtitle: 'ES6+ Features and Modern Patterns',
      imageUrl: 'https://cdn.geekboots.com/geek/javascript-meta-1652702081069.jpg',
      color: 'bg-amber-500'
    },
    {
      title: 'React Masterclass',
      subtitle: 'Hooks, Context and Performance',
      imageUrl: 'https://www.scnsoft.com/blog-pictures/cover-pics/react_js.png',
      color: 'bg-blue-500'
    },
    {
      title: 'TypeScript Basics',
      subtitle: 'Static Typing for JavaScript',
      imageUrl: 'https://cdn.thenewstack.io/media/2022/01/10b88c68-typescript-logo.png',
      color: 'bg-cyan-500'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="space-y-4"
    >
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">Featured Courses</h3>
        <button className="text-primary hover:underline">View All</button>
      </div>
      <div className="overflow-x-auto pb-4">
        <div className="flex space-x-4 w-max">
          {courses.map((course, index) => (
            <CourseCard
              key={index}
              title={course.title}
              subtitle={course.subtitle}
              imageUrl={course.imageUrl}
              color={course.color}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}