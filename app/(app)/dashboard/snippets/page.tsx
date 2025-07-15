"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
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
import { useSnippet } from "@/context/snippet/SnippetContext"

// Sidebar Component
const Sidebar = ({ sidebarOpen, setSidebarOpen, selectedCategory, setSelectedCategory, selectedTag, setSelectedTag }) => {
  const [languagesExpanded, setLanguagesExpanded] = useState(true)
  const [tagsExpanded, setTagsExpanded] = useState(true)

  const languages = [
    { title: "JavaScript", count: 45, id: "javascript" },
    { title: "Python", count: 32, id: "python" },
    { title: "React", count: 28, id: "react" },
    { title: "TypeScript", count: 15, id: "typescript" },
    { title: "CSS", count: 19, id: "css" },
    { title: "HTML", count: 12, id: "html" },
  ]
  const tags = ["react", "auth", "css", "layout", "javascript", "arrays"]

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-80 bg-[#1e1e1e] border-r border-gray-800 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-gray-800">
          <Link href="/dashboard" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
            <ArrowRight className="h-4 w-4" /> بازگشت به داشبورد
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-gray-400 hover:text-white p-2 rounded-md hover:bg-gray-700 lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className="px-4 py-2">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`w-full flex rounded-full items-center gap-3 p-3 text-right transition-colors ${
                selectedCategory === "all" ? "bg-red-600 text-white" : "text-gray-300 hover:bg-[#2a2a2a]"
              }`}
            >
              <ChevronRight className="h-4 w-4" /> همه قطعه کدها
            </button>
          </div>
          <div className="px-4 py-2">
            <button
              onClick={() => setSelectedCategory("favorites")}
              className={`w-full flex items-center gap-3 p-3 rounded-full text-right transition-colors ${
                selectedCategory === "favorites" ? "bg-red-600 text-white" : "text-gray-300 hover:bg-[#2a2a2a]"
              }`}
            >
              <ChevronRight className="h-4 w-4" /> محبوب‌ترین‌ها
            </button>
          </div>
          <div className="px-4 py-2">
            <button
              onClick={() => setLanguagesExpanded(!languagesExpanded)}
              className="w-full flex items-center gap-3 p-3 rounded-full text-gray-300 hover:bg-[#2a2a2a] transition-colors"
            >
              <ChevronRight className={`h-4 w-4 transition-transform ${languagesExpanded ? "rotate-90" : ""}`} /> زبان‌ها
            </button>
            {languagesExpanded && (
              <div className="pb-2">
                {languages.map((lang) => (
                  <button
                    key={lang.id}
                    onClick={() => setSelectedCategory(lang.id)}
                    className={`w-full flex items-center justify-between rounded-full px-10 py-2 text-right transition-colors ${
                      selectedCategory === lang.id ? "text-red-400 bg-[#2a2a2a]" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    <span>{lang.title}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="px-4 py-2">
            <button
              onClick={() => setTagsExpanded(!tagsExpanded)}
              className="w-full flex items-center gap-3 p-3 rounded-full text-gray-300 hover:bg-[#2a2a2a] transition-colors"
            >
              <ChevronRight className={`h-4 w-4 transition-transform ${tagsExpanded ? "rotate-90" : ""}`} /> برچسب‌ها
            </button>
            {tagsExpanded && (
              <div className="px-6 py-2 space-y-2">
                {tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                    className={`block rounded-full text-right transition-colors ${
                      selectedTag === tag ? "text-red-400" : "text-red-500 hover:text-red-400"
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="p-4 my-4 border-t border-gray-800">
          <button className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-md font-medium transition-colors">
            <Plus className="h-4 w-4" /> ایجاد قطعه کد جدید
          </button>
        </div>
      </div>
    </div>
  )
}

// Header Component
const Header = ({ searchQuery, setSearchQuery, setSidebarOpen }) => (
  <header className="flex h-16 items-center justify-between border-b border-gray-800 bg-[#1e1e1e] px-4">
    <div className="flex items-center gap-4">
      <button
        onClick={() => setSidebarOpen(true)}
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
)

// ContentHeader Component
const ContentHeader = ({ filteredCount, viewMode, setViewMode }) => (
  <div className="flex items-center justify-between p-4 bg-[#121212] border-b border-gray-800">
    <div className="flex items-center gap-2">
      <h1 className="text-white text-xl font-medium">قطعه کدها</h1>
      <span className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-sm">{filteredCount}</span>
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
)

// SnippetGrid Component
const SnippetGrid = ({ snippets, setSelectedSnippet, viewMode }) => (
  <div className={`grid gap-4 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"}`}>
    <AnimatePresence>
      {snippets.map((snippet, index) => (
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
)

// NoResults Component
const NoResults = ({ searchQuery }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
    <Code2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
    <h3 className="text-lg font-medium text-white mb-2">قطعه کدی یافت نشد</h3>
    <p className="text-gray-400">
      {searchQuery ? "جستجوی خود را تغییر دهید" : "قطعه کد جدیدی اضافه کنید"}
    </p>
    <Link href={'/dashboard/snippets/new'}>
      <button className="mx-auto flex mt-4 rounded-full items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-3 px-4 font-medium transition-colors">
            <Plus className="h-4 w-4" /> ایجاد قطعه کد جدید
          </button>
    </Link>
  </motion.div>
)

export default function SnippetsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSnippet, setSelectedSnippet] = useState<any>(null)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const { snippets } = useSnippet()

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
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
      />
      <div className="flex-1 flex flex-col">
        <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} setSidebarOpen={setSidebarOpen} />
        <ContentHeader
          filteredCount={filteredSnippets.length}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />
        <main className="flex-1 overflow-auto p-4 bg-[#121212]">
          <SnippetGrid snippets={filteredSnippets} setSelectedSnippet={setSelectedSnippet} viewMode={viewMode} />
          {filteredSnippets.length === 0 && <NoResults searchQuery={searchQuery} />}
        </main>
      </div>
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
      <SnippetModal snippet={selectedSnippet} isOpen={!!selectedSnippet} onClose={() => setSelectedSnippet(null)} />
    </div>
  )
}
