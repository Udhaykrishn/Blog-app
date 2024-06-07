'use client'
import React, { useState } from 'react'
import { z } from 'zod'
import {
  EditorState,
  convertToRaw,
  convertFromRaw
} from 'draft-js'
import TipTapEditor from './TipTapEditor'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

type BlogFormData = {
  title: string
  content: EditorState
}

const titleSchema = z.string().min(1, 'Title is required')
const contentSchema = z.string().min(1, 'Content is required')

const BlogCreateForm: React.FC = () => {
  const { userId } = useParams<{ userId: string }>()
  const router = useRouter()
  const [formData, setFormData] = useState<BlogFormData>({
    title: '',
    content: EditorState.createEmpty()
  })

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, title: e.target.value })
  }

  const handleContentChange = (content: EditorState) => {
    setFormData({ ...formData, content })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const titleResult = titleSchema.safeParse(formData.title)
    const contentPlainText = formData.content.getCurrentContent().getPlainText()
    const contentResult = contentSchema.safeParse(contentPlainText)

    if (!titleResult.success || !contentResult.success) {
      console.error(titleResult.error?.issues, contentResult.error?.issues)
      return
    }

    const contentRaw = convertToRaw(formData.content.getCurrentContent())
    const stringContext = JSON.stringify(contentRaw)
    const requestData = {
      title: formData.title,
      description: stringContext
    }
    try {
      const response = await axios.post(
        `http://localhost:3000/blogs/${userId}`,
        requestData
      )
      if (response.data) {
        toast.success('Successfully created')
        // Clear the form data
        setFormData({
          title: '',
          content: EditorState.createEmpty()
        })
        // Redirect to the blogs page
        router.push('/blogs')
      }
    } catch (error: any) {
      console.error('Error fetching data', error.message)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='container rounded-lg bg-gray-800 p-6 text-white shadow-md'
    >
      <div className='mb-4'>
        <label htmlFor='title' className='mb-2 block font-bold text-white'>
          Title
        </label>
        <input
          type='text'
          id='title'
          value={formData.title}
          onChange={handleTitleChange}
          required
          className='w-full appearance-none rounded border bg-gray-700 px-3 py-2 leading-tight text-white shadow focus:outline-none'
        />
        {formData.title.length === 0 && (
          <p className='mt-1 text-sm text-red-500 dark:text-red-400'>
            Title is required
          </p>
        )}
      </div>

      <div className='mb-4'>
        <label htmlFor='content' className='mb-2 block font-bold text-white'>
          Content
        </label>
        <TipTapEditor
          onContentChange={handleContentChange}
          initialContent={formData.content}
          darkMode
        />
        {formData.content.getCurrentContent().getPlainText().length === 0 && (
          <p className='mt-1 text-sm text-red-500 dark:text-red-400'>
            Content is required
          </p>
        )}
      </div>

      <div className='flex items-center justify-between'>
        <button
          type='submit'
          className='focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none'
        >
          Create Blog
        </button>
      </div>
    </form>
  )
}

export default BlogCreateForm
