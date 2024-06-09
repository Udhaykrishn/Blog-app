import { StateCreator } from 'zustand'
import { IProfileStore } from '../types/IProfile'
import axios, { AxiosResponse } from 'axios'
import { IUser } from '../types/IBlog'
import { ErrorHandle } from '@/components/ErrorHandle'

export const ProflieSlice: StateCreator<IProfileStore> = set => ({
  info: [],
  fetchUserById: async (clerkId: string) => {
    try {
      const res:AxiosResponse<IUser,any> = await axios.get(`https://blog-backend-ts07.onrender.com/user/${clerkId}`)
      if(Array.isArray(res.data)){
        set({info: [...res.data]})
      }else{
        set({info:res.data})
      }
    } catch (error: any) {
      ErrorHandle(error)
    }
  }
})
