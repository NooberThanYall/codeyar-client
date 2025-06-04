"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowRight,
  Search,
  Plus,
  Code2,
  Star,
  Grid,
  List,
  User,
  ChevronRight,
  Menu,
  X,
  ChevronDown,
} from "lucide-react"
import { SnippetCard } from "@/components/snippet-card"
import { SnippetModal } from "@/components/snippet-modal"

interface SnippetsPageProps {
  onBackToDashboard: () => void
}

const categories = [
  { title: "همه قطعه‌ها", icon: Code2, count: 247, color: "bg-red-500", id: "all" },
  { title: "محبوب‌ترین‌ها", icon: Star, count: 23, color: "bg-orange-500", id: "favorites" },
]

const languages = [
  { title: "JavaScript", count: 45, id: "javascript" },
  { title: "Python", count: 32, id: "python" },
  { title: "React", count: 28, id: "react" },
  { title: "TypeScript", count: 15, id: "typescript" },
  { title: "CSS", count: 19, id: "css" },
  { title: "HTML", count: 12, id: "html" },
]

const tags = ["react", "auth", "css", "layout", "javascript", "arrays"]

const snippets = [
  {
    id: 1,
    title: "React Authentication Hook",
    description: "تابع debounce برای بهینه‌سازی جستجوی real-time",
    language: "JavaScript",
    code: `const useAuth = () => {
  const [user, setUser] = useState(null);

  // Authentication logic here

  return { user, login, logout };
}`,
    tags: ["react", "auth"],
    author: "شما",
    createdAt: "2 days ago",
    likes: 12,
    isLiked: true,
  },
  {
    id: 2,
    title: "TypeScript Utility Types",
    description: "کامپوننت React برای نمایش loading با انیمیشن",
    language: "TypeScript",
    code: `type Partial<T> = {
  [P in keyof T]?: T[P];
};

type Required<T> = {
  [P in keyof T]-?: T[P];
};`,
    tags: ["typescript"],
    author: "علی احمدی",
    createdAt: "1 week ago",
    likes: 28,
    isLiked: false,
  },
  {
    id: 3,
    title: "CSS Grid Layout",
    description: "تبدیل تاریخ میلادی به شمسی با JavaScript",
    language: "CSS",
    code: `.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}`,
    tags: ["css", "layout"],
    author: "مریم کریمی",
    createdAt: "2 weeks ago",
    likes: 15,
    isLiked: true,
  },
  {
    id: 4,
    title: "JavaScript Array Methods",
    description: "React hook برای مدیریت آسان localStorage",
    language: "JavaScript",
    code: `const filtered = array.filter(item => item.active);
const mapped = array.map(item => item.name);
const reduced = array.reduce((acc, item) => acc + item.value, 0);`,
    tags: ["javascript", "arrays"],
    author: "حسین رضایی",
    createdAt: "3 weeks ago",
    likes: 34,
    isLiked: false,
  },
]

export function SnippetsPage({ onBackToDashboard }: SnippetsPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSnippet, setSelectedSnippet] = useState<(typeof snippets)[0] | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [languagesExpanded, setLanguagesExpanded] = useState(true)
  const [tagsExpanded, setTagsExpanded] = useState(true)

  const filteredSnippets = snippets.filter((snippet) => {
    const matchesSearch =
      snippet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      snippet.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      snippet.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory =
      selectedCategory === "all" ||
      snippet.language.toLowerCase() === selectedCategory ||
      (selectedCategory === "favorites" && snippet.likes > 20)

    const matchesTag = !selectedTag || snippet.tags.includes(selectedTag)

    return matchesSearch && matchesCategory && matchesTag
  })

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
              placeholder="جستجو در قطعه کدها..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#2a2a2a] border border-gray-700 rounded-md py-2 px-10 text-gray-300 focus:outline-none focus:ring-1 focus:ring-red-500"
            />
          </div>
          <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center text-white">
            <User className="h-5 w-5" />
          </div>
        </header>

        {/* Content Header */}
        <div className="flex items-center justify-between p-4 bg-[#121212] border-b border-gray-800">
          <div className="flex items-center gap-2">
            <h1 className="text-white text-xl font-medium">Grid/List of Snippet Cards</h1>
            <span className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-sm">{filteredSnippets.length}</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-md transition-colors ${
                viewMode === "grid" ? "bg-gray-700 text-white" : "text-gray-400 hover:text-white hover:bg-gray-800"
              }`}
            >
              <Grid className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-md transition-colors ${
                viewMode === "list" ? "bg-gray-700 text-white" : "text-gray-400 hover:text-white hover:bg-gray-800"
              }`}
            >
              <List className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Snippets Grid */}
        <main className="flex-1 overflow-auto p-4 bg-[#121212]">
          <div className={`grid gap-4 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"}`}>
            <AnimatePresence>
              {filteredSnippets.map((snippet, index) => (
                <motion.div
                  key={snippet.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <SnippetCard snippet={snippet} onClick={() => setSelectedSnippet(snippet)} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredSnippets.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
              <Code2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">قطعه کدی یافت نشد</h3>
              <p className="text-gray-400">{searchQuery ? "جستجوی خود را تغییر دهید" : "قطعه کد جدیدی اضافه کنید"}</p>
            </motion.div>
          )}

          {/* Load More */}
          <div className="flex justify-center mt-8">
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-gray-300 rounded-md hover:bg-gray-700 transition-colors">
              Load More
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
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
            <button
              onClick={onBackToDashboard}
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <ArrowRight className="h-4 w-4" />
              بازگشت به داشبورد
            </button>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-gray-400 hover:text-white p-2 rounded-md hover:bg-gray-700 lg:hidden"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Sidebar Content */}
          <div className="flex-1 overflow-y-auto">
            {/* All Snippets */}
            <div className="border-b border-gray-800">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`w-full flex items-center gap-3 p-4 text-right transition-colors ${
                  selectedCategory === "all" ? "bg-red-600 text-white" : "text-gray-300 hover:bg-[#2a2a2a]"
                }`}
              >
                <ChevronRight className="h-4 w-4" />
                All Snippets
              </button>
            </div>

            {/* Favorites */}
            <div className="border-b border-gray-800">
              <button
                onClick={() => setSelectedCategory("favorites")}
                className={`w-full flex items-center gap-3 p-4 text-right transition-colors ${
                  selectedCategory === "favorites" ? "bg-red-600 text-white" : "text-gray-300 hover:bg-[#2a2a2a]"
                }`}
              >
                <ChevronRight className="h-4 w-4" />
                Favorites
              </button>
            </div>

            {/* Languages */}
            <div className="border-b border-gray-800">
              <button
                onClick={() => setLanguagesExpanded(!languagesExpanded)}
                className="w-full flex items-center gap-3 p-4 text-gray-300 hover:bg-[#2a2a2a] transition-colors"
              >
                <ChevronRight className={`h-4 w-4 transition-transform ${languagesExpanded ? "rotate-90" : ""}`} />
                Languages
              </button>
              {languagesExpanded && (
                <div className="pb-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.id}
                      onClick={() => setSelectedCategory(lang.id)}
                      className={`w-full flex items-center justify-between px-10 py-2 text-right transition-colors ${
                        selectedCategory === lang.id ? "text-red-400 bg-[#2a2a2a]" : "text-gray-400 hover:text-white"
                      }`}
                    >
                      <span>{lang.title}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Tags */}
            <div className="border-b border-gray-800">
              <button
                onClick={() => setTagsExpanded(!tagsExpanded)}
                className="w-full flex items-center gap-3 p-4 text-gray-300 hover:bg-[#2a2a2a] transition-colors"
              >
                <ChevronRight className={`h-4 w-4 transition-transform ${tagsExpanded ? "rotate-90" : ""}`} />
                Tags
              </button>
              {tagsExpanded && (
                <div className="px-6 py-2 space-y-2">
                  {tags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                      className={`block text-right transition-colors ${
                        selectedTag === tag ? "text-red-400" : "text-red-500 hover:text-red-400"
                      }`}
                    >
                      #{tag}
                    </button>
                  ))}
                  <button className="flex items-center gap-2 text-gray-500 hover:text-gray-300 mt-2">
                    <Plus className="h-4 w-4" />
                    Add Tag
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Create Button */}
          <div className="p-4 border-t border-gray-800">
            <button className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-md font-medium transition-colors">
              <Plus className="h-4 w-4" />
              Create Snip
            </button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Snippet Modal */}
      <SnippetModal snippet={selectedSnippet} isOpen={!!selectedSnippet} onClose={() => setSelectedSnippet(null)} />
    </div>
  )
}
