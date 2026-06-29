import { NextRequest, NextResponse } from 'next/server'
import { generateIdeas } from '@/lib/ai-ideas'

export async function POST(request: NextRequest) {
  try {
    const { keyword } = await request.json()
    if (!keyword || typeof keyword !== 'string') {
      return NextResponse.json({ error: '키워드가 필요합니다.' }, { status: 400 })
    }
    const result = await generateIdeas(keyword)
    return NextResponse.json(result)
  } catch {
    return NextResponse.json(
      { error: 'AI 아이디어 생성에 실패했습니다.' },
      { status: 500 }
    )
  }
}
