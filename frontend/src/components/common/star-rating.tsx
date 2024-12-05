"use client";

import { useState } from "react";

import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

type StarRatingProps = {
  initialRating?: number;
  onChange?: (rating: number) => void;
  readOnly?: boolean;
  size?: "sm" | "md" | "lg";
};

export default function StarRating({
  initialRating = 0,
  onChange,
  readOnly = false,
  size = "md",
}: StarRatingProps) {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(0);

  const sizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  function handleClick(value: number) {
    if (!readOnly) {
      setRating(value);
      onChange?.(value);
    }
  }

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => handleClick(star)}
          onMouseEnter={() => !readOnly && setHover(star)}
          onMouseLeave={() => !readOnly && setHover(0)}
          className={cn(
            "focus:outline-none",
            !readOnly && "cursor-pointer transition-colors",
            readOnly && "cursor-default",
          )}
          disabled={readOnly}
        >
          <Star
            className={cn(
              sizes[size],
              "transition-colors",
              (hover || rating) >= star
                ? "fill-yellow-400 text-yellow-400"
                : "fill-muted text-muted-foreground",
            )}
          />
        </button>
      ))}
    </div>
  );
}
