"use client"
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function Contact() {
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
                            <Sparkles size={14} className="mr-1" /> Contact Us
                        </Badge>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-200 to-blue-400 bg-clip-text text-transparent">
                            Get In Touch
                        </h1>
                        <p className="text-xl text-slate-300 mb-8">
                            Have questions or feedback? We&apos;d love to hear from you. Reach out to us through the form below or connect with us on social media.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="max-w-4xl mx-auto"
                    >
                        <form className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-slate-300">Name</label>
                                <input type="text" id="name" name="name" className="mt-1 block w-full px-3 py-2 bg-slate-900/80 border border-blue-800/50 rounded-md text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-slate-300">Email</label>
                                <input type="email" id="email" name="email" className="mt-1 block w-full px-3 py-2 bg-slate-900/80 border border-blue-800/50 rounded-md text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-slate-300">Message</label>
                                <textarea id="message" name="message" rows={4} className="mt-1 block w-full px-3 py-2 bg-slate-900/80 border border-blue-800/50 rounded-md text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"></textarea>
                            </div>
                            <div>
                                <button type="submit" className="w-full bg-blue-700 hover:bg-blue-800 text-blue-50 px-4 py-2 rounded-md shadow-lg shadow-blue-900/30 hover:shadow-blue-900/50 transition-all duration-300">
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </section>
        </div>
    );
} 