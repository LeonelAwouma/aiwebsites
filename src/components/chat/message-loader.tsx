import { Bot } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";

export function MessageLoader() {
  return (
    <div className="flex gap-4 justify-start">
      <Avatar className="h-8 w-8">
        <div className="h-full w-full flex items-center justify-center bg-primary rounded-full">
          <Bot className="h-5 w-5 text-primary-foreground" />
        </div>
      </Avatar>
      <div className="max-w-xl rounded-lg p-4 bg-card border">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 bg-muted-foreground rounded-full animate-pulse delay-0" />
          <span className="h-2 w-2 bg-muted-foreground rounded-full animate-pulse delay-150" />
          <span className="h-2 w-2 bg-muted-foreground rounded-full animate-pulse delay-300" />
        </div>
      </div>
    </div>
  );
}
