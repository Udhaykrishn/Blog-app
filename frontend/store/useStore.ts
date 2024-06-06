import { create } from 'zustand'
import { StoreBlog } from './types/IBlog'
import { AllBlogSlice } from './slices/BlogSlice'

export const useStore = create<StoreBlog>()((...a) => ({
  ...AllBlogSlice(...a)
}))
