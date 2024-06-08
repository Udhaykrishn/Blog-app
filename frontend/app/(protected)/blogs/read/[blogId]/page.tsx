"use client"
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios'
import { convertFromRaw, EditorState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import Loading from '@/components/Loading'

const ReadBlogPage = () => {
  const { blogId } = useParams<{ blogId: string }>()
  const [blogData, setBlogData] = useState<{
    title: string
    content: EditorState
  }>()
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/blogs/edit/${blogId}`
        )
        setLoading(false)
        const { title, description } = response.data
        let content = EditorState.createEmpty()
        if (description) {
          try {
            const rawContent = JSON.parse(description)
            content = EditorState.createWithContent(convertFromRaw(rawContent))
          } catch (error) {
            console.error('Invalid JSON in description:', error)
          }
        }

        setBlogData({ title, content })
      } catch (error: any) {
        console.error('Error fetching blog data: ', error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchBlog()
  }, [blogId])

  if (loading) {
    return <Loading />
  }

  return (
    <div className='container mx-auto mt-10 p-4'>
      <div className='max-w-lg mx-auto'>
        <div className=' p-6 rounded-lg shadow-lg mb-4 outline'>
          <label htmlFor='title' className='block text-xl font-semibold  mb-2'>Title:</label>
          <h2 id='title' className='text-3xl font-bold'>{blogData?.title}</h2>
        </div>
        <div className='outline p-6 rounded-lg shadow-lg'>
          <label htmlFor='content' className='block text-xl font-semibold  mb-2'>Content:</label>
          <Editor
            editorState={blogData?.content}
            toolbarHidden
            readOnly
            wrapperClassName='read-blog-editor-wrapper'
            editorClassName='read-blog-editor'
          />
        </div>
      </div>
    </div>
  )
}

export default ReadBlogPage
