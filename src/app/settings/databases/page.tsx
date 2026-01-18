"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  PostgresqlIcon,
  MysqlIcon,
  FirestoreIcon,
} from "@/components/icons/database-icons";
import { MoreHorizontal, PlusCircle, CheckCircle } from "lucide-react";
import { initialDatabaseConnections } from "@/lib/data";
import type { DatabaseConnection, DatabaseType } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";

const dbIcons: Record<DatabaseType, React.ElementType> = {
  postgresql: PostgresqlIcon,
  mysql: MysqlIcon,
  firestore: FirestoreIcon,
};

function DatabaseCard({ db }: { db: DatabaseConnection }) {
  const Icon = dbIcons[db.type];
  const connectionString = `${db.user}@${db.host}:${db.port}/${db.dbname}`;

  return (
    <Card className="transition-all hover:shadow-lg hover:-translate-y-1 flex flex-col">
      <CardHeader className="flex flex-row items-start gap-4 space-y-0">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg border bg-secondary flex-shrink-0">
          <Icon className="h-6 w-6 text-muted-foreground" />
        </div>
        <div className="flex-1">
          <CardTitle className="text-base font-medium">{db.name}</CardTitle>
          <CardDescription className="capitalize">{db.type}</CardDescription>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Modifier</DropdownMenuItem>
            <DropdownMenuItem>Tester la connexion</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              Supprimer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="font-code text-sm bg-muted p-3 rounded-md text-muted-foreground break-all">
          {connectionString}
        </p>
      </CardContent>
      <CardFooter className="bg-secondary/50 px-6 py-3 rounded-b-lg">
          <Button variant="outline" size="sm" className="w-full">
            <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
            Connexion réussie
          </Button>
      </CardFooter>
    </Card>
  );
}

function DatabaseCardSkeleton() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-row items-start gap-4 space-y-0">
        <Skeleton className="h-12 w-12 rounded-lg flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <div className="h-8 w-8 flex-shrink-0" />
      </CardHeader>
      <CardContent className="flex-grow">
        <Skeleton className="h-16 w-full" />
      </CardContent>
      <CardFooter className="bg-secondary/50 px-6 py-3 rounded-b-lg">
        <Skeleton className="h-9 w-full" />
      </CardFooter>
    </Card>
  );
}


export default function DatabasesPage() {
  const [databases, setDatabases] = useState(initialDatabaseConnections);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
            <h2 className="text-2xl font-headline font-semibold">Connexions aux bases de données</h2>
            <p className="text-muted-foreground mt-1">Gérez les bases de données utilisées pour alimenter l'IA.</p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Ajouter une connexion
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hasMounted
          ? databases.map((db) => <DatabaseCard key={db.id} db={db} />)
          : initialDatabaseConnections.map((db) => (
              <DatabaseCardSkeleton key={db.id} />
            ))}
      </div>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Ajouter une connexion à la base de données</DialogTitle>
            <DialogDescription>
              Entrez les détails de votre nouvelle connexion.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Nom</Label>
              <Input id="name" placeholder="Ex: Ma BD de production" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">Type</Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Choisir un type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="postgresql">PostgreSQL</SelectItem>
                  <SelectItem value="mysql">MySQL</SelectItem>
                  <SelectItem value="firestore">Firestore</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="host" className="text-right">Hôte</Label>
              <Input id="host" placeholder="db.example.com" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="port" className="text-right">Port</Label>
              <Input id="port" type="number" placeholder="5432" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="user" className="text-right">Utilisateur</Label>
              <Input id="user" placeholder="db_user" className="col-span-3" />
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">Mot de passe</Label>
              <Input id="password" type="password" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dbname" className="text-right">Base de données</Label>
              <Input id="dbname" placeholder="production_db" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Enregistrer la connexion</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
