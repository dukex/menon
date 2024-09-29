"use client";

import useTitle from "@/components/Title/hooks/useTitle";

export default function UseTitle({ className = "" }: { className: string }) {
  const { title } = useTitle();

  return <div className={`text-sm font-bold ${className}`}>{title}</div>;
}
