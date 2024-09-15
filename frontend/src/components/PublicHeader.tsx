import { getSession } from "@auth0/nextjs-auth0/edge";

import Link from "next/link";
import Image from "next/image";
import { Logo } from "./Logo";
import { NavbarTwoColumns } from "./NavbarTwoColumns";
import { Section } from "./Section";

export default async function PublicHeader() {
  const session = await getSession();

  const user = session?.user;
  const logged = !!user;

  return (
    <Section yPadding="py-6">
      <NavbarTwoColumns logo={<Logo />}>
        {!logged && (
          <li>
            <Link href="/platform">Sign in</Link>
          </li>
        )}
        {logged && (
          <li>
            <Link href="/platform" className="flex items-center text-sm">
              <Image
                className="rounded-full m-2"
                src={user?.picture}
                alt="User avatar"
                width={30}
                height={30}
              />
              <span className="underline">{user?.name}</span>
            </Link>
          </li>
        )}
      </NavbarTwoColumns>
    </Section>
  );
}
