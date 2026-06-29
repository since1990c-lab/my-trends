import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import SavedCard from '@/components/SavedCard'
import type { SavedItem } from '@/types'

const mockItem: SavedItem = {
  id: 'test-id',
  keyword: '이재명',
  savedAt: '2026-06-29T00:00:00.000Z',
  memo: '테스트 메모',
}

describe('SavedCard', () => {
  it('renders keyword', () => {
    render(<SavedCard item={mockItem} onMemoChange={vi.fn()} onDelete={vi.fn()} />)
    expect(screen.getByText('이재명')).toBeInTheDocument()
  })

  it('renders memo in textarea', () => {
    render(<SavedCard item={mockItem} onMemoChange={vi.fn()} onDelete={vi.fn()} />)
    expect(screen.getByDisplayValue('테스트 메모')).toBeInTheDocument()
  })

  it('calls onDelete with id when delete button clicked', () => {
    const onDelete = vi.fn()
    render(<SavedCard item={mockItem} onMemoChange={vi.fn()} onDelete={onDelete} />)
    fireEvent.click(screen.getByRole('button', { name: /삭제/i }))
    expect(onDelete).toHaveBeenCalledWith('test-id')
  })

  it('calls onMemoChange with id and new value when textarea changes', () => {
    const onMemoChange = vi.fn()
    render(<SavedCard item={mockItem} onMemoChange={onMemoChange} onDelete={vi.fn()} />)
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '새 메모' } })
    expect(onMemoChange).toHaveBeenCalledWith('test-id', '새 메모')
  })
})
