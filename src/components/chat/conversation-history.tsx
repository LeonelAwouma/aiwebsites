"use client";

import { MessageSquare, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

type Conversation = {
  id: string;
  title: string;
  date: Date;
};

const initialConversations: Conversation[] = [
    { id: '1', title: 'Comparaison des FAI', date: new Date() },
    { id: '2', title: 'Détails de connexion BD', date: new Date(Date.now() - 2 * 60 * 60 * 1000) },
    { id: '3', title: 'Génération de snippet de code', date: new Date(Date.now() - 5 * 60 * 60 * 1000) },
    { id: '4', title: 'Résumé du site ADAC.cm', date: new Date(Date.now() - 24 * 60 * 60 * 1000) },
];


export function ConversationHistory() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeId, setActiveId] = useState('1');
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    setConversations(initialConversations);
  }, []);

  if (!hasMounted) {
    return (
      <div className="p-2 space-y-1">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center gap-2.5 rounded-md p-2.5">
             <MessageSquare className="h-4 w-4 text-muted-foreground" />
             <Skeleton className="h-4 w-full" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1 p-2">
      {conversations.map((convo) => (
        <Button
          key={convo.id}
          variant={activeId === convo.id ? "secondary" : "ghost"}
          className="w-full justify-start h-10 px-2.5 group"
          onClick={() => setActiveId(convo.id)}
        >
          <MessageSquare className="mr-2.5 h-4 w-4 flex-shrink-0" />
          <span className="truncate flex-1 text-left">{convo.title}</span>
           <MoreHorizontal className="h-4 w-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
        </Button>
      ))}
    </div>
  );
}
