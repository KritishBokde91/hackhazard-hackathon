"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Home, BookOpen, Trophy, Users, LogOut, User, Code, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";

export default function DashboardPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const navItems = [
    { name: "Home", href: "/dashboard", icon: Home },
    { name: "Problem", href: "/problem", icon: BookOpen },
    { name: "Courses", href: "/courses", icon: Trophy },
    { name: "Leaderboard", href: "/leaderboard", icon: Users },
    { name: "Groq Guru", href: "/groq-guru", icon: User },
    { name: "Logout", href: "/login", icon: LogOut },
  ];

  const skills = [
    { skill: "HTML/CSS", percent: 75, icon: "🏷️", color: "bg-blue-600" },
    { skill: "JavaScript", percent: 60, icon: "💻", color: "bg-yellow-500" },
    { skill: "React", percent: 45, icon: "⚛️", color: "bg-cyan-500" },
  ];

  const featuredCourses = [
    { title: "Advanced CSS", desc: "Master Flexbox, Grid, and Animations", color: "bg-blue-700", icon: "🎨" },
    { title: "JavaScript 2023", desc: "ES6+ Features & Modern Patterns", color: "bg-yellow-600", icon: "🚀" },
    { title: "React Masterclass", desc: "Hooks, Context, and Performance", color: "bg-cyan-600", icon: "⚛️" },
    { title: "TypeScript Basics", desc: "Static Typing for JavaScript", color: "bg-teal-600", icon: "📘" },
  ];

  const recentActivity = [
    { type: "solved", text: "CSS Grid Layout", time: "2 hours ago", color: "text-green-500" },
    { type: "started", text: "React Hooks course", time: "5 hours ago", color: "text-blue-500" },
    { type: "earned", text: "JavaScript Expert badge", time: "1 day ago", color: "text-yellow-500" },
    { type: "completed", text: "HTML5 Semantics lesson", time: "2 days ago", color: "text-purple-500" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950/90 to-slate-900/95 overflow-y-auto" style={{ scrollBehavior: "smooth" }}>
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top-left,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <motion.div
          className="absolute top-0 left-0 w-full max-w-md h-96 bg-blue-500/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-full max-w-md h-96 bg-purple-500/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, delay: 2 }}
        />
      </div>
      <div className="absolute inset-0 bg-blue-950/40 z-0"></div>

      {/* Navbar */}
      <nav className="container mx-auto px-4 py-4 relative z-10 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-white text-xl sm:text-2xl font-bold flex items-center"
        >
          <Code className="mr-2 h-6 w-6 sm:h-8 sm:w-8 text-blue-400" />
          Coding Geeks
        </motion.div>
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 absolute md:static top-16 right-4 left-4 md:left-auto bg-transparent backdrop-blur-none rounded-xl p-4 md:p-0 shadow-none z-50`} // Changed to transparent
        >
          <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
            {navItems.map((item, index) => (
              <motion.li
                key={item.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Link href={item.href} className="flex items-center text-white hover:text-blue-400 transition-colors py-2 md:py-0">
                  <item.icon className="mr-2 h-5 w-5" />
                  {item.name}
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 relative z-10 py-6 sm:py-10">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Welcome back, Kritish Bokde!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-slate-400 mt-4 max-w-2xl mx-auto text-sm sm:text-base"
          >
            Level up your frontend skills with today's challenge! Dive in and conquer the coding universe.
          </motion.p>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 120 }}
            className="mt-6"
          >
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-base sm:text-lg py-4 sm:py-6 px-6 sm:px-8 rounded-full flex items-center">
              <Sparkles className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Start Practicing
            </Button>
          </motion.div>
        </motion.div>

        {/* Progress Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-12 sm:mb-16"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-blue-100 mb-6 sm:mb-8 text-center">Your Progress</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.skill}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                onHoverStart={() => setHoveredSkill(skill.skill)}
                onHoverEnd={() => setHoveredSkill(null)}
                className="relative bg-slate-900/50 backdrop-blur-sm p-4 sm:p-6 rounded-xl border border-slate-800/50 hover:border-blue-500/50 transition-all duration-300"
              >
                <AnimatePresence>
                  {hoveredSkill === skill.skill && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </AnimatePresence>
                <div className="relative z-10 text-center">
                  <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{skill.icon}</div>
                  <h3 className="text-base sm:text-lg font-medium text-blue-200">{skill.skill}</h3>
                  <div className="w-full bg-slate-700 rounded-full h-2 sm:h-3 mt-3 sm:mt-4 overflow-hidden">
                    <motion.div
                      className={`${skill.color} h-full rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.percent}%` }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                  </div>
                  <p className="text-xs sm:text-sm text-slate-400 mt-2">{skill.percent}% Complete</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Problem of the Day */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mb-12 sm:mb-16"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-blue-100 mb-6 sm:mb-8 text-center">Problem of the Day</h2>
          <motion.div
            className="relative bg-gradient-to-r from-slate-900/70 to-slate-800/70 backdrop-blur-sm p-6 sm:p-8 rounded-xl border border-slate-800/50 hover:border-blue-500/50 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <motion.div
              className="absolute top-0 left-0 w-24 sm:w-32 h-24 sm:h-32 bg-blue-500/20 rounded-full blur-2xl"
              animate={{ x: [0, 10, 0], y: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <div className="relative z-10">
              <div className="flex items-center mb-3 sm:mb-4">
                <span className="text-green-500 mr-2 font-semibold text-sm sm:text-base">Easy</span>
                <span className="text-slate-400 text-sm">HTML/CSS</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-blue-200">Responsive Navbar</h3>
              <p className="text-slate-300 mt-2 text-sm sm:text-base">
                Create a responsive navigation bar that collapses into a hamburger menu on mobile devices. The navbar should have a logo on the left and navigation links on the right.
              </p>
              <div className="flex flex-wrap gap-3 mt-5 sm:mt-6">
                <Button variant="outline" className="text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-white text-sm sm:text-base">
                  View Details
                </Button>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-sm sm:text-base">
                  Solve Problem
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Featured Courses */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mb-12 sm:mb-16"
        >
          <div className="flex justify-between items-center mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-blue-100">Featured Courses</h2>
            <Link href="/courses" className="text-blue-400 hover:text-blue-300 text-xs sm:text-sm">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {featuredCourses.map((course, index) => (
              <motion.div
                key={course.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className="relative bg-slate-900/50 backdrop-blur-sm p-4 sm:p-6 rounded-xl border border-slate-800/50 hover:border-blue-500/50 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <div className="absolute top-0 left-0 w-16 sm:w-24 h-16 sm:h-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-xl" />
                <div className="relative z-10">
                  <div className="text-2xl sm:text-3xl mb-3 sm:mb-4">{course.icon}</div>
                  <h3 className="text-base sm:text-lg font-medium text-blue-200">{course.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-2">{course.desc}</p>
                  <Button className={`${course.color} hover:opacity-90 mt-3 sm:mt-4 text-white text-xs sm:text-sm py-1 px-3 sm:py-2 sm:px-4`}>
                    Start Course
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <h2 className="text-xl sm:text-2xl font-bold text-blue-100 mb-6 sm:mb-8 text-center">Recent Activity</h2>
          <div className="space-y-3 sm:space-y-4 w-91/100 mx-auto">
            {recentActivity.map((activity, index) => (
              <motion.div
                key={activity.text}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className="flex items-center bg-slate-900/50 backdrop-blur-sm p-3 sm:p-4 rounded-xl border border-slate-800/50"
              >
                <span className={`text-lg sm:text-xl ${activity.color} mr-3 sm:mr-4`}>•</span>
                <div>
                  <p className="text-sm sm:text-base text-slate-300">
                    {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)} "{activity.text}"
                  </p>
                  <p className="text-xs sm:text-sm text-slate-500">{activity.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}