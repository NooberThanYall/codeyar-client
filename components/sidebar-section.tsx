"use client"

import type React from "react"

import { useState } from "react"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarSectionProps {
  title: string
  children?: React.ReactNode
  expanded?: boolean
}

export function SidebarSection({ title, children, expanded = false }: SidebarSectionProps) {
  const [isExpanded, setIsExpanded] = useState(expanded)

  return (
    <div className="border-b border-gray-800">
      <button
        className="flex items-center w-full px-6 py-3 text-gray-300 hover:text-white"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <ChevronRight
          className={cn("h-4 w-4 mr-2 transition-transform", {
            "transform rotate-90": isExpanded,
          })}
        />
        {title}
      </button>
      {isExpanded && children && <div className="pb-2">{children}</div>}
    </div>
  )
}
