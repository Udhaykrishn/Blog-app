'use client'
import React, { useEffect, useState } from 'react'
import { z } from 'zod'
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js'
import TipTapEditor from './TipTapEditor'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import Loading from './Loading'
import { ErrorHandle } from './ErrorHandle'

type BlogFormData = {
  title: string
  content: EditorState
}

const titleSchema = z.string().min(1)
const contentSchema = z.string().min(1)

const EditBlogpage = ({ id }: { id: string }) => {
  const router = useRouter()
  const [formData, setFormData] = useState<BlogFormData>({
    title: '',
    content: EditorState.createEmpty()
  })
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://blog-backend-ts07.onrender.com/blogs/edit/${id}`)
        const { title, description } = res.data

        let content = EditorState.createEmpty()
        if (description) {
          try {
            const rawContent = JSON.parse(description)
            content = EditorState.createWithContent(convertFromRaw(rawContent))
          } catch (error) {
            ErrorHandle(error)
          }
        }

        setFormData({
          title: title ?? '',
          content: content
        })
      } catch (error) {
        ErrorHandle(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [id])

  if (loading) return <Loading />

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
    const stringContent = JSON.stringify(contentRaw)
    const requestData = {
      title: formData.title,
      description: stringContent
    }
    try {
      const response = await axios.patch(
        `https://blog-backend-ts07.onrender.com/blogs/${id}`,
        requestData
      )
      if (response.data) {
        toast.success('Successfully updated')
        router.push('/blogs')
      }
    } catch (error: any) {
      ErrorHandle(error)
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
        {formData.title?.length === 0 && (
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
          Update Blog
        </button>
      </div>
    </form>
  )
}

export default EditBlogpage
