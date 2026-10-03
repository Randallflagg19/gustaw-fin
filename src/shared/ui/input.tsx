import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/shared/lib/css";

const inputVariants = cva(
  "flex w-full min-w-0 border px-3 py-1 text-base outline-none transition-[color,background-color,border-color,box-shadow] file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
  {
    variants: {
      variant: {
        default:
          "h-9 rounded-md border-input bg-transparent shadow-xs placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:bg-input/30 dark:aria-invalid:ring-destructive/40",
        cosmic:
          "h-12 rounded-[var(--radius-control)] border-[var(--cosmos-border)] bg-[var(--cosmos-surface-raised)]/80 px-4 text-[var(--cosmos-ivory)] shadow-[inset_0_0_0_1px_rgba(225,187,114,0.06)] placeholder:text-[var(--cosmos-text-muted)] focus-visible:border-[var(--cosmos-gold)] focus-visible:ring-[3px] focus-visible:ring-[var(--cosmos-gold)]/20 aria-invalid:border-[var(--cosmos-error)] aria-invalid:ring-[var(--cosmos-error)]/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Input({
  className,
  type,
  variant,
  ...props
}: React.ComponentProps<"input"> & VariantProps<typeof inputVariants>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(inputVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Input, inputVariants };
