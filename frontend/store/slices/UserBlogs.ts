import { StateCreator } from 'zustand'
import axios from 'axios'
import { userBlogProps } from '../types/IUserBlogs'

export const AllUserBlogs: StateCreator<userBlogProps> = set => ({
  blogs: [],
  getAllBlogById: async (userId: string | null | undefined) => {
    try {
      const res = await axios.get(`http://localhost:3000/blogs/${userId}`)
      set({ blogs: res.data })
    } catch (error: any) {
      console.error('Error Fetching Data', error.message)
    }
  }
})
