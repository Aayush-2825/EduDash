"use client";
import Image from "next/image";
import React from "react";
import { ModeToggle } from "./mode-toggle";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { usePathname } from "next/navigation";
import { SignOutButton } from "../auth/SignoutButton";
import { UserButton } from "../auth/UserButton";
import Link from "next/link";

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <header className={`dark:shadow-white/10 shadow-md p-2 w-full  max-h-`}>
      <nav className="p-4 flex justify-between items-center ">
        <div className="flex items-center gap-3">
          {pathname !== "/" && (
            <SidebarTrigger className="text-gray-600 dark:text-gray-300 hover:text-gray-800" />
          )}
          <Link href={"/"}>
            <Image src="/icon.ico" alt="Logo" width={48} height={60} />
          </Link>
          <Link href={'/'}>
          <h1 className="text-red-600 dark:text-red-400 text-3xl font-bold tracking-tight flex items-end relative">
            Prakash
            <span className="ml-1 text-gray-700 dark:text-gray-300 text-xl font-medium absolute top-6 -right-6">
              Classes
            </span>
          </h1>
          </Link>
        </div>
        <div>
          <div className="flex gap-x-4">
            <ModeToggle />
            {pathname !== "/" && <SignOutButton />}
            {pathname !== "/" && <UserButton />}
          </div>
        </div>
      </nav>
    </header>
  );
};
