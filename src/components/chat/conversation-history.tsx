"use client";

import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

type Conversation = {
  id: number;
  date: Date;
  active?: boolean;
};

export function ConversationHistory() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setConversations([
      { id: 1, date: new Date(), active: true },
      { id: 2, date: new Date(Date.now() - 1 * 60 * 1000) },
      { id: 3, date: new Date(Date.now() - 40 * 60 * 1000) },
      { id: 4, date: new Date(Date.now() - 24 * 60 * 60 * 1000) },
    ]);
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return (
      <div className="flex flex-col gap-1 p-2">
        {[...Array(4)].map((_, index) => (
          <Button
            key={index}
            variant="ghost"
            className="w-full justify-start h-auto py-2 px-3"
            disabled
          >
            <MessageSquare className="mr-3 h-4 w-4" />
            <div className="flex flex-col items-start">
              <span className="font-medium text-sm">Nouvelle conversation</span>
              <span className="text-xs text-muted-foreground">...</span>
            </div>
          </Button>
        ))}
      </div>
    );
  }

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
            <span className="font-medium text-sm">Nouvelle conversation</span>
            <span className="text-xs text-muted-foreground">
              {`il y a ${formatDistanceToNow(convo.date, { locale: fr })}`}
            </span>
          </div>
        </Button>
      ))}
    </div>
  );
}
