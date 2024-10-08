import { getSession } from "@auth0/nextjs-auth0/edge";
import Link from "next/link";
import { Logo } from "./Logo";
import { NavbarTwoColumns } from "./NavbarTwoColumns";
import Image from "next/image";

export default async function PrivateHeader() {
  const session = await getSession();

  if (!session) return <div>Loading...</div>;

  const user = session.user;
  const logged = !!user;

  return (
    <div className="px-2 md:h-10">
      <NavbarTwoColumns logoLink="/" logo={<Logo />}>
        {!logged && (
          <li>
            <Link href="/platform">Sign in</Link>
          </li>
        )}
        {logged && (
          <li>
            <Link href="/platform" className="flex items-center text-sm">
              <Image
                alt="you"
                className="rounded-full mx-2"
                src={user.picture!}
                width={25}
                height={25}
              />
              <span className="underline">{user.name}</span>
            </Link>
          </li>
        )}
      </NavbarTwoColumns>
    </div>
  );
}
