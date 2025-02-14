import { getPayload } from 'payload'
import config from '@/payload.config'
import Image from 'next/image'
import { Media } from '@/payload-types'

export default async function TodoPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params // Await `params` in case it’s a Promise
  const payload = await getPayload({ config: await config })

  const todo = await payload.findByID({
    collection: 'todos',
    id: resolvedParams.id,
  })

  if (!todo) {
    return <p>Todo not found.</p>
  }

  const { title, description, completed, createdAt, updatedAt, media } = todo
  const mediaData = media as Media | null

  return (
    <div>
      <h1>Todo {title}</h1>
      <p>{title}</p>
      <p>{description}</p>
      <p>{completed ? 'Completed' : 'Not Completed'}</p>
      <p>{new Date(createdAt).toLocaleString()}</p>
      <p>{new Date(updatedAt).toLocaleString()}</p>
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
