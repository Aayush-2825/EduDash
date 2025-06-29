import { CheckCircle2Icon } from "lucide-react";

interface FormSuccessProps {
  message?: string;
}

export default function FormSuccess({ message }: FormSuccessProps) {
  if (!message) {
    return null;
  }
  return (
    <div className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500"> 
        <CheckCircle2Icon className="text-emerald h-4 w-4" />
        <span>{message}</span>
    </div>
  );
}
