"use client"
import { Badge } from "../ui/badge"
import { ArrowRight } from "lucide-react"
import { motion } from "motion/react"
import { Button } from "../ui/button"
import { Code, Brain, Trophy, Sparkles } from "lucide-react"
import Image from "next/image"
export const CTA = () => {
    return (
        <section className="relative py-20 ">
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top-right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
                <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
            </div>
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="text-center mb-12">
                        <Badge className="mb-6 bg-blue-900/30 text-blue-200 border-blue-800/50 py-1 px-3">
                            <Sparkles size={14} className="mr-1" /> Join Our Community
                        </Badge>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-200 to-blue-400 bg-clip-text text-transparent">
                            Ready to Level Up Your Frontend Skills?
                        </h2>
                        <p className="text-xl text-slate-300 mb-8 leading-relaxed max-w-2xl mx-auto">
                            Join thousands of developers who are building better UIs through hands-on practice and AI-powered feedback.
                        </p>

                        {/* Feature List */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 text-left">
                            {[
                                {
                                    icon: <Code className="w-5 h-5" />,
                                    title: "Real-World Challenges",
                                    description: "Practice with industry-standard scenarios"
                                },
                                {
                                    icon: <Brain className="w-5 h-5" />,
                                    title: "AI-Powered Feedback",
                                    description: "Get instant, detailed code reviews"
                                },
                                {
                                    icon: <Trophy className="w-5 h-5" />,
                                    title: "Skill Tracking",
                                    description: "Monitor your progress and growth"
                                }
                            ].map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.2 }}
                                    viewport={{ once: true }}
                                    className="flex items-start space-x-3 bg-slate-900/50 p-4 rounded-xl border border-blue-800/30 hover:border-blue-600/50 transition-all duration-300"
                                >
                                    <div className="p-2 rounded-lg bg-blue-900/30 text-blue-200">
                                        {feature.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-blue-100 font-medium mb-1">
                                            {feature.title}
                                        </h3>
                                        <p className="text-slate-400 text-sm">
                                            {feature.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Button className="bg-blue-700 hover:bg-blue-800 text-blue-50 text-lg px-8 py-6 shadow-lg shadow-blue-900/30 hover:shadow-blue-900/50 transition-all duration-300 group">
                                Start Your First Challenge
                                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                            </Button>
                            <span className="text-slate-400">or</span>
                            <Button variant="outline" className="border-blue-700 text-blue-100 hover:bg-blue-900/50 text-lg px-8 py-6">
                                View Challenge Library
                            </Button>
                        </div>

                        {/* Social Proof */}
                        <div className="mt-12 pt-12 border-t border-blue-800/30">
                            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                                <div className="flex -space-x-4">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="w-10 h-10 rounded-full border-2 border-blue-800 overflow-hidden">
                                            <Image
                                                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=user${i}`}
                                                alt={`User ${i}`}
                                                className="w-full h-full object-cover"
                                                width={40}
                                                height={40}
                                            />
                                        </div>
                                    ))}
                                    <div className="w-10 h-10 rounded-full bg-blue-900/50 border-2 border-blue-800 flex items-center justify-center text-blue-200 text-sm">
                                        +2k
                                    </div>
                                </div>
                                <div className="text-center md:text-left">
                                    <div className="text-blue-100 font-medium">Joined by 2,000+ developers</div>
                                    <div className="text-slate-400 text-sm">From 100+ countries worldwide</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}