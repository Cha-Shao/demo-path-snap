import savedPosts from '@/data/posts'
import { shuffle } from 'lodash'
import {
  NextRequest,
  NextResponse
} from 'next/server'

export const GET = async (req: NextRequest) => {
  const posts = savedPosts
  return NextResponse.json(
    shuffle(posts)
  )
}
