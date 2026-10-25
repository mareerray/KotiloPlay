import type { ComponentType } from "react";
import SimpleIcon from "../components/SimpleIcon";

type RoomIconProps = {
  className?: string;
  strokeWidth?: number;
  "aria-hidden"?: boolean | "true" | "false";
};

export const roomIcons: Record<
  string,
  ComponentType<RoomIconProps>
> = {
  "Living Room": SimpleIcon,
  Bedroom: SimpleIcon,
  Kitchen: SimpleIcon,
  Bathroom: SimpleIcon,
  Hallway: SimpleIcon,
  Office: SimpleIcon,
};