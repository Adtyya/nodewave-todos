"use client";

import { useAuth } from "@/store/useAuth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PublicRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = useAuth((state) => state.accessToken);
  const hasHydrated = useAuth((state) => state.hasHydrated);
  const router = useRouter();

  useEffect(() => {
    if (!hasHydrated) return;

    if (token) {
      router.replace("/dashboard/user");
    }
  }, [token, hasHydrated, router]);

  if (!hasHydrated) {
    return null;
  }

  return <>{children}</>;
}
