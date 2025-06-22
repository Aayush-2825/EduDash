"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "../ui/button";
import {signIn} from "next-auth/react"
import { getDefaultLoginRedirect } from "@/routes";
 
export const Social = () => {

  const onClick = (provider: "google"| "github") =>{
    signIn(provider,{
      callbackUrl:getDefaultLoginRedirect("student"),
    })
  }


  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        variant="outline"
        size="lg"
        className="w-1/2 cursor-pointer"
        onClick={() => onClick("google")}
      >
        <FcGoogle className="h-5 w-5" />
      </Button>
      <Button
        variant="outline"
        className="w-1/2 cursor-pointer"
        size="lg"
        onClick={() => onClick("github")}
      >
        <FaGithub className="h-5 w-5" />
      </Button>
    </div>
  );
};
