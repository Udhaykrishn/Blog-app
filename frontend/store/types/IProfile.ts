import { IUser } from './IBlog'

export type IProfileStore = {
  user: IUser | IUser[]
  fetchUserById: (clerkId:string) => Promise<void>
}
