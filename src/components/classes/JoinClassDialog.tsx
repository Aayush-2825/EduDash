"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { JoinClassSchema } from "@/schemas";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import FormError from "../auth/FormError";
import FormSuccess from "../auth/FormSuccess";
import { JoinClass } from "@/actions/join-class";

export const JoinClassDialog = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof JoinClassSchema>>({
    resolver: zodResolver(JoinClassSchema),
    defaultValues: {
      classID: "",
    },
  });

  const onSubmit = (values: z.infer<typeof JoinClassSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      JoinClass(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  return (
    <Dialog>
      <DialogTrigger className="border-2 border-blue-600 p-1 rounded-full cursor-pointer ">
        <MdOutlineCreateNewFolder size={24} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Join to class</DialogTitle>
          {/* <DialogDescription></DialogDescription> */}
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="classID"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter Class ID to Join</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Class Name"
                        disabled={isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button type="submit" className="w-full dark:text-white">
              Join!
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
