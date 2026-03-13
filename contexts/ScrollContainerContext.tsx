"use client";

import { createContext, useContext } from "react";

const ScrollContainerContext = createContext<HTMLDivElement | null>(null);

export function useScrollContainer() {
  return useContext(ScrollContainerContext);
}

export function ScrollContainerProvider({
  scrollContainer,
  children,
}: {
  scrollContainer: HTMLDivElement | null;
  children: React.ReactNode;
}) {
  return (
    <ScrollContainerContext.Provider value={scrollContainer}>
      {children}
    </ScrollContainerContext.Provider>
  );
}
