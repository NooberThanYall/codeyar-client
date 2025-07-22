"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Copy,
  Check,
  Heart,
  Share,
  Edit,
  Trash2,
  Pen,
  BotMessageSquare,
} from "lucide-react";
import Link from "next/link";
import { handleAcceptSuggestion, handleAIRequest } from "@/lib/auth/mainFunctions";

interface Snippet {
  _id: number;
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

interface SnippetModalProps {
  snippet: Snippet | null;
  isOpen: boolean;
  onClose: () => void;
}

export function SnippetModal({ snippet, isOpen, onClose }: SnippetModalProps) {
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(snippet?.isLiked || false);
  const [aiPopup, setAIPopup] = useState(false);
  const [optimizedCode, setOptimizedCode] = useState<string>("");
  const [loading, setLoading] = useState(false);

  if (!snippet || !isOpen) return null;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(snippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLike = () => {
    setLiked(!liked);
  };

  return (
    <>
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-[#1e1e1e] border border-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        dir="rtl"
        >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div className="flex-1">
            <h2 className="text-xl font-bold text-white">{snippet.title}</h2>
            <p className="text-gray-400 mt-1">{snippet.description}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-2 rounded-md hover:bg-gray-700"
            >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Meta Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span>نویسنده: {snippet.author}</span>
              <span>•</span>
              <span>{snippet.createdAt}</span>
            </div>
            <div className="flex items-center gap-2">
              {/* <Link href={`/dashboard/snippets/edit/${snippet._id}`}> */}
              <button
                className={`flex items-center gap-2 px-3 py-1 bg-blue-800 text-gray-300 rounded-lg hover:bg-blue-500 transition-colors ${
                  loading ? "opacity-60" : null
                }`}
                onClick={() => {
                  handleAIRequest(
                    setLoading,
                    snippet,
                    setOptimizedCode,
                    setAIPopup
                  );
                }}
                >
                <BotMessageSquare className="h-4 w-4" />
                پیشنهاد هوش مصنوعی
              </button>
              {/* </Link> */}
              <button
                onClick={handleLike}
                className={`flex items-center gap-1 px-3 py-1 rounded-lg transition-colors ${
                  liked
                  ? "bg-red-900/30 text-red-400 hover:bg-red-900/50"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                }`}
                >
                <Heart className={`h-4 w-4 ${liked ? "fill-current" : ""}`} />
                <span>{liked ? snippet.likes + 1 : snippet.likes}</span>
              </button>
              <Link href={`/dashboard/snippets/edit/${snippet._id}`}>
                <button className="flex items-center gap-2 px-3 py-1 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors">
                  <Pen className="h-4 w-4" />
                  ویرایش
                </button>
              </Link>
              <button className="flex items-center gap-2 px-3 py-1 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors">
                <Share className="h-4 w-4" />
                اشتراک
              </button>
              {snippet.author === "شما" && (
                <>
                  <button className="flex items-center gap-2 px-3 py-1 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors">
                    <Edit className="h-4 w-4" />
                    ویرایش
                  </button>
                  <button className="flex items-center gap-2 px-3 py-1 bg-gray-800 text-red-400 rounded-lg hover:bg-red-900/20 transition-colors">
                    <Trash2 className="h-4 w-4" />
                    حذف
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Code Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">کد</h3>
              <button
                onClick={handleCopy}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  copied
                  ? "bg-green-900/30 text-green-400"
                  : "bg-red-600 text-white hover:bg-red-700"
                }`}
                >
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.div
                    key="check"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="flex items-center gap-2"
                    >
                      <Check className="h-4 w-4" />
                      <span>کپی شد!</span>
                    </motion.div>
                  ) : (
                    <motion.div
                    key="copy"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="flex items-center gap-2"
                    >
                      <Copy className="h-4 w-4" />
                      <span>کپی کد</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>

            <div className="bg-[#252525] border border-gray-700 rounded-lg p-4 overflow-x-auto">
              <pre
                className="text-sm text-gray-300 font-mono whitespace-pre-wrap text-left"
                dir="ltr"
                >
                <code>{snippet.code}</code>
              </pre>
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">برچسب‌ها</h3>
            <div className="flex flex-wrap gap-2">
              {snippet.tags.map((tag) => (
                <span key={tag} className="text-red-500 text-sm">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>

    {aiPopup ? (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#1e1e1e] border border-gray-800 p-6 rounded-lg w-full max-w-3xl">
        <h2 className="text-white text-lg font-bold mb-4">پیشنهاد هوش مصنوعی</h2>
        <pre className="bg-[#252525] border border-gray-700 rounded p-4 text-gray-300 max-h-96 overflow-auto text-sm whitespace-pre-wrap">
          <code>{optimizedCode}</code>
        </pre>
        <div className="flex justify-end gap-4 mt-4">
          <button
            className="bg-green-700 hover:bg-green-800 text-white py-2 px-4 rounded"
            onClick={() => {
              handleAcceptSuggestion(snippet, optimizedCode, onClose, setAIPopup)
            }}
          >
            ذخیره تغییرات
          </button>
          <button
            className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded"
            onClick={() => setAIPopup(false)}
          >
            بستن
          </button>
        </div>
      </div>
    </div>
    ): null}
    </>
  );
}
