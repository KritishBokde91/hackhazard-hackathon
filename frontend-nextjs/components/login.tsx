"use client";

import { motion } from "framer-motion";
import { ArrowRight, Lock, Mail, Chrome } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from "@/hooks/stores/use-auth";

const formSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    }),
});

export default function LoginComp() {
    const { user, login } = useAuth()
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const searchParams = useSearchParams();
    const next = searchParams.get('next') || '/dashboard';
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 1500);
    }

    if (user) {
        router.push(next || '/');
    }
    return (
        <div className="min-h-screen ">
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top-left,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
                <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
            </div>
            <div className="absolute inset-0 bg-blue-950/40 z-0"></div>

            <div className="container mx-auto px-4 relative z-10 py-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-md mx-auto"
                >
                    <div className="bg-slate-900/70 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-800/50">
                        <div className="p-8">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.6 }}
                                className="text-center mb-8"
                            >
                                <div className="flex justify-center mb-4">
                                    <ArrowRight size={40} className="text-blue-300 rotate-45" />
                                </div>
                                <h2 className="text-2xl font-bold text-blue-100 mb-2">
                                    Sign in with email
                                </h2>
                                <p className="text-slate-400">
                                    Master frontend development through real challenges and get
                                    instant AI feedback.
                                </p>
                            </motion.div>

                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3, duration: 0.5 }}
                                    >
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <div className="relative">
                                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                                <Mail size={18} className="text-slate-500" />
                                                            </div>
                                                            <Input
                                                                placeholder="Email"
                                                                className="w-full pl-10 pr-4 py-5 bg-slate-800/50 border border-slate-700/50 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 transition-all"
                                                                {...field}
                                                            />
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage className="text-red-400" />
                                                </FormItem>
                                            )}
                                        />
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4, duration: 0.5 }}
                                    >
                                        <FormField
                                            control={form.control}
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <div className="relative">
                                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                                <Lock size={18} className="text-slate-500" />
                                                            </div>
                                                            <Input
                                                                type="password"
                                                                placeholder="Password"
                                                                className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 transition-all"
                                                                {...field}
                                                            />
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage className="text-red-400" />
                                                </FormItem>
                                            )}
                                        />
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5, duration: 0.5 }}
                                        className="text-right"
                                    >
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const email = form.getValues("email");
                                                if (!email) {
                                                    form.setError("email", { message: "Please enter your email" });
                                                    return;
                                                }
                                                alert("Password reset email sent");
                                            }}
                                            className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                                        >
                                            Forgot password?
                                        </button>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.6, duration: 0.5 }}
                                    >
                                        <Button
                                            type="submit"
                                            className="w-full py-6 bg-blue-700 hover:bg-blue-800 text-lg"
                                            disabled={isLoading}
                                        >
                                            {isLoading ? (
                                                <div className="flex items-center">
                                                    <svg
                                                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <circle
                                                            className="opacity-25"
                                                            cx="12"
                                                            cy="12"
                                                            r="10"
                                                            stroke="currentColor"
                                                            strokeWidth="4"
                                                        ></circle>
                                                        <path
                                                            className="opacity-75"
                                                            fill="currentColor"
                                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                        ></path>
                                                    </svg>
                                                    Signing in...
                                                </div>
                                            ) : (
                                                "Get Started"
                                            )}
                                        </Button>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.7, duration: 0.5 }}
                                        className="flex items-center"
                                    >
                                        <div className="flex-1 border-t border-slate-700/50"></div>
                                        <span className="px-4 text-slate-500 text-sm">or</span>
                                        <div className="flex-1 border-t border-slate-700/50"></div>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.8, duration: 0.5 }}
                                    >
                                        <Button
                                            type="button"
                                            className="w-full py-6 bg-slate-800 hover:bg-slate-700/70 text-lg border border-slate-700/50"
                                            disabled={isLoading}
                                            onClick={login.bind(null, next || "/")}
                                        >
                                            <div className="flex items-center justify-center">
                                                <Chrome size={20} className="mr-3" />
                                                Sign in with Google
                                            </div>
                                        </Button>
                                    </motion.div>
                                </form>
                            </Form>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.9, duration: 0.5 }}
                                className="mt-8 text-center text-slate-500 text-sm"
                            >
                                Don&apos;t have an account?{" "}
                                <Link
                                    href="#"
                                    className="text-blue-400 hover:text-blue-300 transition-colors"
                                >
                                    Sign up
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}