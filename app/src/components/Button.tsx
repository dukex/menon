"use client";

import className from "classnames";
import type { MouseEventHandler } from "react";

type IButtonProps = {
  xl?: boolean;
  xxl?: boolean;
  children: string;
  type?: "submit" | "reset" | "button";
  onClick?: MouseEventHandler;
};

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

export { Button };
