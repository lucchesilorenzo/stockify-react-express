import { createContext, useEffect, useState } from "react";

type FontSizeProviderProps = {
  children: React.ReactNode;
};

type TFontSizeContext = {
  fontSize: string;
  handleFontSizeChange: (size: string) => void;
};

export const FontSizeContext = createContext<TFontSizeContext | null>(null);

export default function FontSizeProvider({ children }: FontSizeProviderProps) {
  const [fontSize, setFontSize] = useState("text-md");

  useEffect(() => {
    const savedFontSize = localStorage.getItem("fontSize") || "text-md";
    document.documentElement.classList.add(savedFontSize);

    setFontSize(savedFontSize);
  }, []);

  function handleFontSizeChange(size: string) {
    document.documentElement.classList.remove(fontSize);
    document.documentElement.classList.add(size);
    localStorage.setItem("fontSize", size);

    setFontSize(size);
  }

  return (
    <FontSizeContext.Provider value={{ fontSize, handleFontSizeChange }}>
      {children}
    </FontSizeContext.Provider>
  );
}
