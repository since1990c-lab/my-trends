'use client'
import { useState, useEffect } from 'react'
import SavedCard from '@/components/SavedCard'
import { getSavedItems, updateMemo, deleteItem } from '@/lib/saved-items'
import type { SavedItem } from '@/types'

export default function SavedPage() {
  const [items, setItems] = useState<SavedItem[]>([])

  useEffect(() => {
    setItems(getSavedItems())
  }, [])

  function handleMemoChange(id: string, memo: string) {
    updateMemo(id, memo)
    setItems(getSavedItems())
  }

  function handleDelete(id: string) {
    deleteItem(id)
    setItems(getSavedItems())
  }

  return (
    <div>
      <h1 className="text-xl font-bold text-gray-800 mb-6">스크랩 목록</h1>

      {items.length === 0 ? (
        <p className="text-gray-400 text-sm text-center py-12">
          저장된 키워드가 없습니다. 트렌드 페이지에서 스크랩해보세요.
        </p>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <SavedCard
              key={item.id}
              item={item}
              onMemoChange={handleMemoChange}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  )
}
