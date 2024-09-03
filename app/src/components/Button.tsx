"use client";

import className from "classnames";
import Link from "next/link";
import type { MouseEventHandler } from "react";

interface BaseProps {
  xl?: boolean;
  xxl?: boolean;
  children: string;
}

interface ILinkButtonProps extends BaseProps {
  href: string
}

interface IButtonProps extends BaseProps {
  type?: "submit" | "reset" | "button";
  onClick?: MouseEventHandler;
}

const Button = (props: IButtonProps) => {
  const btnClass = className({
    btn: true,
    "btn-xl": props.xl,
    "btn-xxl": props.xxl,
    "btn-base": !props.xl && !props.xxl,
    "btn-primary": true,
  });

  return (
    <button type={props.type} className={btnClass} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

const LinkButton = (props: ILinkButtonProps) => {
  const btnClass = className({
    btn: true,
    "btn-xl": props.xl,
    "btn-xxl": props.xxl,
    "btn-base": !props.xl && !props.xxl,
    "btn-primary": true,
  });

  return (
    <Link href={props.href} className={btnClass}>
      {props.children}
    </Link>
  );
};

export { Button, LinkButton };
