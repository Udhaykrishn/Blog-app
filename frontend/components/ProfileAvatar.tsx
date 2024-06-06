import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

type ProfileAvatarProps = {
  image_url: string
  name: string
}

export function ProfileAvatar({ image_url, name }: ProfileAvatarProps) {
  return (
    <Avatar>
      <AvatarImage src={image_url} alt={name} />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}
