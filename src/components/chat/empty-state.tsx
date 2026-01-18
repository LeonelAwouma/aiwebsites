"use client";

import { AiIcon } from "@/components/icons/ai-icon";

export function EmptyState({
  onExampleClick,
}: {
  onExampleClick: (query: string) => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
      <div className="mb-4">
        <AiIcon className="h-12 w-12 text-lg" />
      </div>
      <h2 className="text-2xl font-headline font-bold mb-2">
        Comment puis-je vous aider ?
      </h2>
      <p className="text-muted-foreground max-w-md">
        Posez-moi des questions sur les services de télécommunications, la
        connectivité, ou toute information disponible dans mes sources
        configurées.
      </p>
    </div>
  );
}
