/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Container from "@/components/ui/container";
import { InputField, TextArea } from "@/components/ui/input";
import { TypographyHeading, TypographyP } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import schema from "./schema/register";
import { z } from "zod";
import api from "@/lib/api";
import { toast } from "sonner";

type RegisterFormValues = z.infer<typeof schema>;

export default function RegisterScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const res = await api.post("/register", {
        email: data.email,
        fullName: data.fullName,
        password: data.password,
      });

      if (res.status === 200) {
        toast.success("Registration successful!");
      }
    } catch (err: any) {
      const errors = err.response?.data?.errors;
      if (errors && Array.isArray(errors)) {
        errors.forEach((e: string) => toast.error(e));
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <Container>
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <div>
          <TypographyHeading as="h1">Register</TypographyHeading>
          <TypographyP>
            {`Let’s Sign up first for enter into Square Website. Uh She Up!`}
          </TypographyP>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-xl bg-white p-7 my-3.5 rounded-3xl grid grid-cols-1 lg:grid-cols-2 gap-5"
        >
          <div className="col-span-full">
            <InputField
              id="fullName"
              label="Full Name"
              {...register("fullName")}
              helperText={errors.fullName?.message}
            />
          </div>
          <div className="col-span-full">
            <InputField
              id="email"
              label="Email"
              {...register("email")}
              helperText={errors.email?.message}
            />
          </div>
          <div className="col-span-full">
            <InputField
              id="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              {...register("password")}
              helperText={errors.password?.message}
              iconRight={
                <button
                  type="button"
                  className="cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              }
            />
          </div>
          <div className="col-span-full">
            <InputField
              id="confirmPassword"
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              {...register("confirmPassword")}
              helperText={errors.confirmPassword?.message}
              iconRight={
                <button
                  type="button"
                  className="cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  tabIndex={-1}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              }
            />
          </div>
          <div className="col-span-full">
            <TextArea
              rows={5}
              id="about"
              label="Tell Us About Yourself"
              className="resize-none"
            />
          </div>
          <div className="col-span-full flex w-full gap-3">
            <Link href="/">
              <Button variant="secondary">Login</Button>
            </Link>
            <Button
              type="submit"
              className="flex-1"
              variant="blue"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Registering..." : "Register"}
            </Button>
          </div>
        </form>
      </div>
    </Container>
  );
}
