import { create } from 'zustand'
import { StoreBlog } from './types/IBlog'
import { AllBlogSlice } from './slices/BlogSlice'
import { IProfileStore } from './types/IProfile'
import { ProflieSlice } from './slices/ProfileSlice'

export const useStore = create<StoreBlog>()((...a) => ({
  ...AllBlogSlice(...a)
}))

export const useProfileStore = create<IProfileStore>()((...a) => ({
  ...ProflieSlice(...a)
}))
