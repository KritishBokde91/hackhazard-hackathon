"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "motion/react";
import { Sparkles, Brain, ArrowRight } from "lucide-react";
import { CodeEditor } from "@/components/ui/code-editor";
import Link from "next/link";

export default function Intro() {
  const navbarCode = `function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <nav className="bg-blue-900 text-blue-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center py-4">
            <h1 className="text-xl font-bold">
              BrandName
            </h1>
          </div>
          
          {/* Your solution here */}
        </div>
      </div>
    </nav>
  );
}`;

  return (
    <div className="min-h-screen text-slate-50">
      <section className="relative pt-32 pb-20 md:py-40 overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950/90 to-slate-900/95">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top-left,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        </div>
        <div className="absolute inset-0 bg-blue-950/40 z-0"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-4 bg-blue-900/30 text-blue-200 border-blue-800/50 py-1 px-3">
                <Sparkles size={14} className="mr-1" /> Now in public beta
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-200 to-blue-400 bg-clip-text text-transparent">
                Master Frontend Development Through Real Challenges
              </h1>
              <p className="text-xl text-slate-300 mb-8">
                Build beautiful interfaces from scratch, get instant AI feedback,
                and level up your frontend skills with hands-on coding challenges.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-blue-700 hover:bg-blue-800 text-blue-50 text-lg px-8 py-6" asChild>
                  <Link href='/login'>
                    Get Started Free
                  </Link>
                </Button>
                <Button variant="outline" className="border-blue-700 text-blue-100 hover:bg-blue-900/50 text-lg px-8 py-6">
                  View Challenges <ArrowRight size={16} className="ml-2" />
                </Button>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative max-w-5xl mx-auto"
          >
            <div className="rounded-xl overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="">
                  <CodeEditor code={navbarCode} />
                </div>
                <div className="bg-slate-900 p-6 flex items-center justify-center">
                  <div className="text-center">
                    <div className="bg-blue-900/50 rounded-full p-3 inline-flex mb-4">
                      <Brain size={24} className="text-blue-200" />
                    </div>
                    <h3 className="text-lg font-medium mb-2 text-blue-100">AI Feedback Ready</h3>
                    <p className="text-sm text-slate-400">
                      Submit your solution to get instant AI analysis on your code structure, accessibility, and performance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}