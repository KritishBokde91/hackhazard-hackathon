"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Star, Code, Brain, Terminal, ChevronRight } from "lucide-react";

export default function ProblemBankPage() {
  const [activeTab, setActiveTab] = useState("frontend");

  const frontendChallenges = [
    {
      difficulty: "Easy",
      title: "Responsive Navbar",
      tags: ["HTML", "CSS", "Responsive"],
      progress: 65,
      xp: 100,
      icon: <Terminal size={20} className="text-green-400" />,
    },
    {
      difficulty: "Medium",
      title: "Animated Login Form",
      tags: ["CSS", "JS", "Animations"],
      progress: 42,
      xp: 250,
      icon: <Code size={20} className="text-yellow-400" />,
    },
    {
      difficulty: "Hard",
      title: "Drag & Drop UI Builder",
      tags: ["React", "Advanced", "DOM"],
      progress: 0,
      xp: 500,
      icon: <Terminal size={20} className="text-red-400" />,
    },
    {
      difficulty: "Medium",
      title: "CSS Art Challenge",
      tags: ["CSS", "Creative", "Design"],
      progress: 0,
      xp: 300,
      icon: <Code size={20} className="text-yellow-400" />,
    },
  ];

  const competitiveChallenges = [
    {
      difficulty: "Easy",
      title: "Array Rotation",
      tags: ["Arrays", "Algorithms"],
      progress: 78,
      xp: 100,
      icon: <Brain size={20} className="text-green-400" />,
    },
    {
      difficulty: "Medium",
      title: "Binary Tree Traversal",
      tags: ["Trees", "Recursion"],
      progress: 45,
      xp: 300,
      icon: <Brain size={20} className="text-yellow-400" />,
    },
    {
      difficulty: "Hard",
      title: "Dijkstra's Algorithm",
      tags: ["Graphs", "Algorithms", "Optimization"],
      progress: 0,
      xp: 500,
      icon: <Brain size={20} className="text-red-400" />,
    },
    {
      difficulty: "Hard",
      title: "Dynamic Programming",
      tags: ["DP", "Optimization", "Advanced"],
      progress: 0,
      xp: 450,
      icon: <Brain size={20} className="text-red-400" />,
    },
  ];

  const challenges = activeTab === "frontend" ? frontendChallenges : competitiveChallenges;

  useEffect(() => {
    const fetchData = async () => {
        try {
            const responst = await fetch('https://hack-back.artizote.com/api/v1/questions?limit=3&page=1');
            if (!responst.ok) {
                throw new Error("Failed to fetch challenges");
            }
            const data = await responst.json();
            console.log("Data: ", data);
        } catch (e) {
            console.log("error: ", e);
        }
    }
    fetchData();
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950/90 to-slate-950 overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-900/30 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <motion.div
          className="absolute top-10 left-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
            x: [0, 20, 0],
            y: [0, -20, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, -30, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, repeatType: "reverse", delay: 2 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/3 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.4, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ duration: 15, repeat: Infinity, repeatType: "reverse", delay: 5 }}
        />
      </div>
      <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm z-0"></div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10 py-8 sm:py-12">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-blue-300 to-purple-400">
            Problem Bank
          </h1>
          <p className="text-slate-400 mt-3 text-sm sm:text-base max-w-2xl mx-auto">
            Challenge yourself with our curated collection of problems. Track your progress and earn XP.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center space-x-3 sm:space-x-6 mb-10 sm:mb-12"
        >
          <button
            onClick={() => setActiveTab("frontend")}
            className={`px-4 sm:px-8 py-2 sm:py-3 rounded-full text-sm sm:text-lg font-semibold transition-all duration-300 ${
              activeTab === "frontend"
                ? "bg-gradient-to-r from-teal-500 to-teal-400 text-slate-900 shadow-lg shadow-teal-500/20"
                : "bg-slate-800/70 text-slate-400 hover:bg-slate-700/80 hover:text-slate-300"
            }`}
          >
            <span className="flex items-center">
              <Code size={18} className="mr-2 hidden sm:inline" />
              Frontend
            </span>
          </button>
          <button
            onClick={() => setActiveTab("competitive")}
            className={`px-4 sm:px-8 py-2 sm:py-3 rounded-full text-sm sm:text-lg font-semibold transition-all duration-300 ${
              activeTab === "competitive"
                ? "bg-gradient-to-r from-teal-500 to-teal-400 text-slate-900 shadow-lg shadow-teal-500/20"
                : "bg-slate-800/70 text-slate-400 hover:bg-slate-700/80 hover:text-slate-300"
            }`}
          >
            <span className="flex items-center">
              <Brain size={18} className="mr-2 hidden sm:inline" />
              Competitive
            </span>
          </button>
        </motion.div>

        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-8 sm:mb-10"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-100">
            {activeTab === "frontend" ? "Frontend Challenges" : "Competitive Programming"}
          </h2>
          <p className="text-slate-400 mt-2 text-sm sm:text-base">
            {activeTab === "frontend"
              ? "Master HTML, CSS & JavaScript with these practical challenges"
              : "Sharpen your problem-solving skills with algorithmic challenges"}
          </p>
        </motion.div>

        {/* Challenges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 w-full sm:w-11/12 md:w-10/12 mx-auto">
          {challenges.map((challenge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
              className="bg-gradient-to-br from-slate-900/80 to-slate-800/50 backdrop-blur-sm rounded-xl p-5 sm:p-6 border border-slate-700/30 hover:border-teal-500/30 shadow-lg shadow-slate-900/50 transition-all duration-300"
            >
              {/* Card Glow Effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-teal-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Content */}
              <div className="relative z-10">
                {/* Header with Difficulty and XP */}
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    {challenge.icon}
                    <span
                      className={`ml-2 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${
                        challenge.difficulty === "Easy"
                          ? "bg-green-500/20 text-green-400"
                          : challenge.difficulty === "Medium"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {challenge.difficulty}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 bg-slate-800/70 px-2 py-1 rounded-full">
                    <Star size={14} className="text-yellow-400" />
                    <span className="text-slate-200 text-xs sm:text-sm">{challenge.xp} XP</span>
                  </div>
                </div>

                {/* Challenge Title */}
                <h3 className="text-lg sm:text-xl font-semibold text-blue-100 mb-3">{challenge.title}</h3>

                {/* Tags */}
                {challenge.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {challenge.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-slate-800/80 text-slate-400 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Progress Bar */}
                <div className="mb-5">
                  {challenge.progress > 0 ? (
                    <>
                      <div className="w-full bg-slate-800/70 rounded-full h-2 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${challenge.progress}%` }}
                          transition={{ duration: 1, delay: 0.5 + index * 0.1, ease: "easeOut" }}
                          className={`h-2 rounded-full ${
                            challenge.progress < 50 ? "bg-teal-500" : "bg-gradient-to-r from-teal-500 to-teal-300"
                          }`}
                        ></motion.div>
                      </div>
                      <p className="text-slate-400 text-xs sm:text-sm mt-1">
                        {challenge.progress}% completed
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="w-full bg-slate-800/70 rounded-full h-2"></div>
                      <p className="text-slate-500 text-xs sm:text-sm mt-1">Not started yet</p>
                    </>
                  )}
                </div>

                {/* Solve Challenge Button */}
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-2 sm:py-3 bg-gradient-to-r from-teal-500 to-teal-400 text-slate-900 font-semibold rounded-full hover:shadow-lg hover:shadow-teal-500/20 transition-all duration-300 flex items-center justify-center"
                >
                  <span>Solve Challenge</span>
                  <ChevronRight size={16} className="ml-1" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}