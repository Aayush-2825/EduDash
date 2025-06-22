"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { FaUser } from "react-icons/fa";
import { useCurrentUser } from "@/hooks/use-current-user";
import { SignOutButton } from "./SignoutButton";
import { IoExitOutline } from "react-icons/io5";

export const UserButton = () => {
  const user = useCurrentUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback className="bg-sky-500">
            <FaUser className="text-white" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48" align="end">
        <DropdownMenuLabel>
          {user?.name || "User"}
          <div className="text-xs text-muted-foreground truncate">
            {user?.email}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <IoExitOutline className="mr-2 ml-4 h-4 w-4 inline-block " />
        <SignOutButton>Sign Out</SignOutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
