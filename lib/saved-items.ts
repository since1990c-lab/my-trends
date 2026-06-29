import type { SavedItem } from '@/types'

const STORAGE_KEY = 'my-trends-saved'

export function getSavedItems(): SavedItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as SavedItem[]) : []
  } catch {
    return []
  }
}

function persist(items: SavedItem[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

export function saveItem(keyword: string): SavedItem {
  const items = getSavedItems()
  const newItem: SavedItem = {
    id: crypto.randomUUID(),
    keyword,
    savedAt: new Date().toISOString(),
    memo: '',
  }
  persist([newItem, ...items])
  return newItem
}

export function updateMemo(id: string, memo: string): void {
  persist(getSavedItems().map((item) => (item.id === id ? { ...item, memo } : item)))
}

export function deleteItem(id: string): void {
  persist(getSavedItems().filter((item) => item.id !== id))
}
