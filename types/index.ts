export interface TrendItem {
  rank: number
  keyword: string
  traffic: string
  url: string
}

export interface SavedItem {
  id: string
  keyword: string
  savedAt: string
  memo: string
}

export interface IdeaItem {
  title: string
  outline: string
}

export interface IdeaResponse {
  ideas: IdeaItem[]
}
