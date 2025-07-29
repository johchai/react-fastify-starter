import React, { forwardRef } from "react";

import { cn } from "@repo/utils";

// Duplicate the Text component from the original code e.g. TextH1, TextBase, etc.
const TextTemplate = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>((props, ref) => {
  return (
    <p
      {...props}
      ref={ref}
      className={cn("text-base leading-normal", props.className)}
    >
      {props.children}
    </p>
  );
});
TextTemplate.displayName = "TextBase";
export { TextTemplate as TextBase };
