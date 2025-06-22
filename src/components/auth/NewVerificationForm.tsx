"use client";
import { CardWrapper } from "./CardWrapper";
import { ClipLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { newVerification } from "@/actions/new-verification";
import FormSuccess from "./FormSuccess";
import FormError from "./FormError";

export const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const onSubmit = useCallback(() => {
    if (success || error) return;
    if (!token) return;
    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Something went wrong!");
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);
  return (
    <CardWrapper
      backButtonHref="/auth/login"
      backButtonLabel="back to login"
      headerLabel="Confirm your Verification!"
    >
      <div className="flex items-center w-full justify-center">
        {!success && !error && <ClipLoader />}
        <FormSuccess message={success} />
        {!success && <FormError message={error} />}
      </div>
    </CardWrapper>
  );
};
