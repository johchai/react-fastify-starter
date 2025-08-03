import { cn } from "@client/utils";

import { type LinkProps, Link as RouterLink } from "react-router";

export const Link = ({ className, children, ...props }: LinkProps) => {
  return (
    <RouterLink className={cn("hover: underline", className)} {...props}>
      {children}
    </RouterLink>
  );
};
