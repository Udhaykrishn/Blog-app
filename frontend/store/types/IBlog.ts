export interface IUser {
  userId: string
  firstName: string
  lastName: string
  email: string
}
interface IBlog {
  id: string
  title: string
  description: string
  userId: string
  createdAt: string
  updatedAt: string
  user: IUser
}

export type StoreBlog = {
  blogs: IBlog[]
  fetchAllBlogs: () => Promise<void>
}
