import React from 'react'
import { IUser } from '@/store/types/IBlog'

type UserListProps = {
  blog: IUser
}

const UserList = ({ blog }: UserListProps) => {
  return (
    <>
      <div>
        <ul key={blog.userId}>
          <li>Email: {blog.email}</li>
          <li>FirstName: {blog.firstName}</li>
          <li>LastName: {blog.lastName}</li>
        </ul>
      </div>
    </>
  )
}

export default UserList
