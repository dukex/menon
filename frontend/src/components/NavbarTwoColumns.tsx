import Link from "next/link";
import type { ReactNode } from "react";
import { Title } from "./Title";

type INavbarProps = {
  logo: ReactNode;
  children: ReactNode;
  logoLink?: string;
};

const NavbarTwoColumns = (props: INavbarProps) => (
  <>
    <div className="flex flex-wrap items-center justify-between flex-1">
      <Link className="block" href={props.logoLink ?? "/"}>
        {props.logo}
      </Link>

      <Title className="hidden md:block" />

      <nav>
        <ul className="navbar flex items-center text-md font-medium text-gray-800">
          {props.children}
        </ul>
      </nav>
    </div>
    <Title className="md:hidden mt-2" />
  </>
);

export { NavbarTwoColumns };
