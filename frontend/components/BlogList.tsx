'use client'
import { useEffect } from 'react'
import { useStore } from '@/store/useStore'
import UserList from './UserList'

const BlogList = () => {
  const { blogs, fetchAllBlogs } = useStore()

  useEffect(() => {
    fetchAllBlogs()
  }, [fetchAllBlogs])

  return (
    <div>
      <ul>
        {blogs.map(blog => (
          <li key={blog.id}>
            <h3>{blog.title}</h3>
            <p>{blog.description}</p>
            <p>Created At: {new Date(blog.createdAt).toLocaleString()}</p>
            <p>Created At: {new Date(blog.updatedAt).toLocaleString()}</p>
            <p>
              <UserList blog={blog.user} />
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default BlogList
