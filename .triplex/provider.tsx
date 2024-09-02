import React from "react";
import { Physics } from "@react-three/rapier";

export default function Provider({
  children,
  physicsDisabled = true,
}: {
  children: React.ReactNode;
  physicsDisabled: boolean;
}) {
  return <Physics paused={physicsDisabled}>{children}</Physics>;
}
