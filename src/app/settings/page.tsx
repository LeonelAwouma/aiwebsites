import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Database, Globe } from "lucide-react";
import Link from "next/link";

export default function SettingsPage() {
  return (
    <div>
        <header className="mb-8">
            <h1 className="text-3xl font-headline font-bold">Paramètres</h1>
            <p className="text-muted-foreground mt-2">
                Gérez vos sources de données et les paramètres de l'application.
            </p>
        </header>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/settings/websites" className="block group">
          <Card className="transition-all group-hover:border-primary group-hover:shadow-lg">
            <CardHeader className="flex-row gap-4 items-center">
              <Globe className="h-8 w-8 text-primary" />
              <div>
                <CardTitle>Sources de sites web</CardTitle>
                <CardDescription>
                  Gérez les sites web utilisés pour alimenter l'IA.
                </CardDescription>
              </div>
            </CardHeader>
          </Card>
        </Link>
        <Link href="/settings/databases" className="block group">
          <Card className="transition-all group-hover:border-primary group-hover:shadow-lg">
            <CardHeader className="flex-row gap-4 items-center">
              <Database className="h-8 w-8 text-primary" />
              <div>
                <CardTitle>Connexions aux bases de données</CardTitle>
                <CardDescription>
                  Gérez les bases de données utilisées pour alimenter l'IA.
                </CardDescription>
              </div>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </div>
  );
}
