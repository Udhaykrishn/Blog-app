export interface ICount {
  blogs: number
}

export interface IUserBlog{
  userId:string;
  firstName:string;
  lastName:string;
  email:string;
  image_url:string;
  _count:ICount
}

export interface IUser {
  userId: string
  firstName: string
  lastName: string
  email: string
  image_url: string
  _count: ICount
}

export interface IBlog {
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
