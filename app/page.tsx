'use client'
import { useState } from 'react'
import TrendCard from '@/components/TrendCard'
import IdeaPanel from '@/components/IdeaPanel'
import { saveItem } from '@/lib/saved-items'
import type { TrendItem, IdeaItem } from '@/types'

export default function HomePage() {
  const [trends, setTrends] = useState<TrendItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [activeKeyword, setActiveKeyword] = useState<string | null>(null)
  const [ideas, setIdeas] = useState<IdeaItem[]>([])
  const [ideasLoading, setIdeasLoading] = useState(false)

  async function handleRefresh() {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/trends')
      if (!res.ok) throw new Error()
      setTrends(await res.json())
    } catch {
      setError('트렌드를 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요.')
    } finally {
      setLoading(false)
    }
  }

  function handleSave(keyword: string) {
    saveItem(keyword)
  }

  async function handleIdeas(keyword: string) {
    if (activeKeyword === keyword) {
      setActiveKeyword(null)
      setIdeas([])
      return
    }
    setActiveKeyword(keyword)
    setIdeas([])
    setIdeasLoading(true)
    try {
      const res = await fetch('/api/ai-ideas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keyword }),
      })
      const data = await res.json()
      setIdeas(data.ideas ?? [])
    } catch {
      setIdeas([])
    } finally {
      setIdeasLoading(false)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-800">구글 트렌드 Top 10 (한국)</h1>
        <button
          onClick={handleRefresh}
          disabled={loading}
          className="px-4 py-2 bg-gray-800 text-white text-sm rounded hover:bg-gray-700 disabled:opacity-50"
        >
          {loading ? '불러오는 중...' : '새로고침'}
        </button>
      </div>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      {trends.length === 0 && !loading && !error && (
        <p className="text-gray-400 text-sm text-center py-12">
          새로고침 버튼을 눌러 트렌드를 불러오세요.
        </p>
      )}

      <div className="space-y-2">
        {trends.map((trend) => (
          <div key={trend.rank}>
            <TrendCard item={trend} onSave={handleSave} onIdeas={handleIdeas} />
            {activeKeyword === trend.keyword && (
              <IdeaPanel ideas={ideas} loading={ideasLoading} />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
