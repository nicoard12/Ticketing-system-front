import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SpinnerProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

function Spinner({ className, size = "md" }: SpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  return (
    <div className={cn("flex items-center justify-center p-4", className)}>
      <Loader2
        className={cn(
          "animate-spin text-primary opacity-80",
          sizeClasses[size]
        )}
      />
    </div>
  );
}

export default Spinner;
