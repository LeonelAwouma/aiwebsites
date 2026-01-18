"use client";

import { AiIcon } from "@/components/icons/ai-icon";
import { Card, CardContent } from "@/components/ui/card";
import { Code, Database, Globe } from "lucide-react";

const examplePrompts = [
  {
    icon: <Globe className="h-5 w-5" />,
    title: "Comparer les offres",
    prompt: "Compare les offres de connectivité internet de LVB.cm et Matrix Telecoms.",
  },
  {
    icon: <Database className="h-5 w-5" />,
    title: "Infos de la base de données",
    prompt: "Quels sont les détails de la connexion à la base de données 'Production PGSQL' ?",
  },
  {
    icon: <Code className="h-5 w-5" />,
    title: "Générer du code",
    prompt: "Génère un snippet de code pour se connecter à une base de données Firestore.",
  },
    {
    icon: <Globe className="h-5 w-5" />,
    title: "Résumé de site web",
    prompt: "Fais-moi un résumé du site ADAC.cm.",
  },
];

export function EmptyState({
  onExampleClick,
}: {
  onExampleClick: (query: string) => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-4 md:p-8">
      <div className="mb-6">
        <AiIcon className="h-16 w-16 text-2xl" />
      </div>
      <h2 className="text-3xl md:text-4xl font-headline font-bold mb-2">
        Comment puis-je vous aider ?
      </h2>
      <p className="text-muted-foreground max-w-lg mb-10">
        Posez-moi des questions sur les services de télécommunications, la
        connectivité, ou toute information disponible dans mes sources
        configurées.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
        {examplePrompts.map((item, index) => (
          <Card key={index} className="cursor-pointer hover:bg-accent transition-colors" onClick={() => onExampleClick(item.prompt)}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="bg-secondary p-2 rounded-md">
                   {item.icon}
                </div>
                <h3 className="font-semibold text-left">{item.title}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
