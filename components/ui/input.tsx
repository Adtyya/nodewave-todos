"use client";

import React, { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import clsx from "clsx";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  helperText?: string;
  maxChar?: number;
  value?: string;
}

export const InputField = ({
  id,
  label,
  iconLeft,
  iconRight,
  helperText,
  maxChar,
  value,
  className,
  ...props
}: InputFieldProps) => {
  const charCount = value?.length ?? 0;

  return (
    <div className="relative w-full">
      <input
        id={id}
        name={id}
        type="text"
        placeholder=" "
        value={value}
        maxLength={maxChar}
        className={cn(
          "peer relative w-full h-10 px-4 text-sm placeholder-transparent transition-all border rounded-md outline-none",
          "border-slate-200 text-slate-500 autofill:bg-white",
          "invalid:border-pink-500 invalid:text-pink-500",
          "focus:border-blue-500 focus:outline-none",
          "disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400",
          iconLeft ? "pl-12" : "",
          iconRight ? "pr-12" : "",
          className
        )}
        {...props}
      />

      <label
        htmlFor={id}
        className={cn(
          "absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all",
          "before:absolute before:inset-0 before:z-[-1] before:bg-white before:transition-all",
          "peer-placeholder-shown:top-2.5 peer-placeholder-shown:left-4",
          "peer-placeholder-shown:text-sm peer-placeholder-shown:text-slate-400",
          "peer-focus:left-2 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-500",
          "peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
        )}
      >
        {label}
      </label>

      {iconLeft && (
        <span className="absolute left-4 top-2.5 text-slate-400 peer-disabled:cursor-not-allowed">
          {iconLeft}
        </span>
      )}

      {iconRight && (
        <span className="absolute right-4 top-2.5 text-slate-400 peer-disabled:cursor-not-allowed">
          {iconRight}
        </span>
      )}

      {(helperText || maxChar !== undefined) && (
        <small className="absolute flex justify-between w-full px-4 py-1 text-xs transition text-slate-400 peer-invalid:text-pink-500">
          <span>{helperText}</span>
          {maxChar !== undefined && (
            <span className="text-slate-500">
              {charCount}/{maxChar}
            </span>
          )}
        </small>
      )}
    </div>
  );
};

interface FloatingTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  helperText?: string;
  maxLengthText?: string;
  classNameWrapper?: string;
}

export const TextArea: React.FC<FloatingTextareaProps> = ({
  label,
  helperText = "",
  maxLengthText = "",
  classNameWrapper = "",
  className,
  ...props
}) => {
  const id =
    props.id || `textarea-${Math.random().toString(36).substring(2, 9)}`;

  return (
    <div className={clsx("relative", classNameWrapper)}>
      <textarea
        id={id}
        placeholder=" "
        className={clsx(
          "relative w-full px-4 py-2 text-sm placeholder-transparent transition-all border rounded outline-none focus-visible:outline-none peer",
          "border-slate-200 text-slate-500 autofill:bg-white",
          "invalid:border-pink-500 invalid:text-pink-500",
          "focus:border-blue-500 focus:outline-none invalid:focus:border-pink-500",
          "disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400",
          className
        )}
        {...props}
      />
      <label
        htmlFor={id}
        className="cursor-text peer-focus:cursor-default absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all
        before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all
        peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-pink-500 peer-required:after:content-['\\00a0*']
        peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-500 peer-invalid:peer-focus:text-pink-500
        peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
      >
        {label}
      </label>
      {(helperText || maxLengthText) && (
        <small className="absolute flex justify-between w-full px-4 py-1 text-xs transition text-slate-400 peer-invalid:text-pink-500">
          <span>{helperText}</span>
          <span className="text-slate-500">{maxLengthText}</span>
        </small>
      )}
    </div>
  );
};
