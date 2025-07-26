/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Container from "@/components/ui/container";
import { InputField } from "@/components/ui/input";
import { TypographyHeading, TypographyP } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuth } from "@/store/useAuth";
import api from "@/lib/api";
import schema from "@/components/screens/login/schema/login";

type FormValues = z.infer<typeof schema>;

export default function LoginScreen() {
  const router = useRouter();
  const setAccessToken = useAuth((s) => s.setAccessToken);
  const setUser = useAuth((s) => s.setUser);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await api.post("/login", data);
      const { content, message } = res.data;

      setAccessToken(content.token);
      setUser(content.user);

      toast.success(message);
      router.push("/dashboard/user");
    } catch (err: any) {
      const msg = err?.response?.data?.message || "Login failed";
      toast.error(msg);
    }
  };

  return (
    <Container>
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <div>
          <TypographyHeading as="h1">Sign In</TypographyHeading>
          <TypographyP>
            Just sign in if you have an account in here. Enjoy our Website
          </TypographyP>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-lg bg-white p-7 my-3.5 rounded-3xl space-y-7"
        >
          <InputField
            id="email"
            label="Your Email/Username"
            {...register("email")}
            helperText={errors.email?.message}
          />
          <InputField
            id="password"
            label="Password"
            type="password"
            {...register("password")}
            helperText={errors.password?.message}
          />
          <Button
            type="submit"
            className="w-full"
            variant="blue"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Loading..." : "Login"}
          </Button>
        </form>
        <div>
          <a href="/register">
            <TypographyP className="text-blue-500 font-semibold">{`Don’t have a Square account? Register`}</TypographyP>
          </a>
        </div>
      </div>
    </Container>
  );
}
