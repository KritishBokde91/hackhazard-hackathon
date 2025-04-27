"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from 'next/image'
import { Question } from "@/shared/schema"
import { useQuestion } from "@/hooks/stores/use-question"
import { useAuth } from "@/hooks/stores/use-auth"
import { useRouter } from "next/navigation"


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

// Mock submissions data with the new format
const mockSubmissions = [
  {
    id: 1,
    date: "2025-04-25",
    marks_simplicity: 90,
    marks_output: 70,
    marks_responsiveness: 80,
    total_score: 80,
    status: "Passed"
  },
  {
    id: 2,
    date: "2025-04-24",
    marks_simplicity: 65,
    marks_output: 40,
    marks_responsiveness: 55,
    total_score: 53,
    status: "Failed"
  },
  {
    id: 3,
    date: "2025-04-23",
    marks_simplicity: 75,
    marks_output: 85,
    marks_responsiveness: 60,
    total_score: 73,
    status: "Passed"
  },
];

export default function CodingChallengePage({ problemId }: { problemId: number }) {
  const [code, setCode] = useState(defaultCode)
  const [preview, setPreview] = useState("")
  const [activeTab, setActiveTab] = useState("code")
  const [isMobile, setIsMobile] = useState(false)
  const { getQuestion, question, loading , submitCode } = useQuestion()
  const { user, isAuthChecking } = useAuth()
  const [submissions, setSubmissions] = useState(mockSubmissions)
  const router = useRouter();

  useEffect(() => {
    if (isMobile) {
      setActiveTab("code")
    }
  }, [isMobile])



  // Check if mobile on mount and window resize
  useEffect(() => {
    (async () => {
      await getQuestion(problemId)
    })()

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
  }, []) //eslint-disable-line

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

  const handleSubmit = async () => {
    // In a real app, this would submit the code to a backend for evaluation
    //
    submitCode(problemId, code)
    // Generate random scores
    const simplicity = Math.floor(Math.random() * 30) + 70; // 70-100
    const output = Math.floor(Math.random() * 50) + 50; // 50-100
    const responsiveness = Math.floor(Math.random() * 40) + 60; // 60-100
    const totalScore = Math.floor((simplicity + output + responsiveness) / 3);

    // Add a new submission to the list
    const newSubmission = {
      id: submissions.length + 1,
      date: new Date().toISOString().split('T')[0],
      marks_simplicity: simplicity,
      marks_output: output,
      marks_responsiveness: responsiveness,
      total_score: totalScore,
      status: totalScore >= 70 ? "Passed" : "Failed"
    }

    setSubmissions([newSubmission, ...submissions])

    if (isMobile) {
      setActiveTab("submissions")
    }
  }
  useEffect(() => {
    if (!isAuthChecking && !user) {
      router.push("/login?next=/problems/" + problemId);
    }
  }, [isAuthChecking, user, router, problemId]);

  if (isAuthChecking || !user) {
    return <div>Loading...</div>;
  }
  if (loading) {
    return <div>Loading...</div>
  }
  else if (!question) {
    return <div className="pt-32 flex items-center justify-center">Problem {problemId} not found</div>
  }

  else if (user) return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-blue-200 to-blue-400 bg-clip-text text-transparent">
          Coding Challenge
        </h1>

        {/* Mobile view uses tabs */}
        {isMobile ? (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-slate-800 border border-blue-800/30">
              <TabsTrigger value="code" className="text-slate-300 data-[state=active]:bg-blue-900/20 data-[state=active]:text-blue-300">
                Code
              </TabsTrigger>
              <TabsTrigger value="preview" className="text-slate-300 data-[state=active]:bg-blue-900/20 data-[state=active]:text-blue-300">
                Preview
              </TabsTrigger>
              <TabsTrigger value="submissions" className="text-slate-300 data-[state=active]:bg-blue-900/20 data-[state=active]:text-blue-300">
                Submissions
              </TabsTrigger>
            </TabsList>

            <TabsContent value="code" className="space-y-4">
              <QuestionCard question={question} />
              <CodeEditor code={code} setCode={setCode} handleRun={handleRun} handleSubmit={handleSubmit} />
            </TabsContent>

            <TabsContent value="preview">
              <CodePreview preview={preview} />
            </TabsContent>

            <TabsContent value="submissions">
              <SubmissionsTab submissions={submissions} />
            </TabsContent>
          </Tabs>
        ) : (
          // Desktop view shows side by side with tabs for preview/submissions
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <QuestionCard question={question} />
              <CodeEditor code={code} setCode={setCode} handleRun={handleRun} handleSubmit={handleSubmit} />
            </div>
            <div>
              <Tabs defaultValue="preview" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-slate-800 border border-blue-800/30 mb-4">
                  <TabsTrigger value="preview" className="text-slate-300 data-[state=active]:bg-blue-900/20 data-[state=active]:text-blue-300">
                    Preview
                  </TabsTrigger>
                  <TabsTrigger value="submissions" className="text-slate-300 data-[state=active]:bg-blue-900/20 data-[state=active]:text-blue-300">
                    Submissions
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="preview">
                  <CodePreview preview={preview} />
                </TabsContent>

                <TabsContent value="submissions">
                  <SubmissionsTab submissions={submissions} />
                </TabsContent>
              </Tabs>
            </div>
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

      {true && (
        <div className="relative w-full h-full">
          <Image
            src={question.image}
            alt={`${question.title} illustration`}
            className="object-cover w-full"
            height={1000}
            width={1000}
          />
        </div>
      )}

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
          <p className="text-slate-400">Click &quot;Run&quot; to see your code in action</p>
        </div>
      )}
    </Card>
  )
}

// Get color based on score
const getScoreColor = (score: number) => {
  if (score >= 85) return "text-emerald-400";
  if (score >= 70) return "text-blue-400";
  if (score >= 60) return "text-amber-400";
  return "text-red-400";
};

// New Submissions tab component with score metrics
function SubmissionsTab({ submissions }: { submissions: any[] }) {
  return (
    <Card className="p-4 h-full bg-slate-800 border border-blue-800/50">
      <h3 className="font-medium mb-4 text-blue-200">Your Submissions</h3>

      {submissions.length > 0 ? (
        <div className="space-y-4">
          {submissions.map((submission) => (
            <Card key={submission.id} className="bg-slate-900 border border-slate-700 overflow-hidden">
              <div className="flex justify-between items-center p-4 border-b border-slate-700">
                <div>
                  <span className="text-xs text-slate-400">Submission #{submission.id}</span>
                  <div className="text-sm text-slate-300 mt-1">{submission.date}</div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${submission.status === 'Passed'
                  ? 'bg-emerald-900/30 text-emerald-300 border border-emerald-700/50'
                  : 'bg-red-900/30 text-red-300 border border-red-700/50'
                  }`}>
                  {submission.status}
                </span>
              </div>

              <div className="p-4">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-bold text-blue-200">Total Score</span>
                  <span className={`text-2xl font-bold ${getScoreColor(submission.total_score)}`}>
                    {submission.total_score}%
                  </span>
                </div>

                <div className="space-y-4">
                  {/* Simplicity Score */}
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-300">Simplicity</span>
                      <span className={`font-medium ${getScoreColor(submission.marks_simplicity)}`}>
                        {submission.marks_simplicity}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${submission.marks_simplicity >= 85 ? 'bg-emerald-500' :
                          submission.marks_simplicity >= 70 ? 'bg-blue-500' :
                            submission.marks_simplicity >= 60 ? 'bg-amber-500' : 'bg-red-500'
                          }`}
                        style={{ width: `${submission.marks_simplicity}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Output Score */}
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-300">Output Quality</span>
                      <span className={`font-medium ${getScoreColor(submission.marks_output)}`}>
                        {submission.marks_output}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${submission.marks_output >= 85 ? 'bg-emerald-500' :
                          submission.marks_output >= 70 ? 'bg-blue-500' :
                            submission.marks_output >= 60 ? 'bg-amber-500' : 'bg-red-500'
                          }`}
                        style={{ width: `${submission.marks_output}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Responsiveness Score */}
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-300">Responsiveness</span>
                      <span className={`font-medium ${getScoreColor(submission.marks_responsiveness)}`}>
                        {submission.marks_responsiveness}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${submission.marks_responsiveness >= 85 ? 'bg-emerald-500' :
                          submission.marks_responsiveness >= 70 ? 'bg-blue-500' :
                            submission.marks_responsiveness >= 60 ? 'bg-amber-500' : 'bg-red-500'
                          }`}
                        style={{ width: `${submission.marks_responsiveness}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="w-full min-h-[400px] flex items-center justify-center border rounded-md bg-slate-900 border-slate-700">
          <p className="text-slate-400">No submissions yet. Submit your code to see results here.</p>
        </div>
      )}
    </Card>
  )
}
