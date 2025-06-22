"use client"

import { logOut } from "@/actions/logout"

interface SignOutButtonProps {
  children?:React.ReactNode
}

export const SignOutButton = ({
  children
}:SignOutButtonProps)=>{
  const onClick = () =>{
    logOut()
  }
  return(
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  )
}