"use client";

import { DirectionProvider as DirectionProviderPrimitive } from "@radix-ui/react-direction";

interface Props {
  children: React.ReactNode;
  dir: "rtl" | "ltr";
}

export default function DirectionProvider({ children, dir }: Props) {
  return (
    <DirectionProviderPrimitive dir={dir}>
      {children}
    </DirectionProviderPrimitive>
  );
}
