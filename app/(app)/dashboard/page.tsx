"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
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
  ArrowBigLeft,
  X,
} from "lucide-react";

const menuItems = [
  { title: "داشبورد", icon: Home, id: "dashboard", href: "/dashboard" },
  {
    title: "قطعه کدها",
    icon: Code2,
    id: "snippets",
    href: "/dashboard/snippets",
  },
  { title: "دیباگر هوشمند", icon: Bug, id: "debugger", href: "/debugger" },
  { title: "گزارش‌ها", icon: BarChart3, id: "reports", href: "/reports" },
  { title: "پروژه‌ها", icon: FileText, id: "projects", href: "/projects" },
  { title: "تنظیمات", icon: Settings, id: "settings", href: "/settings" },
  { title: "خروج از حساب کاربری", icon: ArrowBigLeft, id: "logout", href: "/logout" },
];

// const stats = [
//   { title: "قطعه کدهای ذخیره شده", value: "247", change: "+12%", color: "bg-red-500" },
//   // { title: "پروژه‌های فعال", value: "18", change: "+3%", color: "bg-green-500" },
//   // { title: "خطاهای رفع شده", value: "89", change: "+25%", color: "bg-purple-500" },
//   // { title: "زمان صرفه‌جویی شده", value: "156 ساعت", change: "+8%", color: "bg-orange-500" },
// ]

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState([]);

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    const response = await fetch("http://127.0.0.1:5000/stats", {
      credentials: "include",
    });

    const stats = await response.json();
    setStats(stats);
  }

  return (
    <div className="flex h-screen bg-[#121212]">
      {/* Main Content */}

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
            <div className="space-y-4">
              <h3 className="text-gray-400 font-medium text-sm mb-3">
                منوی اصلی
              </h3>
              {menuItems.map((item, index) => (
                <Link key={item.id} href={item.href}>
                  <motion.button
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`w-full flex items-center mt-2 gap-3 p-3 rounded-full text-right transition-colors ${
                      item.id === "dashboard"
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">
              خوش آمدید به کدیار
            </h2>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                  className="bg-[#1e1e1e] border border-gray-800 rounded-lg p-4 hover:border-gray-700 transition-all hover:shadow-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-300">
                      {stat.title}
                    </h3>
                    <div className={`h-3 w-3 rounded-full ${stat.color}`} />
                  </div>
                  <div className="text-2xl font-bold text-white">
                    {stat.value}
                  </div>
                  <p className="text-xs text-green-400 font-medium">
                    {stat.change} از ماه گذشته
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Content Grid */}
            <div className="grid gap-6 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="bg-[#1e1e1e] border border-gray-800 rounded-lg p-6">
                  <h3 className="text-lg text-white font-semibold mb-2">
                    فعالیت‌های اخیر
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    آخرین تغییرات در پروژه‌های شما
                  </p>
                  <div className="space-y-4">
                    {[
                      "قطعه کد React جدید اضافه شد",
                      "خطای JavaScript در پروژه اصلی رفع شد",
                      "قطعه کد Python به‌روزرسانی شد",
                      'پروژه جدید "وب‌اپ فروشگاه" ایجاد شد',
                    ].map((activity, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                        className="flex items-center gap-3 p-3 rounded-lg bg-[#2a2a2a] hover:bg-[#333333] transition-colors"
                      >
                        <div className="h-2 w-2 rounded-full bg-red-500" />
                        <span className="text-sm text-gray-300">
                          {activity}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
              >
                <div className="bg-[#1e1e1e] border border-gray-800 rounded-lg p-6">
                  <h3 className="text-lg text-white font-semibold mb-2">
                    دسترسی سریع
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    ابزارهای پرکاربرد شما
                  </p>
                  <div className="grid gap-3">
                    <Link href="/dashboard/snippets">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex w-full items-center gap-3 p-3 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
                      >
                        <Code2 className="h-5 w-5" />
                        <span>مدیریت قطعه کدها</span>
                      </motion.button>
                    </Link>
                    <Link href="/debugger">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex w-full items-center gap-3 p-3 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors"
                      >
                        <Bug className="h-5 w-5" />
                        <span>دیباگر هوشمند</span>
                      </motion.button>
                    </Link>
                    <Link href="/projects">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex w-full items-center gap-3 p-3 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors"
                      >
                        <FileText className="h-5 w-5" />
                        <span>پروژه جدید</span>
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
