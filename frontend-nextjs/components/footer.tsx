import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";
import Link from "next/link";

export const Footer = () => {
    return (
        <footer className="bg-slate-900/80 border-t border-blue-800/50 py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <Badge className="mb-4 border-blue-800/50 py-1 px-3">
                            <Sparkles size={14} className="mr-1" /> Coding Geeks
                        </Badge>
                        <p className="text-slate-300 mb-4">
                            Master frontend development through hands-on practice and real-world challenges.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-blue-100 mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link href="/" className="text-slate-300 hover:text-blue-400">Home</Link></li>
                            <li><Link href="/about" className="text-slate-300 hover:text-blue-400">About</Link></li>
                            <li><Link href="/challenges" className="text-slate-300 hover:text-blue-400">Challenges</Link></li>
                            <li><Link href="/contact" className="text-slate-300 hover:text-blue-400">Contact</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-blue-100 mb-4">Connect With Us</h3>
                        <ul className="space-y-2">
                            <li><Link href="#" className="text-slate-300 hover:text-blue-400">Twitter</Link></li>
                            <li><Link href="#" className="text-slate-300 hover:text-blue-400">GitHub</Link></li>
                            <li><Link href="#" className="text-slate-300 hover:text-blue-400">LinkedIn</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-blue-800/50 text-center text-slate-400">
                    <p>&copy; {new Date().getFullYear()} Coding Geeks. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};  