"use client";

import { MessageSquare, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

type Conversation = {
  id: string;
  title: string;
  date: Date;
};

const initialConversationsData = [
    { id: '1', title: 'Comparaison des FAI' },
    { id: '2', title: 'Détails de connexion BD' },
    { id: '3', title: 'Génération de snippet de code' },
    { id: '4', title: 'Résumé du site ADAC.cm' },
];

export function ConversationHistory() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeId, setActiveId] = useState('1');
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    const clientSideConversations: Conversation[] = [
        { id: '1', title: 'Comparaison des FAI', date: new Date() },
        { id: '2', title: 'Détails de connexion BD', date: new Date(Date.now() - 2 * 60 * 60 * 1000) },
        { id: '3', title: 'Génération de snippet de code', date: new Date(Date.now() - 5 * 60 * 60 * 1000) },
        { id: '4', title: 'Résumé du site ADAC.cm', date: new Date(Date.now() - 24 * 60 * 60 * 1000) },
    ];
    setConversations(clientSideConversations);
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
      return (
        <div className="flex flex-col gap-1 p-2">
            {initialConversationsData.map((convo) => (
                <Button
                    key={convo.id}
                    variant={activeId === convo.id ? "secondary" : "ghost"}
                    className="w-full justify-start h-10 px-2.5 group"
                >
                    <div className="flex-1 text-left truncate">
                        <div className="font-medium truncate">{convo.title}</div>
                        <div className="text-xs text-muted-foreground">
                            <Skeleton className="h-3 w-16" />
                        </div>
                    </div>
                    <MoreHorizontal className="h-4 w-4 ml-2 opacity-0" />
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
          variant={activeId === convo.id ? "secondary" : "ghost"}
          className="w-full justify-start h-10 px-2.5 group"
          onClick={() => setActiveId(convo.id)}
        >
          <div className="flex-1 text-left truncate">
            <div className="font-medium truncate">{convo.title}</div>
            <div className="text-xs text-muted-foreground">
              {formatDistanceToNow(convo.date, { addSuffix: true, locale: fr })}
            </div>
          </div>
           <MoreHorizontal className="h-4 w-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
        </Button>
      ))}
    </div>
  );
}
