import { getPayload } from 'payload'
import config from '@/payload.config'
import Image from 'next/image'
import { Media } from '@/payload-types'
import { headers } from 'next/headers'

export default async function TodoPage({ params }: { params: { id: string } }) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const todoID = params.id

  const todo = await payload.findByID({
    collection: 'todos',
    id: todoID,
  })

  const { title, description, completed, createdAt, updatedAt, media } = todo
  const mediaData = media as Media | null

  return (
    <div>
      <h1>Todo {title}</h1>
      <p>{title}</p>
      <p>{description}</p>
      <p>{completed ? 'Completed' : 'Not Completed'}</p>
      <p>{createdAt}</p>
      <p>{updatedAt}</p>
      {mediaData?.url && (
        <Image
          src={mediaData.url}
          alt={mediaData.alt ?? 'Todo image'}
          width={mediaData.width ?? 100}
          height={mediaData.height ?? 100}
        />
      )}
    </div>
  )
}
