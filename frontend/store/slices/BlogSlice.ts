import { State, StateCreator } from 'zustand'
import { StoreBlog } from '../types/IBlog'
import axios from 'axios'


export const AllBlogSlice: StateCreator<StoreBlog> = set => ({
  blogs: [],
  fetchAllBlogs: async () => {
    try {
      const res = await axios.get('https://blog-backend-ts07.onrender.com/blogs')
      set({ blogs: res.data })
    } catch (error) {
      console.error('Error', error)
    }
  }
})
