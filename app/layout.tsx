import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '한국 트렌드 대시보드',
  description: '구글 트렌드 Top 10 + 블로그 아이디어 생성기',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={`${inter.className} bg-gray-50 min-h-screen`}>
        <nav className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="max-w-2xl mx-auto flex items-center justify-between">
            <span className="font-bold text-gray-800">한국 트렌드</span>
            <div className="flex gap-4">
              <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">
                트렌드
              </Link>
              <Link href="/saved" className="text-sm text-gray-600 hover:text-gray-900">
                스크랩
              </Link>
            </div>
          </div>
        </nav>
        <main className="max-w-2xl mx-auto px-6 py-8">{children}</main>
      </body>
    </html>
  )
}
