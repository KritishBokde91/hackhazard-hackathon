"use client"

import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Code } from "lucide-react";
import { motion } from "framer-motion";

export default function ChallageCategory() {
    return <section className="relative py-20 bg-gradient-to-tr from-slate-950/90 via-blue-950/90 to-slate-900/95">
        <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top-right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
            <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        </div>
        <div className="container mx-auto px-4">
            <div className="text-center mb-12">
                <Badge className="mb-4 bg-blue-900/30 text-blue-200 border-blue-800/50 py-1 px-3">
                    <Code size={14} className="mr-1" /> Challenges
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-200 to-blue-400 bg-clip-text text-transparent">
                    Frontend Challenges For Every Skill Level
                </h2>
                <p className="text-slate-300 max-w-2xl mx-auto">
                    From basic components to complex applications, find the perfect challenge to level up your skills.
                </p>
            </div>

            <Tabs defaultValue="components" className="max-w-4xl mx-auto">
                <TabsList className="grid grid-cols-3 mb-8 bg-slate-900/80 border border-blue-800/50">
                    <TabsTrigger
                        value="components"
                        className="text-blue-100 data-[state=active]:bg-blue-900/50 data-[state=active]:text-blue-50"
                    >
                        Components
                    </TabsTrigger>
                    <TabsTrigger
                        value="layouts"
                        className="text-blue-100 data-[state=active]:bg-blue-900/50 data-[state=active]:text-blue-50"
                    >
                        Layouts
                    </TabsTrigger>
                    <TabsTrigger
                        value="applications"
                        className="text-blue-100 data-[state=active]:bg-blue-900/50 data-[state=active]:text-blue-50"
                    >
                        Applications
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="components" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            {
                                title: "Responsive Navigation",
                                difficulty: "Beginner",
                                attempts: "2.4k",
                                completion: "87%"
                            },
                            {
                                title: "Interactive Card Component",
                                difficulty: "Intermediate",
                                attempts: "1.8k",
                                completion: "64%"
                            },
                            {
                                title: "Multi-step Form",
                                difficulty: "Intermediate",
                                attempts: "1.2k",
                                completion: "51%"
                            },
                            {
                                title: "Animated Dropdown Menu",
                                difficulty: "Advanced",
                                attempts: "950",
                                completion: "42%"
                            }
                        ].map((challenge, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Card className="bg-slate-900/80 border-blue-800/50 hover:border-blue-600/50 hover:bg-slate-900/90 transition-all duration-300">
                                    <CardHeader className="pb-2">
                                        <div className="flex justify-between items-start">
                                            <CardTitle className="text-lg text-blue-100">{challenge.title}</CardTitle>
                                            <Badge className={`
                        ${challenge.difficulty === "Beginner" ? "bg-green-900/20 text-green-400" :
                                                    challenge.difficulty === "Intermediate" ? "bg-yellow-900/20 text-yellow-400" :
                                                        "bg-red-900/20 text-red-400"}
                      `}>
                                                {challenge.difficulty}
                                            </Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="pt-2">
                                        <div className="flex justify-between text-sm text-slate-400">
                                            <span>{challenge.attempts} attempts</span>
                                            <span>{challenge.completion} completion rate</span>
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button className="w-full bg-blue-700 hover:bg-blue-800 text-blue-50">
                                            Start Challenge
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                    <div className="text-center mt-8">
                        <Button variant="outline" className="border-blue-700 text-blue-100 hover:bg-blue-900/50">
                            View All Component Challenges <ArrowRight size={16} className="ml-2" />
                        </Button>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    </section>;
}
