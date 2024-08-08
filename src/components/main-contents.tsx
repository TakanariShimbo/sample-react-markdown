import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export const MainContents = () => {
  const [count, setCount] = useState<number>(0);

  return (
    <div className="flex justify-center flex-col items-center gap-5">
      <p className="text-3xl font-bold text-primary">HELLO WORLD</p>
      <Button onClick={() => setCount((prev) => prev + 1)}>Clicked {count} times</Button>
      <ThemeToggle />
    </div>
  );
};
