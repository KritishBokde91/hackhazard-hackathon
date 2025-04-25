"use client"
import { Badge } from "../ui/badge"
import { ArrowRight } from "lucide-react"
import { motion } from "motion/react"
import { Button } from "../ui/button"
import { Code, Brain, Trophy, Sparkles, CheckCircle } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form"
import { Input } from "../ui/input"

const formSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
})

export const Newsletter = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    return (
        <section className="relative py-20 bg-gradient-to-br from-slate-900/95 via-blue-950/90 to-slate-950">
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top-left,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
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
                    <div className="bg-gradient-to-r from-slate-900/80 to-blue-950/80 rounded-2xl p-8 md:p-12 border border-blue-800/50 backdrop-blur-sm">
                        <div className="text-center mb-8">
                            <Badge className="mb-4 bg-blue-900/30 text-blue-200 border-blue-800/50 py-1 px-3">
                                <Sparkles size={14} className="mr-1" /> Newsletter
                            </Badge>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-200 to-blue-400 bg-clip-text text-transparent">
                                Stay Updated
                            </h2>
                            <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
                                Get the latest challenges and frontend development tips delivered to your inbox.
                                Join our newsletter and level up your coding skills.
                            </p>

                            {/* Newsletter Features */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                {[
                                    {
                                        icon: <Code className="w-5 h-5" />,
                                        text: "Weekly coding challenges"
                                    },
                                    {
                                        icon: <Brain className="w-5 h-5" />,
                                        text: "Pro tips & best practices"
                                    },
                                    {
                                        icon: <Trophy className="w-5 h-5" />,
                                        text: "Early access to new features"
                                    }
                                ].map((feature, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.2 }}
                                        viewport={{ once: true }}
                                        className="flex items-center justify-center space-x-2 text-slate-300"
                                    >
                                        <div className="p-1.5 rounded-lg bg-blue-900/30 text-blue-200">
                                            {feature.icon}
                                        </div>
                                        <span className="text-sm">{feature.text}</span>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Email Input */}
                            <div className="max-w-xl mx-auto">
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-4">
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem className="flex-1">
                                                    <FormControl>
                                                        <div className="relative group">
                                                            <Input
                                                                placeholder="Enter your email address"
                                                                className="w-full px-4 py-3 bg-slate-900/80 border border-blue-800/50 rounded-lg 
                                focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent 
                                text-slate-100 placeholder:text-slate-500
                                group-hover:border-blue-600/50 transition-all duration-300"
                                                                {...field}
                                                            />
                                                            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-600/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur"></div>
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage className="text-red-400" />
                                                </FormItem>
                                            )}
                                        />
                                        <Button
                                            type="submit"
                                            className="bg-blue-700 hover:bg-blue-800 text-blue-50 px-8 py-3 shadow-lg shadow-blue-900/30 hover:shadow-blue-900/50 transition-all duration-300 group"
                                        >
                                            Subscribe
                                            <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                                        </Button>
                                    </form>
                                </Form>
                            </div>

                            {/* Trust Badges */}
                            <div className="flex items-center justify-center space-x-6 mt-6">
                                <div className="flex items-center space-x-2 text-slate-400 text-sm">
                                    <CheckCircle size={14} className="text-blue-400" />
                                    <span>No spam</span>
                                </div>
                                <div className="flex items-center space-x-2 text-slate-400 text-sm">
                                    <CheckCircle size={14} className="text-blue-400" />
                                    <span>Unsubscribe anytime</span>
                                </div>
                                <div className="flex items-center space-x-2 text-slate-400 text-sm">
                                    <CheckCircle size={14} className="text-blue-400" />
                                    <span>Weekly digest</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}