import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'

import config from '@/payload.config'
import './styles.css'
import Link from 'next/link'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  const todos = await payload.find({
    collection: 'todos',
    limit: 100,
  })

  return (
    <div>
      <h1>Payload Todo List {user?.email}</h1>
      <div className="Todos">
        <h2>Todos</h2>
        {todos.docs.map((todo) => (
          <Link href={`/todos/${todo.id}`} key={todo.id} style={{ textDecoration: 'none' }}>
            <div style={{ border: '1px solid #ccc', padding: '10px' }}>
              <h3>{todo.title}</h3>
              <p>{todo.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
