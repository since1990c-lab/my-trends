import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import IdeaPanel from '@/components/IdeaPanel'
import type { IdeaItem } from '@/types'

const mockIdeas: IdeaItem[] = [
  { title: '이재명 재판 결과 총정리', outline: '최신 판결 내용을 정리합니다.' },
  { title: '이재명 사건 타임라인', outline: '사건 흐름을 정리합니다.' },
]

describe('IdeaPanel', () => {
  it('shows loading text when loading is true', () => {
    render(<IdeaPanel ideas={[]} loading={true} />)
    expect(screen.getByText(/생성 중/i)).toBeInTheDocument()
  })

  it('renders idea titles and outlines when loaded', () => {
    render(<IdeaPanel ideas={mockIdeas} loading={false} />)
    expect(screen.getByText('이재명 재판 결과 총정리')).toBeInTheDocument()
    expect(screen.getByText('최신 판결 내용을 정리합니다.')).toBeInTheDocument()
  })

  it('shows empty message when ideas array is empty', () => {
    render(<IdeaPanel ideas={[]} loading={false} />)
    expect(screen.getByText(/아이디어가 없습니다/i)).toBeInTheDocument()
  })
})
