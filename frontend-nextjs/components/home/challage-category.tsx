"use client"

import { motion } from "framer-motion";
import { Code, Layout, Smartphone, Palette } from "lucide-react";

export default function ChallengeCategory() {
    const categories = [
        {
            icon: <Code className="h-6 w-6" />,
            title: "JavaScript",
            description: "Master JavaScript fundamentals and advanced concepts",
            count: "12 Challenges"
        },
        {
            icon: <Layout className="h-6 w-6" />,
            title: "Layouts",
            description: "Build responsive layouts and complex UI structures",
            count: "8 Challenges"
        },
        {
            icon: <Smartphone className="h-6 w-6" />,
            title: "Mobile First",
            description: "Create mobile-friendly interfaces and components",
            count: "6 Challenges"
        },
        {
            icon: <Palette className="h-6 w-6" />,
            title: "Design Systems",
            description: "Implement design systems and component libraries",
            count: "4 Challenges"
        }
    ];

    return <section className="py-20">
        <div className="container mx-auto px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-3xl mx-auto text-center mb-16"
            >
                <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-200 to-blue-400 bg-clip-text text-transparent">
                    Challenge Categories
                </h2>
                <p className="text-xl text-slate-300">
                    Explore our diverse range of frontend development challenges
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {categories.map((category, index) => (
                    <motion.div
                        key={category.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="p-6 rounded-xl border border-blue-800/50"
                    >
                        <div className="text-blue-400 mb-4">
                            {category.icon}
                        </div>
                        <h3 className="text-xl font-semibold text-blue-100 mb-2">
                            {category.title}
                        </h3>
                        <p className="text-slate-300 mb-4">
                            {category.description}
                        </p>
                        <div className="text-sm text-blue-400">
                            {category.count}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>;
}
