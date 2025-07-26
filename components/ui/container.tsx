import React from "react";

type ContainerProps = {
  children: React.ReactNode;
};

export default function Container({ children }: ContainerProps) {
  return <div className="w-full max-w-5xl mx-auto">{children}</div>;
}
