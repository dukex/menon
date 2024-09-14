"use client";

import { useContext } from "react";
import { TitleContext } from "@/components/Title/contexts/TitleContext";

export default function useTitle() {
  return useContext(TitleContext);
}
