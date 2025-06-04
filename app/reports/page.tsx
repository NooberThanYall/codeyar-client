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
  Calendar,
  ArrowUp,
  ArrowDown,
} from "lucide-react"

const menuItems = [
  { title: "داشبورد", icon: Home, id: "dashboard", href: "/dashboard" },
  { title: "قطعه کدها", icon: Code2, id: "snippets", href: "/snippets" },
  { title: "دیباگر هوشمند", icon: Bug, id: "debugger", href: "/debugger" },
  { title: "گزارش‌ها", icon: BarChart3, id: "reports", href: "/reports" },
  { title: "پروژه‌ها", icon: FileText, id: "projects", href: "/projects" },
  { title: "تنظیمات", icon: Settings, id: "settings", href: "/settings" },
]

export default function ReportsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

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
              <h2 className="text-2xl font-bold text-white">گزارش‌ها</h2>
              <div className="flex items-center gap-3">
                <select className="bg-[#2a2a2a] border border-gray-700 rounded-md py-2 px-3 text-gray-300 focus:outline-none focus:ring-1 focus:ring-red-500">
                  <option value="week">هفته اخیر</option>
                  <option value="month">ماه اخیر</option>
                  <option value="quarter">سه ماه اخیر</option>
                  <option value="year">سال اخیر</option>
                </select>
                <button className="flex items-center gap-2 px-3 py-2 bg-[#2a2a2a] border border-gray-700 rounded-md text-gray-300 hover:bg-[#333333] transition-colors">
                  <Calendar className="h-4 w-4" />
                  <span>انتخاب تاریخ</span>
                </button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {[
                {
                  title: "قطعه کدهای ایجاد شده",
                  value: 24,
                  change: 12,
                  isPositive: true,
                  color: "bg-red-600",
                },
                {
                  title: "خطاهای رفع شده",
                  value: 47,
                  change: 23,
                  isPositive: true,
                  color: "bg-green-600",
                },
                {
                  title: "زمان صرفه‌جویی شده",
                  value: "12:45",
                  unit: "ساعت",
                  change: 8,
                  isPositive: true,
                  color: "bg-blue-600",
                },
                {
                  title: "بهره‌وری",
                  value: "87%",
                  change: 5,
                  isPositive: false,
                  color: "bg-purple-600",
                },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-[#1e1e1e] border border-gray-800 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-400">{stat.title}</h3>
                    <div className={`h-2 w-2 rounded-full ${stat.color}`}></div>
                  </div>
                  <div className="flex items-end justify-between">
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-white">{stat.value}</span>
                      {stat.unit && <span className="text-sm text-gray-400">{stat.unit}</span>}
                    </div>
                    <div
                      className={`flex items-center gap-1 text-xs font-medium ${
                        stat.isPositive ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {stat.isPositive ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                      {stat.change}%
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-[#1e1e1e] border border-gray-800 rounded-lg p-4 mb-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-medium">فعالیت در طول زمان</h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <span className="text-sm text-gray-400">قطعه کدها</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                    <span className="text-sm text-gray-400">دیباگ</span>
                  </div>
                </div>
              </div>
              <div className="h-64 w-full">
                {/* Placeholder for chart */}
                <div className="h-full w-full bg-[#252525] rounded-lg border border-gray-700 flex items-center justify-center">
                  <div className="text-gray-500">نمودار فعالیت</div>
                </div>
              </div>
            </motion.div>

            {/* Activity Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-[#1e1e1e] border border-gray-800 rounded-lg overflow-hidden"
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-800">
                <h3 className="text-white font-medium">فعالیت‌های اخیر</h3>
                <button className="text-sm text-red-500 hover:text-red-400 transition-colors">مشاهده همه</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#252525]">
                      <th className="py-3 px-4 text-right text-gray-400 font-medium text-sm">عنوان</th>
                      <th className="py-3 px-4 text-right text-gray-400 font-medium text-sm">نوع</th>
                      <th className="py-3 px-4 text-right text-gray-400 font-medium text-sm">تاریخ</th>
                      <th className="py-3 px-4 text-right text-gray-400 font-medium text-sm">وضعیت</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        title: "قطعه کد React Authentication",
                        type: "قطعه کد",
                        date: "امروز، 14:25",
                        status: "ایجاد شده",
                        statusColor: "bg-green-600",
                      },
                      {
                        title: "دیباگ خطای Type Error",
                        type: "دیباگ",
                        date: "امروز، 12:10",
                        status: "رفع شده",
                        statusColor: "bg-blue-600",
                      },
                      {
                        title: "قطعه کد CSS Grid Layout",
                        type: "قطعه کد",
                        date: "دیروز، 18:30",
                        status: "به‌روزرسانی",
                        statusColor: "bg-yellow-600",
                      },
                      {
                        title: "پروژه فروشگاه آنلاین",
                        type: "پروژه",
                        date: "دیروز، 10:15",
                        status: "ایجاد شده",
                        statusColor: "bg-green-600",
                      },
                      {
                        title: "دیباگ خطای Null Reference",
                        type: "دیباگ",
                        date: "2 روز پیش، 09:45",
                        status: "در حال بررسی",
                        statusColor: "bg-purple-600",
                      },
                    ].map((activity, index) => (
                      <tr key={index} className="border-b border-gray-800 hover:bg-[#252525]">
                        <td className="py-3 px-4 text-white">{activity.title}</td>
                        <td className="py-3 px-4 text-gray-300">{activity.type}</td>
                        <td className="py-3 px-4 text-gray-400">{activity.date}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <div className={`h-2 w-2 rounded-full ${activity.statusColor}`}></div>
                            <span className="text-gray-300">{activity.status}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
                      item.id === "reports"
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
