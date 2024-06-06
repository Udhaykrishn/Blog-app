import { IUser } from './IBlog'

export type IProfileStore = {
  user: IUser
  fetchUserById: (clerkId:string) => Promise<void>
}
