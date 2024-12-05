"use client";

import { useState } from "react";

import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { UseFormSetValue } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { TSettingsFormSchema } from "@/lib/validations/settings-validations";

type SettingsDatePickerProps = {
  setValue: UseFormSetValue<TSettingsFormSchema>;
  defaultValue?: Date;
};

export default function SettingsDatePicker({
  setValue,
  defaultValue,
}: SettingsDatePickerProps) {
  const [date, setDate] = useState<Date | undefined>(defaultValue);

  function handleDateChange(selectedDate?: Date) {
    setDate(selectedDate);
    setValue("dateOfBirth", selectedDate as Date);
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id="dateOfBirth"
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateChange}
          captionLayout="dropdown-buttons"
          weekStartsOn={1}
          defaultMonth={new Date("1950-01-01")}
          fromDate={new Date("1950-01-01")}
          toDate={new Date()}
          disabled={(date) =>
            date > new Date() || date < new Date("1950-01-01")
          }
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
