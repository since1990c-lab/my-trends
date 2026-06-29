'use client'
import type { SavedItem } from '@/types'

interface Props {
  item: SavedItem
  onMemoChange: (id: string, memo: string) => void
  onDelete: (id: string) => void
}

export default function SavedCard({ item, onMemoChange, onDelete }: Props) {
  const formattedDate = new Date(item.savedAt).toLocaleDateString('ko-KR')

  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white">
      <div className="flex items-center justify-between mb-2">
        <a
          href={`https://www.google.com/search?q=${encodeURIComponent(item.keyword)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-lg font-semibold text-blue-600 hover:underline"
        >
          {item.keyword}
        </a>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-400">{formattedDate}</span>
          <button
            onClick={() => onDelete(item.id)}
            className="text-sm text-red-500 hover:text-red-700"
          >
            삭제
          </button>
        </div>
      </div>
      <textarea
        value={item.memo}
        onChange={(e) => onMemoChange(item.id, e.target.value)}
        placeholder="메모를 입력하세요..."
        rows={2}
        className="w-full text-sm text-gray-600 border border-gray-100 rounded p-2 resize-none focus:outline-none focus:border-gray-300"
      />
    </div>
  )
}
