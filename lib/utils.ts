import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { SVGProps } from "react";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

