"use client"

import { motion } from "framer-motion";
import { Code, Sparkles, Brain, Zap } from "lucide-react";

export default function Features() {
    const features = [
        {
            icon: <Code className="h-6 w-6" />,
            title: "Real-world Challenges",
            description: "Build actual components and interfaces used in modern web applications."
        },
        {
            icon: <Sparkles className="h-6 w-6" />,
            title: "Instant Feedback",
            description: "Get AI-powered analysis of your code as soon as you submit your solution."
        },
        {
            icon: <Brain className="h-6 w-6" />,
            title: "Learn by Doing",
            description: "Master frontend development through hands-on practice and real projects."
        },
        {
            icon: <Zap className="h-6 w-6" />,
            title: "Progress Tracking",
            description: "Track your learning journey with detailed progress metrics and achievements."
        }
    ];

    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-3xl mx-auto text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-200 to-blue-400 bg-clip-text text-transparent">
                        Why Choose Our Platform
                    </h2>
                    <p className="text-xl text-slate-300">
                        Learn frontend development the right way with our comprehensive platform
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
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
            </div>
        </section>
    );
}

