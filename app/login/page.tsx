"use client";

import AlertMessage from "@/components/AlertMessage";
import { loginSchema } from "@/lib/schemas";
import { login } from "@/services/actions/user.actions";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useActionState, useEffect, useState } from "react";

const LoginForm = () => {
  const [lastResult, action] = useActionState(login, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: loginSchema });
    },

    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };
  useEffect(() => {
    if (lastResult?.status === "success") {
      setIsVisible(true);
    }
  }, [lastResult]);
  return (
    <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 ">
        {lastResult?.user && (
          <AlertMessage
            type="error"
            message={lastResult?.message || "Something went wrong!"}
            onClose={handleClose}
            isVisible={isVisible}
          />
        )}

        <section className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <div className="flex flex-col">
            <label className="font-bold">Email</label>
            <input
              className="border rounded-md"
              type="email"
              key={fields.email.key}
              name={fields.email.name}
              defaultValue={fields.email.initialValue}
            />
            <div>{fields.email.errors}</div>
          </div>
          <div className="flex flex-col">
            <label className="font-bold">Password</label>
            <input
              className="border rounded-md"
              type="password"
              key={fields.password.key}
              name={fields.password.name}
              defaultValue={fields.password.initialValue}
            />
            <div>{fields.password.errors}</div>
          </div>
          <div>
            <div className="flex items-center">
              <input
                type="checkbox"
                key={fields.remember.key}
                name={fields.remember.name}
                defaultChecked={fields.remember.initialValue === "on"}
              />
              <div className="ml-2">
                <small className="mr-2">Remember me</small>
              </div>
            </div>
          </div>
          <button className="bg-blue-700 text-white p-1 rounded-md w-full">
            Login
          </button>
        </section>
      </div>
    </form>
  );
};
export default LoginForm;
