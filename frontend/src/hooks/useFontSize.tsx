import { useContext } from "react";

import { FontSizeContext } from "@/contexts/font-size-provider";

export function useFontSize() {
  const context = useContext(FontSizeContext);
  if (!context) {
    throw new Error("useFontSize must be used within a FontSizeProvider");
  }
  return context;
}
