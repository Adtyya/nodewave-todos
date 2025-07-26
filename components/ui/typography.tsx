import React, { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface TypographyHeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: HeadingTag;
  children: ReactNode;
}

const headingVariants: Record<HeadingTag, string> = {
  h1: "scroll-m-20 text-5xl font-extrabold tracking-tight text-center text-balance",
  h2: "scroll-m-20 text-4xl font-semibold tracking-tight text-balance",
  h3: "scroll-m-20 text-3xl font-semibold tracking-tight text-balance",
  h4: "scroll-m-20 text-2xl font-semibold tracking-tight text-balance",
  h5: "scroll-m-20 text-xl font-medium tracking-tight text-balance",
  h6: "scroll-m-20 text-lg font-medium tracking-tight text-balance",
};

export function TypographyHeading({
  as = "h1",
  children,
  className,
  ...props
}: TypographyHeadingProps) {
  const Component = as;
  const finalClass = cn(headingVariants[as], className);

  return React.createElement(
    Component,
    { className: finalClass, ...props },
    children
  );
}

interface TypographyPProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
}

export function TypographyP({
  children,
  className,
  ...props
}: TypographyPProps) {
  return React.createElement(
    "p",
    {
      className: cn("leading-7 [&:not(:first-child)]:mt-6", className),
      ...props,
    },
    children
  );
}
