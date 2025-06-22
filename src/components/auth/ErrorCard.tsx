import { Header } from "./Header"
import BackButton from "./BackButton"
import { Card, CardFooter, CardHeader } from "../ui/card"
import { CardWrapper } from "./CardWrapper"
import { FaExclamationCircle } from "react-icons/fa"

export const ErrorCard = () => {
  return (
    <CardWrapper headerLabel="Oops!something went wrong" backButtonLabel="Back to Login" backButtonHref="/auth/login">
        <div className="w-full flex items-center justify-center">
            <FaExclamationCircle className="text-destructive"/>
        </div>
    </CardWrapper>
  )
}
