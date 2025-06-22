'use client'

import { useCurrentUser } from "@/hooks/use-current-user"

export const LectureUpload = () => {
    const user = useCurrentUser();
  return (
    <div>
    {user?.name || ""}
    </div>
  )
}
