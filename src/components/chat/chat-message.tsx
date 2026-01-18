"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { ChatMessage } from "@/lib/types";
import { cn } from "@/lib/utils";
import { User, Globe } from "lucide-react";
import { AiIcon } from "../icons/ai-icon";

export function ChatMessageBubble({ role, content, sources }: ChatMessage) {
  const isUser = role === "user";

  return (
    <div
      className={cn("flex gap-4", isUser ? "justify-end" : "justify-start")}
    >
      {!isUser && <AiIcon variant="primary" className="h-8 w-8 text-xs flex-shrink-0" />}
      <div
        className={cn(
          "max-w-2xl rounded-lg p-4 text-sm",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-secondary"
        )}
      >
        <p className="whitespace-pre-wrap leading-relaxed">{content}</p>
        {sources && sources.length > 0 && (
          <div className="mt-4 border-t pt-4">
            <h4 className="text-xs font-semibold mb-2 flex items-center gap-1.5 text-muted-foreground">
              <Globe className="h-3 w-3" />
              Sources
            </h4>
            <div className="flex flex-wrap gap-2">
              {sources.map((source, index) => (
                <Badge key={index} variant="outline" className="bg-background">
                  {source}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
      {isUser && (
        <Avatar className="h-8 w-8 flex-shrink-0">
          <AvatarImage src="https://picsum.photos/seed/user/32/32" />
          <AvatarFallback>
            <User className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
