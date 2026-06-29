import { describe, it, expect, beforeEach } from 'vitest'
import { getSavedItems, saveItem, updateMemo, deleteItem } from '@/lib/saved-items'

beforeEach(() => {
  localStorage.clear()
})

describe('getSavedItems', () => {
  it('returns empty array when nothing saved', () => {
    expect(getSavedItems()).toEqual([])
  })
})

describe('saveItem', () => {
  it('saves keyword and returns new item', () => {
    const item = saveItem('이재명')
    expect(item.keyword).toBe('이재명')
    expect(item.memo).toBe('')
    expect(item.id).toBeTruthy()
    expect(getSavedItems()).toHaveLength(1)
  })

  it('prepends new items so newest is first', () => {
    saveItem('이재명')
    saveItem('날씨')
    expect(getSavedItems()[0].keyword).toBe('날씨')
  })
})

describe('updateMemo', () => {
  it('updates memo for matching id', () => {
    const item = saveItem('이재명')
    updateMemo(item.id, '블로그 글 쓸 예정')
    expect(getSavedItems()[0].memo).toBe('블로그 글 쓸 예정')
  })
})

describe('deleteItem', () => {
  it('removes item by id', () => {
    const item = saveItem('이재명')
    deleteItem(item.id)
    expect(getSavedItems()).toHaveLength(0)
  })
})
