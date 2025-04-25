"use client";

import { cn } from "@/lib/utils";

interface CodeEditorProps {
    code: string;
    language?: string;
    className?: string;
}

export function CodeEditor({
    code,
    language = "typescript",
    className,
}: CodeEditorProps) {
    return (
        <div className={cn("rounded-lg overflow-hidden border border-border bg-[#1E1E1E]", className)}>
            <div className="bg-[#2D2D2D] px-4 py-2 flex items-center justify-between border-b border-border">
                <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-sm text-muted-foreground">editor.tsx</span>
                </div>
            </div>
            <div className="p-4">
                <pre className="text-sm font-mono text-gray-300 overflow-x-auto">
                    <code>{code}</code>
                </pre>
            </div>
        </div>
    );
} 