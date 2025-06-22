"use client"
import { useCurrentUser } from '@/hooks/use-current-user'
import React from 'react'

export default  function Dashboard() {
  const user = useCurrentUser()
  return (
    <div>{JSON.stringify(user)}</div>
  )
}
