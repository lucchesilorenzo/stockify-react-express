"use client";

import { FontSizeIcon } from "@radix-ui/react-icons";

import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import { useFontSize } from "@/hooks/useFontSize";
import { fontSizeData } from "@/lib/data";

export default function FontSizeSwitcher() {
  const { handleFontSizeChange } = useFontSize();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="hidden sm:flex">
          <FontSizeIcon className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Toggle font size</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {fontSizeData.map((fontSize) => (
          <DropdownMenuItem
            key={fontSize.value}
            onClick={() => handleFontSizeChange(fontSize.value)}
          >
            {fontSize.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
