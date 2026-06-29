import { describe, it, expect } from 'vitest'
import { parseRssItems } from '@/lib/trends'

type RawItem = { title: string; ht_approx_traffic: string; link: string }

describe('parseRssItems', () => {
  it('maps items to TrendItems with rank', () => {
    const input: RawItem[] = [
      { title: '이재명', ht_approx_traffic: '500K+', link: 'https://trends.google.com/1' },
      { title: '날씨', ht_approx_traffic: '200K+', link: 'https://trends.google.com/2' },
    ]
    const result = parseRssItems(input)
    expect(result).toHaveLength(2)
    expect(result[0]).toEqual({ rank: 1, keyword: '이재명', traffic: '500K+', url: 'https://trends.google.com/1' })
    expect(result[1].rank).toBe(2)
  })

  it('limits to 10 items', () => {
    const input: RawItem[] = Array.from({ length: 15 }, (_, i) => ({
      title: `키워드${i}`,
      ht_approx_traffic: '100K+',
      link: `https://trends.google.com/${i}`,
    }))
    expect(parseRssItems(input)).toHaveLength(10)
  })

  it('returns empty array for empty input', () => {
    expect(parseRssItems([])).toEqual([])
  })
})
