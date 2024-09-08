"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import { usePathname, redirect } from "next/navigation";
import { ReactNode, useEffect } from "react";

export default function AuthOnly({ children }: { children: ReactNode }) {
  const { user, isLoading } = useUser();
  const pathName = usePathname();

  useEffect(() => {
    if (isLoading) return;
    if (user) return;

    redirect(`/api/auth/login?returnTo=${pathName}`);
  }, [user, isLoading, pathName]);

  if (isLoading) return <></>;
  if (user) return <>{children}</>;

  return <p>{JSON.stringify(user)}</p>;
}
