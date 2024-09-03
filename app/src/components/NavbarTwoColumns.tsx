import Link from "next/link";
import type { ReactNode } from "react";

type INavbarProps = {
  logo: ReactNode;
  children: ReactNode;
  logoLink?: string;
};

const NavbarTwoColumns = (props: INavbarProps) => (
  <div className="flex flex-wrap items-center justify-between">
    <Link className="block" href={props.logoLink ?? "/"}>
      {props.logo}
    </Link>

    <nav>
      <ul className="navbar flex items-center text-md font-medium text-gray-800">
        {props.children}
      </ul>
    </nav>
  </div>
);

export { NavbarTwoColumns };
