"use client";

import { useEffect } from "react";
import useTitle from "@/components/Title/hooks/useTitle";

export default function SetTitle({ title }: { title: string }) {
  const { setTitle } = useTitle();
  useEffect(() => {
    setTitle(title);
  }, [title, setTitle]);

  return null;
}
