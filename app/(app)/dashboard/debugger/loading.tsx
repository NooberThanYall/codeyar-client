export default function Loading() {
  return (
    <div className="flex h-screen items-center justify-center bg-[#121212]">
      <div className="flex flex-col items-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-gray-700 border-t-red-600"></div>
        <p className="mt-4 text-lg text-gray-400">در حال بارگذاری دیباگر هوشمند...</p>
      </div>
    </div>
  )
}
