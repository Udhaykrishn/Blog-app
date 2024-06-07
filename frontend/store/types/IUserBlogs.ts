import { IBlog } from './IBlog'

export interface userBlogProps {
  blogs: IBlog[]
  getAllBlogById: (userId: string | null | undefined) => Promise<void>
}
