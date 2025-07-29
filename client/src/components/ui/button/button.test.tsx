// src/components/ui/button/button.test.tsx
// simple smoke test
import { render } from "@testing-library/react";
import { describe, it } from "vitest";

import { Button } from "./button";

describe("Button", () => {
  it("renders without crashing", () => {
    render(<Button />);
  });
});
