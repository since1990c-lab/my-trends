import { NextResponse } from 'next/server'
import { fetchKoreanTrends } from '@/lib/trends'

export async function GET() {
  try {
    const trends = await fetchKoreanTrends()
    return NextResponse.json(trends)
  } catch {
    return NextResponse.json(
      { error: '트렌드를 불러오는데 실패했습니다.' },
      { status: 500 }
    )
  }
}
