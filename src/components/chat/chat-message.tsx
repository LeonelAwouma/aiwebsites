"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { ChatMessage } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Bot, User, Globe } from "lucide-react";

export function ChatMessageBubble({
  role,
  content,
  sources,
}: ChatMessage) {
  const isUser = role === "user";

  return (
    <div
      className={cn(
        "flex gap-4",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <Avatar className="h-8 w-8">
          <div className="h-full w-full flex items-center justify-center bg-primary rounded-full">
            <Bot className="h-5 w-5 text-primary-foreground" />
          </div>
        </Avatar>
      )}
      <div
        className={cn(
          "max-w-xl rounded-lg p-4 text-sm",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-card border"
        )}
      >
        <p className="whitespace-pre-wrap">{content}</p>
        {sources && sources.length > 0 && (
          <div className="mt-4 border-t pt-3">
            <h4 className="text-xs font-semibold mb-2 flex items-center gap-1.5">
              <Globe className="h-3 w-3" />
              Sources
            </h4>
            <div className="flex flex-wrap gap-2">
              {sources.map((source, index) => (
                <Badge key={index} variant="secondary">
                  {source}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
      {isUser && (
        <Avatar className="h-8 w-8">
          <AvatarImage src="https://picsum.photos/seed/user/32/32" />
          <AvatarFallback>
            <User className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
