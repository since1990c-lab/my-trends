import { describe, it, expect } from 'vitest'
import { parseIdeasFromText } from '@/lib/ai-ideas'

describe('parseIdeasFromText', () => {
  it('parses valid JSON into IdeaResponse', () => {
    const json = JSON.stringify({
      ideas: [
        { title: '이재명 재판 결과 총정리', outline: '최신 판결 내용을 정리합니다.' },
        { title: '이재명 사건 타임라인', outline: '사건 흐름을 정리합니다.' },
        { title: '주요 쟁점 5가지', outline: '논란의 핵심을 설명합니다.' },
      ],
    })
    const result = parseIdeasFromText(json)
    expect(result.ideas).toHaveLength(3)
    expect(result.ideas[0].title).toBe('이재명 재판 결과 총정리')
    expect(result.ideas[0].outline).toBe('최신 판결 내용을 정리합니다.')
  })

  it('returns empty ideas for invalid JSON', () => {
    const result = parseIdeasFromText('올바르지 않은 응답')
    expect(result.ideas).toHaveLength(0)
  })

  it('returns empty ideas when ideas field missing', () => {
    const result = parseIdeasFromText(JSON.stringify({ something: 'else' }))
    expect(result.ideas).toHaveLength(0)
  })
})
