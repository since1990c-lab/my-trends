import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import TrendCard from '@/components/TrendCard'
import type { TrendItem } from '@/types'

const mockTrend: TrendItem = {
  rank: 1,
  keyword: '이재명',
  traffic: '500K+',
  url: 'https://trends.google.com/1',
}

describe('TrendCard', () => {
  it('renders rank, keyword, traffic', () => {
    render(<TrendCard item={mockTrend} onSave={vi.fn()} onIdeas={vi.fn()} />)
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('이재명')).toBeInTheDocument()
    expect(screen.getByText('500K+')).toBeInTheDocument()
  })

  it('calls onSave with keyword when save button clicked', () => {
    const onSave = vi.fn()
    render(<TrendCard item={mockTrend} onSave={onSave} onIdeas={vi.fn()} />)
    fireEvent.click(screen.getByRole('button', { name: /스크랩/i }))
    expect(onSave).toHaveBeenCalledWith('이재명')
  })

  it('calls onIdeas with keyword when ideas button clicked', () => {
    const onIdeas = vi.fn()
    render(<TrendCard item={mockTrend} onSave={vi.fn()} onIdeas={onIdeas} />)
    fireEvent.click(screen.getByRole('button', { name: /아이디어/i }))
    expect(onIdeas).toHaveBeenCalledWith('이재명')
  })
})
