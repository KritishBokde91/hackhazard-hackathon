"use client";

import { motion } from "framer-motion";
import { ArrowRight, Lock, Mail, Chrome } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';


export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validateEmail = (email: string) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;
    const newErrors = { email: "", password: "" };

    if (!email) {
      newErrors.email = "Please enter your email";
      valid = false;
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email";
      valid = false;
    }

    if (!password) {
      newErrors.password = "Please enter your password";
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    }
  };

  const handleForgotPassword = () => {
    if (!email) {
      setErrors({ ...errors, email: "Please enter your email" });
      return;
    }
    if (!validateEmail(email)) {
      setErrors({ ...errors, email: "Please enter a valid email" });
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert("Password reset email sent");
    }, 1500);
  };

  const handleGoogleSignIn = () => {
    window.location.href = "https://hack-back.artizote.com/api/v1/login/google?redirect=http://127.0.0.1:3000/dashboard";
  };

  useEffect(() => {
    const checkAuth = () => {
      if (document.cookie.includes('access_token')) {
        const redirectPath = '/dashboard';
        router.push(redirectPath);
        localStorage.removeItem('preAuthPath');
      }
    };
    checkAuth();
    const interval = setInterval(checkAuth, 1000);
    return () => clearInterval(interval);
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950/90 to-slate-900/95">
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
                  <ArrowRight
                    size={40}
                    className="text-blue-300 rotate-45"
                  />
                </div>
                <h2 className="text-2xl font-bold text-blue-100 mb-2">
                  Sign in with email
                </h2>
                <p className="text-slate-400">
                  Master frontend development through real challenges and get
                  instant AI feedback.
                </p>
              </motion.div>

              <form onSubmit={handleSubmit}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="mb-4"
                >
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail size={18} className="text-slate-500" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      className={`w-full pl-10 pr-4 py-3 bg-slate-800/50 border ${errors.email
                        ? "border-red-500/50"
                        : "border-slate-700/50"
                        } rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 transition-all`}
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="mb-2"
                >
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock size={18} className="text-slate-500" />
                    </div>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      className={`w-full pl-10 pr-4 py-3 bg-slate-800/50 border ${errors.password
                        ? "border-red-500/50"
                        : "border-slate-700/50"
                        } rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 transition-all`}
                    />
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-400">
                      {errors.password}
                    </p>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="mb-6 text-right"
                >
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Forgot password?
                  </button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="mb-6"
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
                  className="flex items-center mb-6"
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
                    onClick={handleGoogleSignIn}
                  >
                    {/* <Link href='/dashboard'>
                      <div className="flex items-center justify-center">
                        <Chrome size={20} className="mr-3" />
                          Sign in with Google
                      </div>
                    </Link> */}
                    <div className="flex items-center justify-center">
                      <Chrome size={20} className="mr-3" />
                      Sign in with Google
                    </div>
                  </Button>
                </motion.div>
              </form>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="mt-8 text-center text-slate-500 text-sm"
              >
                Don't have an account?{" "}
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
