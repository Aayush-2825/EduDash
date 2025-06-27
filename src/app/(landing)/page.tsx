import { LoginButton } from "@/components/auth/LoginButton";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="flex flex-row items-center justify-around ">
      <div className="text-center flex flex-col items-center justify-center gap-2 ">
        <Image
          src="/icon.ico"
          alt="Logo"
          width={100}
          height={100}
          className="mb-4"
        />
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-2">
          Welcome to Prakash Classes!
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Your journey to success starts here.
        </p>
        <div className="mt-4">
        <LoginButton mode="redirect" asChild>
        <Button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 ease-in-out">
          Get Started
        </Button>
        </LoginButton>
      </div>
      </div>
      <div>
      <div className="mt-8">
        <Image
          src={"/landing.jpg"}
          alt="Landing Image"
          width={300}
          height={400}
          className="rounded-lg shadow-lg hidden md:block"
        />
      </div>
      
      </div>
    </div>
  );
}
