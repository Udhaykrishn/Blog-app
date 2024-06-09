import { IUser } from './IBlog'

export type IProfileStore = {
<<<<<<< HEAD
  user: IUser | IUser[]
=======
  info: IUser[] | IUser
>>>>>>> 47984a4c649424c451b33cc33331b6b40eda38a4
  fetchUserById: (clerkId:string) => Promise<void>
}
