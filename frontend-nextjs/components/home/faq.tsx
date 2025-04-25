"use client"
import { Brain, Code, Trophy, CheckCircle, Sparkles } from "lucide-react"
import { Badge } from "../ui/badge"
import { Card, CardHeader, CardTitle, CardDescription } from "../ui/card"
import { motion } from "motion/react"
import { Button } from "../ui/button"

export const FAQ = () => {
    return (
        <section className="relative py-20 bg-gradient-to-tr from-slate-950/90 via-blue-950/85 to-slate-900/95">
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom-left,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
                <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-12">
                    <Badge className="mb-4 bg-blue-900/30 text-blue-200 border-blue-800/50 py-1 px-3">
                        <Brain size={14} className="mr-1" /> FAQ
                    </Badge>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-200 to-blue-400 bg-clip-text text-transparent">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                        Everything you need to know about our platform and how it works.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto space-y-3">
                    {[
                        {
                            question: "How does the AI feedback actually work?",
                            answer: "Our AI analyzes your code for structure, performance, accessibility, best practices, and visual accuracy. It compares your solution against multiple correct approaches rather than expecting an exact match, providing specific, actionable feedback on how to improve.",
                            icon: <Brain className="w-5 h-5" />
                        },
                        {
                            question: "Do I need to use a specific framework?",
                            answer: "Not at all! You can solve challenges using vanilla HTML/CSS/JS or any framework you prefer (React, Vue, Angular, Svelte, etc.). Our AI can provide feedback regardless of your technology stack.",
                            icon: <Code className="w-5 h-5" />
                        },
                        {
                            question: "Is this suitable for complete beginners?",
                            answer: "Yes! We have challenges designed specifically for beginners, with more detailed guidance and simpler requirements. As you progress, you can tackle more complex challenges.",
                            icon: <Trophy className="w-5 h-5" />
                        },
                        {
                            question: "Can I use the projects in my portfolio?",
                            answer: "Absolutely! All completed challenges can be added to your portfolio. Pro members can also generate certificates of completion for each challenge.",
                            icon: <CheckCircle className="w-5 h-5" />
                        },
                        {
                            question: "How often are new challenges added?",
                            answer: "We add new challenges weekly, focusing on modern design patterns and UIs. Pro members get early access to new challenges.",
                            icon: <Sparkles className="w-5 h-5" />
                        }
                    ].map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <Card className="bg-slate-900/80 border-blue-800/50 hover:border-blue-600/50 transition-all duration-300">
                                <CardHeader className="p-4 sm:p-6">
                                    <div className="flex gap-4">
                                        <div className="p-2 rounded-lg bg-blue-900/30 text-blue-200 h-fit">
                                            {faq.icon}
                                        </div>
                                        <div>
                                            <CardTitle className="text-lg text-blue-100 mb-2">
                                                {faq.question}
                                            </CardTitle>
                                            <CardDescription className="text-slate-300 text-base">
                                                {faq.answer}
                                            </CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Support CTA */}
                <div className="mt-8 text-center">
                    <div className="inline-flex items-center space-x-2 text-slate-300 text-sm">
                        <span>Still have questions?</span>
                        <Button variant="link" className="text-blue-400 hover:text-blue-300 p-0">
                            Contact Support
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}