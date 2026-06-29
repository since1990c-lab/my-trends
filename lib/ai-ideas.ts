import Anthropic from '@anthropic-ai/sdk'
import type { IdeaResponse } from '@/types'

let _client: Anthropic | null = null

function getClient(): Anthropic {
  if (!_client) {
    _client = new Anthropic()
  }
  return _client
}

export function parseIdeasFromText(text: string): IdeaResponse {
  try {
    const parsed = JSON.parse(text)
    if (Array.isArray(parsed?.ideas)) return parsed as IdeaResponse
    return { ideas: [] }
  } catch {
    return { ideas: [] }
  }
}

export async function generateIdeas(keyword: string): Promise<IdeaResponse> {
  const message = await getClient().messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 1024,
    messages: [
      {
        role: 'user',
        content: `당신은 한국 블로그 콘텐츠 기획 전문가입니다.
다음 키워드로 정보성 블로그 글 아이디어 3개를 제안해주세요.

키워드: ${keyword}

반드시 다음 JSON 형식으로만 응답하세요 (다른 텍스트 없이):
{"ideas": [{"title": "제목", "outline": "개요 1-2문장"}, {"title": "제목", "outline": "개요 1-2문장"}, {"title": "제목", "outline": "개요 1-2문장"}]}`,
      },
    ],
  })
  const text = message.content[0].type === 'text' ? message.content[0].text : ''
  return parseIdeasFromText(text)
}
