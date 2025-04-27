"use client"
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Code, Brain, Trophy, Sparkles } from "lucide-react";

export default function About() {
    return (
        <div className="min-h-screen text-slate-50">
            <section className="relative pt-32 pb-20 md:py-40 overflow-hidden">
                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-4xl mx-auto text-center mb-12"
                    >
                        <Badge className="mb-4 border-blue-800/50 py-1 px-3">
                            <Sparkles size={14} className="mr-1" /> About Us
                        </Badge>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-200 to-blue-400 bg-clip-text text-transparent">
                            Our Mission
                        </h1>
                        <p className="text-xl text-slate-300 mb-8">
                            At Coding Geeks, we believe that the best way to master frontend development is through hands-on practice and real-world challenges. Our platform is designed to help developers of all levels improve their skills by building actual components and interfaces used in modern web applications. With AI-powered feedback, we provide instant analysis and suggestions, making learning both efficient and effective.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="max-w-4xl mx-auto"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-200 to-blue-400 bg-clip-text text-transparent">
                            What We Offer
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {[
                                {
                                    icon: <Code className="h-6 w-6" />,
                                    title: "Real-World Challenges",
                                    description: "Our library includes a variety of challenges that cover everything from JavaScript fundamentals to complex UI structures. Whether you're a beginner or an experienced developer, there's something for everyone."
                                },
                                {
                                    icon: <Brain className="h-6 w-6" />,
                                    title: "AI-Powered Feedback",
                                    description: "Get instant, detailed feedback on your code. Our AI analyzes your solutions for structure, performance, accessibility, and best practices, helping you improve with every challenge."
                                },
                                {
                                    icon: <Trophy className="h-6 w-6" />,
                                    title: "Flexible Learning",
                                    description: "Use any framework or technology stack you prefer. Our platform supports vanilla HTML/CSS/JS, React, Vue, Angular, Svelte, and more."
                                },
                                {
                                    icon: <Sparkles className="h-6 w-6" />,
                                    title: "Progress Tracking",
                                    description: "Monitor your learning journey with detailed progress metrics and achievements. Complete challenges and add them to your portfolio to showcase your skills."
                                }
                            ].map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className="p-6 rounded-xl border border-blue-800/50"
                                >
                                    <div className="text-blue-400 mb-4">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-semibold text-blue-100 mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-slate-300">
                                        {feature.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
} 