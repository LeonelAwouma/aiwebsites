"use client";

import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

const conversations = [
  { id: 1, time: "il y a moins d'une minute", active: true },
  { id: 2, time: "il y a 1 minute" },
  { id: 3, time: "il y a 40 minutes" },
  { id: 4, time: "il y a environ 24 heures" },
];

export function ConversationHistory() {
  return (
    <div className="flex flex-col gap-1 p-2">
      {conversations.map((convo) => (
        <Button
          key={convo.id}
          variant={convo.active ? "secondary" : "ghost"}
          className="w-full justify-start h-auto py-2 px-3"
        >
          <MessageSquare className="mr-3 h-4 w-4" />
          <div className="flex flex-col items-start">
            <span className="font-medium text-sm">New Conversation</span>
            <span className="text-xs text-muted-foreground">{convo.time}</span>
          </div>
        </Button>
      ))}
    </div>
  );
}
