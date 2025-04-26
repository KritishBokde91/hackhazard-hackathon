"use client"

import { motion } from "framer-motion"
import { Code, Sparkles, Brain, Zap } from "lucide-react"

export default function HowItWorks() {
    const steps = [
        {
            icon: <Code className="h-6 w-6" />,
            title: "Choose a Challenge",
            description: "Select from our library of frontend development challenges"
        },
        {
            icon: <Sparkles className="h-6 w-6" />,
            title: "Build Your Solution",
            description: "Implement the challenge using your preferred tools and frameworks"
        },
        {
            icon: <Brain className="h-6 w-6" />,
            title: "Get AI Feedback",
            description: "Receive instant analysis and suggestions for improvement"
        },
        {
            icon: <Zap className="h-6 w-6" />,
            title: "Level Up",
            description: "Track your progress and unlock new challenges"
        }
    ]

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
                        How It Works
                    </h2>
                    <p className="text-xl text-slate-300">
                        Start improving your frontend skills in just a few simple steps
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="p-6 rounded-xl border border-blue-800/50"
                        >
                            <div className="text-blue-400 mb-4">
                                {step.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-blue-100 mb-2">
                                {step.title}
                            </h3>
                            <p className="text-slate-300">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}