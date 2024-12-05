import { useEffect, useState } from "react";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Brain } from "lucide-react";
import { useTheme } from "next-themes";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../ui/command";
import { DialogDescription, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import FormDialog from "./form-dialog";

import { useFontSize } from "@/hooks/useFontSize";
import { fontSizeData, routes, themeData } from "@/lib/data";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

export function MainCommandDialog() {
  const { setTheme } = useTheme();
  const { fontSize, handleFontSizeChange } = useFontSize();
  const [open, setOpen] = useState(false);
  const [generateTaskOpen, setGenerateTaskOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    function down(e: KeyboardEvent) {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    }
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <div className="relative">
        <Input
          id="command-dialog-search"
          placeholder="Search..."
          className="w-[300px] rounded border p-2"
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
        />

        <kbd
          className={cn(
            "pointer-events-none absolute top-2 inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100",
            fontSize === "text-md"
              ? "left-[220px]"
              : fontSize === "text-lg"
                ? "left-[210px]"
                : "left-[200px]",
          )}
        >
          <span className="text-xs">Ctrl + K</span>
        </kbd>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <VisuallyHidden>
          <DialogTitle>Main Command Dialog</DialogTitle>
        </VisuallyHidden>
        <VisuallyHidden>
          <DialogDescription>Type a command or search...</DialogDescription>
        </VisuallyHidden>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Links">
            {routes.map((route) => (
              <CommandItem
                key={route.href}
                onSelect={() => {
                  setOpen(false);
                  navigate(route.href);
                }}
              >
                <route.icon className="mr-3 h-5 w-5" />
                {route.name}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Theme">
            {themeData.map((theme) => (
              <CommandItem
                key={theme.value}
                onSelect={() => {
                  setOpen(false);
                  setTheme(theme.value);
                }}
              >
                <theme.icon className="mr-3 h-5 w-5" />
                {theme.name}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Font Size">
            {fontSizeData.map((fontSize) => (
              <CommandItem
                key={fontSize.value}
                onSelect={() => {
                  setOpen(false);
                  handleFontSizeChange(fontSize.value);
                }}
              >
                <fontSize.icon className="mr-3 h-5 w-5" />
                {fontSize.name}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Generate">
            <CommandItem
              onSelect={() => {
                setOpen(false);
                setGenerateTaskOpen(true);
              }}
            >
              <Brain className="mr-3 h-5 w-5" /> Generate Task
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>

      <FormDialog
        actionType="generateTask"
        open={generateTaskOpen}
        onOpenChange={setGenerateTaskOpen}
      />
    </>
  );
}
