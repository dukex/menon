"use client";

import { createContext, useState } from "react";

export const TitleContext = createContext<{
  title: string;
  setTitle: (title: string) => void;
}>({
  title: "",
  setTitle: () => {},
});

export const TitleProvider = ({ children }: { children: React.ReactNode }) => {
  const [title, setTitle] = useState("");

  return (
    <TitleContext.Provider value={{ title, setTitle }}>
      {children}
    </TitleContext.Provider>
  );
};
