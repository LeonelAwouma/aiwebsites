import { cn } from "@/lib/utils";

export function AiIcon({
  className,
  variant = "primary",
}: {
  className?: string;
  variant?: "primary" | "subtle";
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full font-bold",
        variant === "primary" && "bg-primary text-primary-foreground",
        variant === "subtle" && "bg-primary/20 text-primary",
        className
      )}
    >
      AI
    </div>
  );
}
