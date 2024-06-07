'use client'
import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter
} from './ui/alert-dialog'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import { FaTrashAlt } from 'react-icons/fa'

const DeleteBlogDialog = ({ blogId }: { blogId: string }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const router = useRouter()
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/blogs/${blogId}`)
      toast.success('Blog deleted successfully')
      window.location.reload()
      setIsDialogOpen(false)
    } catch (error) {
      toast.error('Error deleting blog')
      console.error('Error deleting blog:', error)
    }
  }

  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <AlertDialogTrigger asChild>
        <Button variant='outline' className='hover:bg-red-500 hover:text-white'>
          <FaTrashAlt className='mr-2' />  Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>
            <Button onClick={handleDelete}>Yes</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteBlogDialog
