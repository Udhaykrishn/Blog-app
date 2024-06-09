import { StateCreator } from 'zustand'
import { IProfileStore } from '../types/IProfile'
import axios from 'axios'

export const ProflieSlice: StateCreator<IProfileStore> = set => ({
  user: [],
  fetchUserById: async (clerkId: string) => {
    try {
      const res = await axios.get(`https://blog-backend-ts07.onrender.com/user/${clerkId}`)
      set({ user: res.data })
    } catch (error: any) {
      console.error('Error', error.message)
    }
  }
})
