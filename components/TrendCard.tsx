'use client'
import type { TrendItem } from '@/types'

interface Props {
  item: TrendItem
  onSave: (keyword: string) => void
  onIdeas: (keyword: string) => void
}

export default function TrendCard({ item, onSave, onIdeas }: Props) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white flex items-center gap-4">
      <span className="text-2xl font-bold text-gray-300 w-8 text-center shrink-0">
        {item.rank}
      </span>
      <div className="flex-1 min-w-0">
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-lg font-semibold text-gray-800 hover:text-blue-600 truncate block"
        >
          {item.keyword}
        </a>
        <p className="text-sm text-gray-400">{item.traffic}</p>
      </div>
      <div className="flex gap-2 shrink-0">
        <button
          onClick={() => onSave(item.keyword)}
          className="px-3 py-1 text-sm bg-green-50 text-green-700 border border-green-200 rounded hover:bg-green-100"
        >
          스크랩 저장
        </button>
        <button
          onClick={() => onIdeas(item.keyword)}
          className="px-3 py-1 text-sm bg-blue-50 text-blue-700 border border-blue-200 rounded hover:bg-blue-100"
        >
          AI 아이디어
        </button>
      </div>
    </div>
  )
}
