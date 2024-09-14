"use client";

import useTitle from "@/components/Title/hooks/useTitle";

export default function UseTitle() {
  const { title } = useTitle();

  return <div className="text-sm font-bold">{title}</div>;
}
