"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { ChatMessage } from "@/lib/types";
import { cn } from "@/lib/utils";
import { User } from "lucide-react";
import { AiIcon } from "../icons/ai-icon";

export function ChatMessageBubble({ role, content, sources }: ChatMessage) {
  const isUser = role === "user";

  return (
    <div
      className={cn("flex gap-4", isUser ? "justify-end" : "justify-start")}
    >
      {!isUser && <AiIcon variant="primary" className="h-8 w-8 text-xs" />}
      <div
        className={cn(
          "max-w-xl rounded-lg p-4 text-sm",
          isUser ? "bg-primary text-primary-foreground" : "bg-card border"
        )}
      >
        <p className="whitespace-pre-wrap">{content}</p>
        {sources && sources.length > 0 && (
          <div className="mt-4 border-t pt-3">
            <h4 className="text-xs font-semibold mb-2 flex items-center gap-1.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-3 w-3"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                <path d="M2 12h20" />
              </svg>
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
