"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Star, Code, Brain, Terminal, Search } from "lucide-react";
import { useQuestion } from "@/hooks/stores/use-question";

export default function ProblemBankPage() {
  const [searchQuery, setSearchQuery] = useState("");
const {questions , getQuestions} = useQuestion()
  const challenges = [
    {
      id: 1,
      difficulty: "Easy",
      title: "Responsive Navbar",
      tags: ["HTML", "CSS", "Responsive"],
      xp: 100,
      acceptance: "85%",
    },
    {
      id: 2,
      difficulty: "Medium",
      title: "Animated Login Form",
      tags: ["CSS", "JS", "Animations"],
      xp: 250,
      acceptance: "72%",
    },
    {
      id: 3,
      difficulty: "Hard",
      title: "Drag & Drop UI Builder",
      tags: ["React", "Advanced", "DOM"],
      xp: 500,
      acceptance: "45%",
    },
    {
      id: 4,
      difficulty: "Easy",
      title: "Array Rotation",
      tags: ["Arrays", "Algorithms"],
      xp: 100,
      acceptance: "92%",
    },
    {
      id: 5,
      difficulty: "Medium",
      title: "Binary Tree Traversal",
      tags: ["Trees", "Recursion"],
      xp: 300,
      acceptance: "68%",
    },
    {
      id: 6,
      difficulty: "Hard",
      title: "Dijkstra's Algorithm",
      tags: ["Graphs", "Algorithms", "Optimization"],
      xp: 500,
      acceptance: "52%",
    },
  ];
useEffect(() => {
async function fetchData() {
  await getQuestions(1)  
}  
fetchData()
} , [])

  const truncateTitle = (title: string, maxLength: number = 20) => {
    if (title.length <= maxLength) return title;
    return title.substring(0, maxLength) + "...";
  };
if (!questions) {
  return <div>Loading...</div>;
}
  return (
    <div className="min-h-screen">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-900/30 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10 py-8">
        {/* Search Bar */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" size={20} />
            <input
              type="text"
              placeholder="Search problems..."
              className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-blue-800/50 rounded-lg text-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-blue-50 font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
            Search
          </button>
        </div>

        {/* Problems List */}
        <div className="border border-blue-800/50 rounded-2xl overflow-hidden">
          {/* Problems List */}
          <div className="divide-y divide-blue-800/50">
            {questions?.map((problem, index) => (
              <motion.div
                key={problem.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="grid grid-cols-12 gap-4 p-4 hover:bg-blue-900/30 transition-colors cursor-pointer"
              >
                <div className="col-span-1 hidden sm:block text-blue-300">{problem.id}</div>
                <div className="col-span-12 sm:col-span-4 flex items-center justify-between gap-2">
                  <div className="text-blue-100 font-medium hover:text-blue-400 transition-colors">
                    <span className="hidden sm:inline">{problem.title}</span>
                    <span className="sm:hidden">{truncateTitle(problem.title)}</span>
                  </div>
                  <div className="sm:hidden flex items-center gap-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${problem.difficulty === "easy"
                        ? "bg-green-500/20 text-green-400"
                        : problem.difficulty === "medium"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-red-500/20 text-red-400"
                        }`}
                    >
                      {problem.difficulty}
                    </span>
                    <span className="text-blue-300 whitespace-nowrap">{problem.acceptance}</span>
                  </div>
                </div>
                <div className="col-span-6 sm:col-span-2 hidden sm:block">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${problem.difficulty === "easy"
                      ? "bg-green-500/20 text-green-400"
                      : problem.difficulty === "medium"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-red-500/20 text-red-400"
                      }`}
                  >
                    {problem.difficulty}
                  </span>
                </div>
                <div className="col-span-6 sm:col-span-2 hidden sm:block text-blue-300">{problem.acceptance}</div>
                <div className="hidden sm:block col-span-2">
                  <div className="flex flex-wrap gap-1">
                    {problem.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-blue-900/50 text-blue-300 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="hidden sm:flex col-span-1 items-center gap-1 text-blue-300">
                  <Star size={14} className="text-blue-400" />
                  {100}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
