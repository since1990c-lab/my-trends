import type { IdeaItem } from '@/types'

interface Props {
  ideas: IdeaItem[]
  loading: boolean
}

export default function IdeaPanel({ ideas, loading }: Props) {
  if (loading) {
    return (
      <div className="mt-1 p-4 bg-blue-50 rounded-lg text-sm text-blue-600">
        아이디어 생성 중...
      </div>
    )
  }

  if (ideas.length === 0) {
    return (
      <div className="mt-1 p-4 bg-gray-50 rounded-lg text-sm text-gray-400">
        아이디어가 없습니다.
      </div>
    )
  }

  return (
    <div className="mt-1 p-4 bg-blue-50 rounded-lg space-y-3">
      {ideas.map((idea, i) => (
        <div key={i} className="flex items-start gap-2">
          <span className="text-sm font-semibold text-blue-800 shrink-0">{i + 1}.</span>
          <div>
            <p className="text-sm font-semibold text-blue-800">{idea.title}</p>
            <p className="text-sm text-blue-600 mt-0.5">{idea.outline}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
