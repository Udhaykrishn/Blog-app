import { create } from 'zustand'
import { StoreBlog } from './types/IBlog'
import { AllBlogSlice } from './slices/BlogSlice'
import { IProfileStore } from './types/IProfile'
import { ProflieSlice } from './slices/ProfileSlice'
import { userBlogProps } from './types/IUserBlogs'
import { AllUserBlogs } from './slices/UserBlogs'

type CombintedState = StoreBlog & IProfileStore & userBlogProps

export const useStore = create<CombintedState>()((...a) => ({
  ...AllBlogSlice(...a),
  ...ProflieSlice(...a),
  ...AllUserBlogs(...a)
}))
