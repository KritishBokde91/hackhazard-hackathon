"use client";

import { motion, } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/hooks/stores/use-auth";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { user, isAuthChecking } = useAuth();
  const router = useRouter();
  const skills = [
    { skill: "HTML/CSS", percent: 75, icon: "🏷️", color: "bg-blue-600" },
    { skill: "JavaScript", percent: 60, icon: "💻", color: "bg-yellow-500" },
    { skill: "React", percent: 45, icon: "⚛️", color: "bg-cyan-500" },
  ];

  const featuredCourses = [
    { title: "Advanced CSS", desc: "Master Flexbox, Grid, and Animations", color: "bg-blue-700", icon: "🎨" },
    { title: "JavaScript 2025", desc: "ES7+ Features & Modern Patterns", color: "bg-yellow-600", icon: "🚀" },
    { title: "React Masterclass", desc: "Hooks, Context, and Performance", color: "bg-cyan-600", icon: "⚛️" },
    { title: "TypeScript Basics", desc: "Static Typing for JavaScript", color: "bg-teal-600", icon: "📘" },
  ];

  const recentActivity = [
    { type: "solved", text: "CSS Grid Layout", time: "2 hours ago", color: "text-green-500" },
    { type: "started", text: "React Hooks course", time: "5 hours ago", color: "text-blue-500" },
    { type: "earned", text: "JavaScript Expert badge", time: "1 day ago", color: "text-yellow-500" },
    { type: "completed", text: "HTML5 Semantics lesson", time: "2 days ago", color: "text-purple-500" },
  ];

  // Add user profile data
  const userProfile = {
    name: "Kritish Bokde",
    role: "Frontend Developer",
    avatar: "/avatars/default.png", // You'll need to add an actual avatar image
    stats: [
      { label: "Completed Courses", value: "12" },
      { label: "Certificates", value: "4" },
      { label: "Points", value: "2.4k" }
    ]
  };
  if (isAuthChecking) {
    return <h1>Loading...</h1>
  }
  else if (!user && !isAuthChecking) {
    router.push('/login?next=/dashboard');
  }
  else if (user) return (
    <div className="min-h-screen overflow-y-auto">
      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Profile and Welcome Section */}
        <div className="border border-blue-800/50 rounded-2xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Profile Section */}
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-blue-700/50">
                  <Image
                    src={user.profile}
                    alt={user.name}
                    width={80}
                    height={80}
                    className="object-cover"
                  />
                </div>
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-blue-500 rounded-full border-2 border-slate-950" />
              </div>

              <div>
                <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-200 to-blue-400 bg-clip-text text-transparent">
                  {user.name}
                </h1>
                <p className="text-slate-300">{userProfile.role}</p>
              </div>
            </div>

            {/* Stats Section */}
            <div className="flex gap-6 ml-0 md:ml-auto">
              {userProfile.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="text-center px-4 border-l border-blue-800/50 first:border-0"
                >
                  <div className="text-xl font-bold text-blue-100">{stat.value}</div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-4 mt-6 pt-6 border-t border-blue-800/50">
            <Button className="bg-blue-700 hover:bg-blue-800 text-blue-50">
              Edit Profile
            </Button>
            <Button variant="outline" className="border-blue-700 text-blue-100 hover:bg-blue-900/50">
              View Certificates
            </Button>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="border border-blue-800/50 rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-bold text-blue-100 mb-4">Learning Progress</h2>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px] rounded-lg p-4">
              <div className="text-sm text-slate-300">Weekly Target</div>
              <div className="text-2xl font-bold text-blue-200 mt-1">4.5/6 hrs</div>
              <div className="w-full bg-slate-800 rounded-full h-2 mt-2">
                <div className="bg-blue-600 h-full rounded-full" style={{ width: '75%' }} />
              </div>
            </div>
            <div className="flex-1 min-w-[200px] rounded-lg p-4">
              <div className="text-sm text-slate-300">Current Streak</div>
              <div className="text-2xl font-bold text-blue-200 mt-1">12 days</div>
              <div className="flex items-center gap-1 mt-2">
                {[...Array(7)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-full ${i < 5 ? 'bg-blue-600' : 'bg-slate-800'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {skills.map((skill) => (
            <motion.div
              key={skill.skill}
              className="border border-blue-800/50 rounded-xl p-6 hover:border-blue-600/50 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center space-x-4">
                <div className="text-3xl">{skill.icon}</div>
                <div>
                  <h3 className="text-lg font-medium text-blue-100">{skill.skill}</h3>
                  <div className="mt-2 w-full bg-slate-800 rounded-full h-2">
                    <motion.div
                      className="bg-blue-700 h-full rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.percent}%` }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Featured Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Problem of the Day */}
          <motion.div
            className="border border-blue-800/50 rounded-2xl p-8"
            whileHover={{ scale: 1.01 }}
          >
            <h2 className="text-2xl font-bold text-blue-100 mb-6">Problem of the Day</h2>
            <div className="space-y-4">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-900/30 text-blue-200 text-sm">
                Easy • HTML/CSS
              </div>
              <h3 className="text-xl font-semibold text-blue-100">Responsive Navbar</h3>
              <p className="text-slate-300">
                Create a responsive navigation bar that collapses into a hamburger menu on mobile devices.
              </p>
              <div className="flex items-center space-x-4 mt-6">
                <Button className="bg-blue-700 hover:bg-blue-800 text-blue-50">
                  Start Challenge
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div className="border border-blue-800/50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-blue-100 mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <motion.div
                  key={activity.text}
                  className="flex items-center space-x-4 p-4 rounded-xl hover:bg-blue-900/50 transition-colors"
                  whileHover={{ x: 8 }}
                >
                  <span className={`text-2xl ${activity.color}`}>•</span>
                  <div>
                    <p className="text-blue-100">
                      {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)} &quot;{activity.text}&quot;
                    </p>
                    <p className="text-sm text-slate-400">{activity.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Featured Courses */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-blue-100">Featured Courses</h2>
            <Link
              href="/courses"
              className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
            >
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCourses.map((course) => (
              <motion.div
                key={course.title}
                className="border border-blue-800/50 rounded-xl p-6 hover:border-blue-600/50 transition-all duration-300"
                whileHover={{ scale: 1.03, y: -5 }}
              >
                <div className="text-3xl mb-4">{course.icon}</div>
                <h3 className="text-lg font-medium text-blue-100 mb-2">{course.title}</h3>
                <p className="text-slate-300 text-sm mb-4">{course.desc}</p>
                <Button className="w-full bg-blue-700 hover:bg-blue-800 text-blue-50">
                  Start Learning
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}