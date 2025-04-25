"use client"
import { Trophy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Code, Brain } from "lucide-react";

export const Features = () =>  {
    return (
        <section className="relative py-20 bg-gradient-to-bl from-blue-950/80 via-slate-900/95 to-slate-950/90">
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom-right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
                <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
            </div>
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <Badge className="mb-4 bg-blue-900/30 text-blue-200 border-blue-800/50 py-1 px-3">
                        <Trophy size={14} className="mr-1" /> Why Choose Us
                    </Badge>
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-200 to-blue-400 bg-clip-text text-transparent">
                        Why Frontend Developers Love Us
                    </h2>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                        Challenge yourself with real-world UI problems and get AI-powered feedback to accelerate your growth.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: <Code className="text-blue-200" />,
                            title: "Realistic Challenges",
                            description: "Build real-world components and layouts that mirror professional frontend work."
                        },
                        {
                            icon: <Brain className="text-blue-200" />,
                            title: "AI-Powered Feedback",
                            description: "Get instant, detailed analysis of your code with suggestions for improvement."
                        },
                        {
                            icon: <Trophy className="text-blue-200" />,
                            title: "Skill Progression",
                            description: "Progress from beginner to advanced with challenges that grow with your skills."
                        }
                    ].map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            viewport={{ once: true }}
                        >
                            <Card className="bg-slate-900/80 border-blue-800/50 overflow-hidden hover:border-blue-600/50 hover:bg-slate-900/90 transition-all duration-300 group">
                                <CardHeader>
                                    <div className="bg-blue-900/30 rounded-full w-12 h-12 flex items-center justify-center mb-4 group-hover:bg-blue-900/50 transition-colors duration-300">
                                        {feature.icon}
                                    </div>
                                    <CardTitle className="text-blue-100">{feature.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-slate-300">
                                        {feature.description}
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

