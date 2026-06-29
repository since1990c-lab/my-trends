import Parser from 'rss-parser'
import type { TrendItem } from '@/types'

type CustomItem = { title: string; ht_approx_traffic: string; link: string }

const parser = new Parser<Record<string, never>, CustomItem>({
  customFields: { item: [['ht:approx_traffic', 'ht_approx_traffic']] },
})

export function parseRssItems(items: CustomItem[]): TrendItem[] {
  return items.slice(0, 10).map((item, index) => ({
    rank: index + 1,
    keyword: item.title ?? '',
    traffic: item.ht_approx_traffic ?? '-',
    url: item.link ?? '',
  }))
}

export async function fetchKoreanTrends(): Promise<TrendItem[]> {
  const feed = await parser.parseURL('https://trends.google.com/trending/rss?geo=KR')
  return parseRssItems(feed.items as CustomItem[])
}
