"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Home,
  Code2,
  Bug,
  Settings,
  BarChart3,
  FileText,
  Zap,
  Search,
  User,
  Menu,
  X,
  Play,
  AlertCircle,
} from "lucide-react"

const menuItems = [
  { title: "داشبورد", icon: Home, id: "dashboard", href: "/dashboard" },
  { title: "قطعه کدها", icon: Code2, id: "snippets", href: "/snippets" },
  { title: "دیباگر هوشمند", icon: Bug, id: "debugger", href: "/debugger" },
  { title: "گزارش‌ها", icon: BarChart3, id: "reports", href: "/reports" },
  { title: "پروژه‌ها", icon: FileText, id: "projects", href: "/projects" },
  { title: "تنظیمات", icon: Settings, id: "settings", href: "/settings" },
]

export default function DebuggerPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [code, setCode] = useState(`function calculateSum(numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  return sum;
}

const result = calculateSum([1, 2, 3, "4", 5]);
console.log(result);`)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<null | {
    issues: { type: string; description: string; line: number; solution: string }[]
    suggestions: string[]
  }>(null)

  const handleAnalyze = () => {
    setIsAnalyzing(true)

    // Simulate analysis
    setTimeout(() => {
      setAnalysisResult({
        issues: [
          {
            type: "Type Error",
            description: "عملیات جمع روی مقدار رشته‌ای انجام می‌شود",
            line: 4,
            solution: "تبدیل مقادیر به عدد با استفاده از Number() یا parseInt()",
          },
        ],
        suggestions: [
          "بررسی نوع داده‌ها قبل از عملیات ریاضی",
          "استفاده از TypeScript برای جلوگیری از خطاهای نوع داده",
          "پیاده‌سازی مکانیزم خطایابی برای ورودی‌های نامعتبر",
        ],
      })
      setIsAnalyzing(false)
    }, 2000)
  }

  return (
    <div className="flex h-screen bg-[#121212]">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b border-gray-800 bg-[#1e1e1e] px-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-400 hover:text-white p-2 rounded-md hover:bg-gray-700 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="text-red-500 text-xl font-bold">کدیار</div>
          </div>
          <div className="relative flex-1 mx-4 max-w-md">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="جستجو..."
              className="w-full bg-[#2a2a2a] border border-gray-700 rounded-md py-2 px-10 text-gray-300 focus:outline-none focus:ring-1 focus:ring-red-500"
            />
          </div>
          <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center text-white">
            <User className="h-5 w-5" />
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">دیباگر هوشمند</h2>
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors ${
                  isAnalyzing
                    ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                    : "bg-red-600 text-white hover:bg-red-700"
                }`}
              >
                {isAnalyzing ? (
                  <>
                    <div className="h-4 w-4 rounded-full border-2 border-gray-400 border-t-transparent animate-spin"></div>
                    در حال تحلیل...
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" />
                    تحلیل کد
                  </>
                )}
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Code Editor */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-[#1e1e1e] border border-gray-800 rounded-lg overflow-hidden"
              >
                <div className="flex items-center justify-between bg-[#252525] px-4 py-2 border-b border-gray-800">
                  <h3 className="text-white font-medium">ویرایشگر کد</h3>
                  <div className="flex gap-2">
                    <select className="bg-[#333333] text-gray-300 text-sm rounded-md px-2 py-1 border border-gray-700">
                      <option value="javascript">JavaScript</option>
                      <option value="typescript">TypeScript</option>
                      <option value="python">Python</option>
                      <option value="php">PHP</option>
                    </select>
                  </div>
                </div>
                <div className="p-4 bg-[#1e1e1e]">
                  <div className="relative font-mono">
                    <textarea
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className="w-full h-96 bg-[#252525] text-gray-300 p-4 rounded-md border border-gray-700 focus:outline-none focus:border-red-500 resize-none font-mono"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Analysis Results */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-[#1e1e1e] border border-gray-800 rounded-lg overflow-hidden"
              >
                <div className="bg-[#252525] px-4 py-2 border-b border-gray-800">
                  <h3 className="text-white font-medium">نتایج تحلیل</h3>
                </div>
                <div className="p-4 h-96 overflow-y-auto">
                  {isAnalyzing ? (
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="h-12 w-12 rounded-full border-4 border-gray-700 border-t-red-600 animate-spin mb-4"></div>
                      <p className="text-gray-400">در حال تحلیل کد...</p>
                    </div>
                  ) : analysisResult ? (
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                          <AlertCircle className="h-5 w-5 text-red-500" />
                          مشکلات یافت شده
                        </h4>
                        <div className="space-y-3">
                          {analysisResult.issues.map((issue, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 * index }}
                              className="bg-[#252525] border border-gray-700 rounded-lg p-3"
                            >
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-red-400 font-medium">{issue.type}</span>
                                <span className="text-gray-500 text-sm">خط {issue.line}</span>
                              </div>
                              <p className="text-gray-300 mb-2">{issue.description}</p>
                              <div className="bg-[#2a2a2a] p-2 rounded border border-gray-700">
                                <p className="text-green-400 text-sm">
                                  <span className="text-gray-400">راه حل: </span>
                                  {issue.solution}
                                </p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-white font-medium mb-3">پیشنهادات بهبود</h4>
                        <ul className="space-y-2">
                          {analysisResult.suggestions.map((suggestion, index) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.2 + 0.1 * index }}
                              className="flex items-center gap-2 text-gray-300"
                            >
                              <div className="h-1.5 w-1.5 rounded-full bg-red-500"></div>
                              {suggestion}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                      <Bug className="h-16 w-16 text-gray-700 mb-4" />
                      <h4 className="text-white font-medium mb-2">آماده تحلیل کد</h4>
                      <p className="text-gray-400 max-w-md">
                        کد خود را در ویرایشگر وارد کنید و دکمه «تحلیل کد» را بزنید تا دیباگر هوشمند مشکلات احتمالی را
                        شناسایی کند.
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Code Examples */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-6"
            >
              <h3 className="text-white font-medium mb-4">نمونه کدها برای تست</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    title: "خطای نوع داده",
                    description: "عملیات روی انواع داده ناسازگار",
                    code: `function add(a, b) {\n  return a + b;\n}\n\nconsole.log(add(5, "10"));`,
                  },
                  {
                    title: "خطای دسترسی",
                    description: "دسترسی به خصوصیت‌های نامعتبر",
                    code: `const user = { name: "Ali" };\nconsole.log(user.age.toString());`,
                  },
                  {
                    title: "حلقه بی‌نهایت",
                    description: "شرط خروج نادرست در حلقه",
                    code: `function countDown(n) {\n  while (n >= 0) {\n    console.log(n);\n  }\n}\n\ncountDown(5);`,
                  },
                ].map((example, index) => (
                  <div
                    key={index}
                    onClick={() => setCode(example.code)}
                    className="bg-[#252525] border border-gray-800 rounded-lg p-4 cursor-pointer hover:border-gray-700 transition-all"
                  >
                    <h4 className="text-white font-medium mb-1">{example.title}</h4>
                    <p className="text-gray-400 text-sm mb-3">{example.description}</p>
                    <div className="bg-[#1e1e1e] p-2 rounded border border-gray-700">
                      <pre className="text-gray-300 text-xs font-mono overflow-hidden line-clamp-3">{example.code}</pre>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </main>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-80 bg-[#1e1e1e] border-r border-gray-800 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-800">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-600 text-white">
                <Zap className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">کدیار</h2>
                <p className="text-sm text-gray-400">ابزار توسعه هوشمند</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-gray-400 hover:text-white p-2 rounded-md hover:bg-gray-700 lg:hidden"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Sidebar Content */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-2">
              <h3 className="text-gray-400 font-medium text-sm mb-3">منوی اصلی</h3>
              {menuItems.map((item, index) => (
                <Link key={item.id} href={item.href}>
                  <motion.button
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg text-right transition-colors ${
                      item.id === "debugger"
                        ? "bg-red-600 text-white"
                        : "text-gray-300 hover:bg-[#2a2a2a] hover:text-red-400"
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </motion.button>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  )
}
