"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"

// Question interface
export interface Question {
  title: string
  tags: string[]
  content: string
  difficulty: "easy" | "medium" | "hard"
  acceptance: number
  id: number
  author_id: number
  image: string
}

// Dummy question data
const dummyQuestion: Question = {
  title: "Two Sum",
  tags: ["Array", "Hash Table", "Algorithms"],
  content:
    "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.",
  difficulty: "easy",
  acceptance: 47.5,
  id: 1,
  author_id: 101,
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKYmYpwY26lHgCBFPQuXvPdDL8b2OGymMvHA&s",
}

// Default code template - just the body content
const defaultCode = `<div class="container">
  <h1>Hello World!</h1>
  <p>Edit this code and click Run to see changes</p>
  <button onclick="showMessage()">Click me</button>
</div>

<style>
  body {
    font-family: Arial, sans-serif;
    margin: 20px;
    background-color: #0f172a;
    color: #e2e8f0;
  }
  .container {
    background-color: #1e293b;
    padding: 20px;
    border-radius: 8px;
    border: 1px solid rgba(59, 130, 246, 0.3);
  }
  h1 {
    color: #93c5fd;
  }
  button {
    background-color: #3b82f6;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
  }
  button:hover {
    background-color: #2563eb;
  }
</style>

<script>
  function showMessage() {
    alert('Button clicked!');
  }
</script>`

// Determine difficulty color
const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "easy":
      return "bg-emerald-900/30 text-emerald-300 border border-emerald-700/50"
    case "medium":
      return "bg-amber-900/30 text-amber-300 border border-amber-700/50"
    case "hard":
      return "bg-red-900/30 text-red-300 border border-red-700/50"
    default:
      return "bg-gray-900/30 text-gray-300 border border-gray-700/50"
  }
}

export default function CodingChallengePage() {
  const [code, setCode] = useState(defaultCode)
  const [preview, setPreview] = useState("")
  const [activeTab, setActiveTab] = useState("code")
  const [isMobile, setIsMobile] = useState(false)

  // Check if mobile on mount and window resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth < 768) {
        setActiveTab("code")
      }
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  // Run the code to update the preview
  const handleRun = () => {
    try {
      // Wrap the user's code with HTML structure
      const htmlTemplate = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Coding Challenge</title>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
        <body>
          ${code}
        </body>
        </html>
      `
      setPreview(htmlTemplate)

      // If on mobile, switch to preview tab
      if (isMobile) {
        setActiveTab("preview")
      }
    } catch (error) {
      console.error("Error running code:", error)
    }
  }

  const handleSubmit = () => {
    // In a real app, this would submit the code to a backend for evaluation
    alert("Code submitted successfully!")
  }

  return (
    <div className="bg-slate-900 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-blue-200 to-blue-400 bg-clip-text text-transparent">
          Coding Challenge
        </h1>

        {/* Mobile view uses tabs */}
        {isMobile ? (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-slate-800 border border-blue-800/30">
              <TabsTrigger value="code" className="text-slate-300 data-[state=active]:bg-blue-900/20 data-[state=active]:text-blue-300">
                Code
              </TabsTrigger>
              <TabsTrigger value="preview" className="text-slate-300 data-[state=active]:bg-blue-900/20 data-[state=active]:text-blue-300">
                Preview
              </TabsTrigger>
            </TabsList>

            <TabsContent value="code" className="space-y-4">
              <QuestionCard question={dummyQuestion} />
              <CodeEditor code={code} setCode={setCode} handleRun={handleRun} handleSubmit={handleSubmit} />
            </TabsContent>

            <TabsContent value="preview">
              <CodePreview preview={preview} />
            </TabsContent>
          </Tabs>
        ) : (
          // Desktop view shows side by side
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <QuestionCard question={dummyQuestion} />
              <CodeEditor code={code} setCode={setCode} handleRun={handleRun} handleSubmit={handleSubmit} />
            </div>
            <CodePreview preview={preview} />
          </div>
        )}
      </div>
    </div>
  )
}

// Question display component
function QuestionCard({ question }: { question: Question }) {
  return (
    <Card className="p-4 bg-slate-800 border border-blue-800/50 text-slate-300">
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-4 items-start">
          {/* Question image */}
        
          
          <div>
            <h2 className="text-xl font-bold text-blue-100">{question.title}</h2>
            <div className="flex flex-wrap gap-2 mt-2">
              {question.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="bg-slate-700 text-blue-300 border-blue-800/50">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
   
        <div className={`px-2 py-1 rounded text-sm font-medium ${getDifficultyColor(question.difficulty)}`}>
          {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
        </div>

      </div>
      <p className="text-sm text-slate-300 mb-3">{question.content}</p>

            {question.image && (
              <div className="relative w-full h-full">
                <img
                  src={question.image}
                  alt={`${question.title} illustration`}
                  className="object-cover w-full"
                />
              </div>
            ) }

      <div className="flex justify-between text-sm text-slate-400">
        <span>Acceptance: {question.acceptance}%</span>
        <span>ID: {question.id}</span>
      </div>
    </Card>
  )
}

// Code editor component
function CodeEditor({
  code,
  setCode,
  handleRun,
  handleSubmit,
}: {
  code: string
  setCode: (code: string) => void
  handleRun: () => void
  handleSubmit: () => void
}) {
  return (
    <Card className="p-4 bg-slate-800 border border-blue-800/50">
      <div className="mb-2 flex justify-between items-center">
        <h3 className="font-medium text-blue-200">Code Editor</h3>
        <div className="flex gap-2">
          <Button onClick={handleRun} className="bg-blue-600 hover:bg-blue-700">
            Run
          </Button>
          <Button onClick={handleSubmit} variant="outline" className="border-blue-600 text-blue-400 hover:bg-blue-900/20">
            Submit
          </Button>
        </div>
      </div>

      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="w-full h-[400px] p-3 font-mono text-sm border rounded-md bg-slate-900 text-slate-300 border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        spellCheck="false"
      />
    </Card>
  )
}

// Code preview component
function CodePreview({ preview }: { preview: string }) {
  const [iframeKey, setIframeKey] = useState(0);
  
  useEffect(() => {
    // Generate a new key whenever preview changes to force iframe refresh
    if (preview) {
      setIframeKey(prevKey => prevKey + 1);
    }
  }, [preview]);

  return (
    <Card className="p-4 h-full bg-slate-800 border border-blue-800/50">
      <h3 className="font-medium mb-2 text-blue-200">Preview</h3>
      {preview ? (
        <iframe
          key={iframeKey}
          srcDoc={preview}
          className="w-full min-h-[500px] h-full border rounded-md bg-slate-900 border-slate-700"
          sandbox="allow-scripts allow-same-origin"
          title="Code Preview"
        />
      ) : (
        <div className="w-full min-h-[500px] h-full flex items-center justify-center border rounded-md bg-slate-900 border-slate-700">
          <p className="text-slate-400">Click "Run" to see your code in action</p>
        </div>
      )}
    </Card>
  )
}