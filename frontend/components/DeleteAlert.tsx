import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { toast } from 'react-toastify'

function DeletePopup(userId: string) {
  const deletePost = async () => {
    try {
      const res = await axios.delete(`http://localhost:3000/${userId}`)
      if(res.data){
        toast.success("Delete Success")
      }
    } catch (error: any) {
      console.error('Error for Fetching', error.message)
    }
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className='hover:bg-red-500 hover:text-white' variant='outline'>
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>
            <Button onClick={() => deletePost}></Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeletePopup
