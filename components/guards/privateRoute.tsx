"use client";

import { useAuth } from "@/store/useAuth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PrivateRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = useAuth((state) => state.accessToken);
  const hasHydrated = useAuth((state) => state.hasHydrated);
  const router = useRouter();

  useEffect(() => {
    if (!hasHydrated) return;

    if (!token) {
      router.replace("/");
    }
  }, [token, hasHydrated, router]);

  if (!hasHydrated) return null;
  if (!token) return null;

  return <>{children}</>;
}
