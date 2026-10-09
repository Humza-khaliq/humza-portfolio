"use client";

import { Ssgoi, drill } from "@ssgoi/react";
import type { ReactNode } from "react";

const config = {
  transitions: [{ on: "/projects/**", transition: drill() }],
};

export function SsgoiProvider({ children }: { children: ReactNode }) {
  return <Ssgoi config={config}>{children}</Ssgoi>;
}
