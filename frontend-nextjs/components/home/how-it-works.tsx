"use client"
import { ArrowRight } from "lucide-react"

import { Brain, Code, Trophy } from "lucide-react"
import { Badge } from "../ui/badge"
import { motion } from "motion/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"

export const HowItWorks = () => {
    return (<section className="relative py-20 bg-gradient-to-tl from-slate-900/95 via-blue-950/85 to-slate-950/90">
        <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom-left,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
            <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        </div>
        <div className="container mx-auto px-4">
            <div className="text-center mb-16">
                <Badge className="mb-4 bg-blue-900/30 text-blue-200 border-blue-800/50 py-1 px-3">
                    <Brain size={14} className="mr-1" /> Simple Process
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-200 to-blue-400 bg-clip-text text-transparent">
                    How CodeFront Works
                </h2>
                <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                    A streamlined process to help you learn by doing and receive expert-level feedback on your code.
                </p>
            </div>

            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                    {[
                        {
                            step: "1",
                            title: "Choose a Challenge",
                            description: "Select from hundreds of real-world UI challenges across difficulty levels.",
                            icon: <Trophy className="w-6 h-6 text-blue-200" />
                        },
                        {
                            step: "2",
                            title: "Code Your Solution",
                            description: "Use our built-in code editor or your own development environment to build the UI.",
                            icon: <Code className="w-6 h-6 text-blue-200" />
                        },
                        {
                            step: "3",
                            title: "Get AI Feedback",
                            description: "Submit your solution for instant AI analysis and suggestions for improvement.",
                            icon: <Brain className="w-6 h-6 text-blue-200" />
                        }
                    ].map((item, index) => (
                        <div key={index} className="relative">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                                viewport={{ once: true }}
                                className="relative group"
                            >
                                {/* Step Number */}
                                <div className="absolute -left-4 -top-4 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-xl font-bold text-blue-50 shadow-lg shadow-blue-900/50 group-hover:scale-110 transform transition-transform duration-300 z-20">
                                    {item.step}
                                </div>

                                {/* Card */}
                                <Card className="bg-slate-900/80 border-blue-800/50 h-full pt-4 backdrop-blur-sm group-hover:border-blue-600/50 group-hover:bg-slate-900/90 transition-all duration-300 relative z-10">
                                    <CardHeader>
                                        <div className="flex items-center space-x-3 mb-2">
                                            <div className="p-2 bg-blue-900/30 rounded-lg group-hover:bg-blue-900/50 transition-colors duration-300">
                                                {item.icon}
                                            </div>
                                            <CardTitle className="text-blue-100 text-xl">{item.title}</CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription className="text-slate-300 text-base leading-relaxed">
                                            {item.description}
                                        </CardDescription>
                                    </CardContent>
                                </Card>
                            </motion.div>

                            {/* Connector Arrow */}
                            {index < 2 && (
                                <div className="hidden md:block absolute top-1/2 -right-12 transform -translate-y-1/2 z-30">
                                    <div className="relative w-16">
                                        <motion.div
                                            animate={{ x: [0, 10, 0] }}
                                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                        >
                                            <ArrowRight className="text-blue-400 w-8 h-8" />
                                        </motion.div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}

                    {/* Background Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-transparent to-blue-600/5 rounded-3xl blur-3xl -z-10" />
                </div>
            </div>
        </div>
    </section>
    )
}