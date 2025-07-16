"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

interface Snippet {
  id: number;
  title: string;
  description: string;
  language: string;
  code: string;
  tags: string[];
  author: string;
  createdAt: string;
  likes: number;
  isLiked: boolean;
}

interface SnippetCardProps {
  snippet: Snippet;
  onClick: () => void;
}

export function SnippetCard({ snippet, onClick }: SnippetCardProps) {
  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className="bg-[#1e1e1e] border border-gray-800 rounded-lg p-4 cursor-pointer hover:border-gray-700 transition-all"
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-gray-500 text-sm">
          {new Date(snippet.createdAt).toLocaleDateString("fa-IR")}
        </span>

        <h3 className="text-white font-medium text-lg">{snippet.title}</h3>
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        {snippet.tags.map((tag) => (
          <span key={tag} className="text-red-500 text-sm">
            #{tag}
          </span>
        ))}
      </div>

      <div className="bg-[#252525] border border-gray-700 overflow-hidden rounded-lg p-3 mb-4 h-96">
        <pre
          className="text-sm text-gray-300 font-mono overflow-x-auto text-left"
          dir="ltr"
        >
          <code>{snippet.code}</code>
        </pre>
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-400">{snippet.author}</span>
        <div className="flex items-center gap-1">
          <Heart
            className={`h-4 w-4 ${
              snippet.isLiked ? "fill-red-500 text-red-500" : "text-gray-400"
            }`}
          />
          <span className="text-gray-400">{snippet.likes}</span>
        </div>
      </div>
    </motion.div>
  );
}
