"use client";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

const exampleQueries = [
  "Summarize the latest updates from lvb.cm.",
  "What are the main services offered by matrixtelecoms.com?",
  "Generate a SQL query to find all users from 'customers' table who signed up last month.",
  "Compare the offerings on adac.cm and groupeiccnet.cm.",
];

type EmptyStateProps = {
  onExampleClick: (query: string) => void;
};

export function EmptyState({ onExampleClick }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
      <div className="mb-4">
        <Logo />
      </div>
      <h2 className="text-2xl font-headline font-semibold mb-2">
        Welcome to SourceWise AI
      </h2>
      <p className="text-muted-foreground max-w-md mb-8">
        Ask a question to get started. Your personal AI assistant connected to
        your data sources.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl w-full">
        {exampleQueries.map((query) => (
          <Button
            key={query}
            variant="outline"
            className="text-left justify-start h-auto py-2"
            onClick={() => onExampleClick(query)}
          >
            {query}
          </Button>
        ))}
      </div>
    </div>
  );
}
