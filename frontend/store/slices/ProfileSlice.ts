import { StateCreator } from 'zustand'
import { IProfileStore } from '../types/IProfile'
import axios from 'axios'
import { IUser } from '../types/IBlog'
import { ErrorHandle } from '@/components/ErrorHandle'

export const ProflieSlice: StateCreator<IProfileStore> = set => ({
  user: [],
  fetchUserById: async (clerkId: string) => {
    try {
      const res = await axios.get<IUser>(`https://blog-backend-ts07.onrender.com/user/${clerkId}`)
      if(Array.isArray(res.data)){
        set({user:[...res.data]})
      }else{
        set({user:res.data})
      }
    } catch (error: any) {
      ErrorHandle(error)
    }
  }
})
