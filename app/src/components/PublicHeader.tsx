"use client";

import { useUser } from "@auth0/nextjs-auth0/client";

import Link from "next/link";
import Image from "next/image";
import { Logo } from "./Logo";
import { NavbarTwoColumns } from "./NavbarTwoColumns";
import { Section } from "./Section";

export default function PublicHeader() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  const logged = !!user;

  return (
    <Section yPadding="py-6">
      <NavbarTwoColumns logo={<Logo />}>
        {!logged && (
          <li>
            <Link href="/app">Sign in</Link>
          </li>
        )}
        {logged && (
          <li>
            <Link href="/app" className="flex items-center text-sm"><img className="rounded-full m-2" src={user.picture} width={30} heigth={30} /><span className="underline">{user.name}</span></Link>
          </li>
        )}
      </NavbarTwoColumns>
    </Section>
  );
}
