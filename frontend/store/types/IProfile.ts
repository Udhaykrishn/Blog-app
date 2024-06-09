import { IUser } from './IBlog'

export type IProfileStore = {
  info: IUser[] | IUser
  fetchUserById: (clerkId:string) => Promise<void>
}
