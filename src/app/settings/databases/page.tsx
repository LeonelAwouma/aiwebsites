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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
import { MoreHorizontal, PlusCircle, CheckCircle, AlertTriangle } from "lucide-react";
import { initialDatabaseConnections } from "@/lib/data";
import type { DatabaseConnection, DatabaseType } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

const dbIcons: Record<DatabaseType, React.ElementType> = {
  postgresql: PostgresqlIcon,
  mysql: MysqlIcon,
  firestore: FirestoreIcon,
};

function DatabaseCard({ 
  db,
  onEdit,
  onTest,
  onDelete,
}: { 
  db: DatabaseConnection;
  onEdit: (db: DatabaseConnection) => void;
  onTest: (db: DatabaseConnection) => void;
  onDelete: (db: DatabaseConnection) => void;
 }) {
  const Icon = dbIcons[db.type];
  const connectionString = `${db.user}@${db.host}:${db.port}/${db.dbname}`;
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<'success' | 'error' | null>(null);

  const handleTest = () => {
    setIsTesting(true);
    setTestResult(null);
    onTest(db);
    // Simulate test duration
    setTimeout(() => {
      setIsTesting(false);
      // Simulate random success/failure
      setTestResult(Math.random() > 0.3 ? 'success' : 'error');
    }, 2000);
  };

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
            <DropdownMenuItem onClick={() => onEdit(db)}>Modifier</DropdownMenuItem>
            <DropdownMenuItem onClick={handleTest}>Tester la connexion</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive" onClick={() => onDelete(db)}>
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
          <Button variant="outline" size="sm" className="w-full" onClick={handleTest} disabled={isTesting}>
            {isTesting ? (
              'Test en cours...'
            ) : testResult === 'success' ? (
               <><CheckCircle className="h-4 w-4 mr-2 text-green-500" /> Connexion réussie</>
            ) : testResult === 'error' ? (
              <><AlertTriangle className="h-4 w-4 mr-2 text-destructive" /> Échec de la connexion</>
            ) : (
              'Tester la connexion'
            )}
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
  const [databases, setDatabases] = useState<DatabaseConnection[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const { toast } = useToast();

  const initialFormState: Omit<DatabaseConnection, 'id' | 'password'> & { password?: string } = {
    name: "",
    type: "postgresql",
    host: "",
    port: 5432,
    user: "",
    dbname: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [editingConnection, setEditingConnection] = useState<DatabaseConnection | null>(null);
  const [connectionToDelete, setConnectionToDelete] = useState<DatabaseConnection | null>(null);
  const isEditing = !!editingConnection;

  useEffect(() => {
    setHasMounted(true);
    setDatabases(initialDatabaseConnections);
  }, []);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: id === 'port' ? (value ? parseInt(value) : '') : value });
  };
  
  const handleSelectChange = (value: DatabaseType) => {
    setFormData({ ...formData, type: value });
  };

  const handleOpenDialog = (db: DatabaseConnection | null) => {
    setEditingConnection(db);
    if (db) {
      const { ...dbData } = db;
      setFormData({ ...dbData, password: ''});
    } else {
      setFormData(initialFormState);
    }
    setIsDialogOpen(true);
  };
  
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingConnection(null);
    setFormData(initialFormState);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.host || !formData.dbname) {
        toast({
            variant: "destructive",
            title: "Champs requis",
            description: "Veuillez renseigner au moins le nom, l'hôte et la base de données.",
        });
        return;
    }

    if (isEditing && editingConnection) {
        const updatedConnection = { ...editingConnection, ...formData };
        if (!formData.password) {
          delete (updatedConnection as any).password;
        }
        setDatabases(databases.map(db => db.id === editingConnection.id ? updatedConnection : db));
        toast({ title: 'Connexion mise à jour', description: `La connexion "${formData.name}" a été mise à jour.` });
    } else {
        const newConnection: DatabaseConnection = {
            id: `db-${Date.now()}`,
            name: formData.name,
            type: formData.type,
            host: formData.host,
            port: formData.port as number,
            user: formData.user,
            dbname: formData.dbname,
        };
        setDatabases([newConnection, ...databases]);
        toast({ title: 'Connexion ajoutée', description: `La connexion "${formData.name}" a été ajoutée.` });
    }
    handleCloseDialog();
  };

  const handleOpenDeleteDialog = (db: DatabaseConnection) => {
    setConnectionToDelete(db);
  };

  const handleConfirmDelete = () => {
    if (connectionToDelete) {
        setDatabases(databases.filter(db => db.id !== connectionToDelete.id));
        toast({ title: 'Connexion supprimée', description: `La connexion "${connectionToDelete.name}" a été supprimée.` });
    }
    setConnectionToDelete(null);
  };

  const handleTestConnection = (db: DatabaseConnection) => {
    toast({
        title: `Test de connexion pour ${db.name}`,
        description: `Envoi d'une requête à ${db.host}...`,
    });
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
            <h2 className="text-2xl font-headline font-semibold">Connexions aux bases de données</h2>
            <p className="text-muted-foreground mt-1">Gérez les bases de données utilisées pour alimenter l'IA.</p>
        </div>
        <Button onClick={() => handleOpenDialog(null)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Ajouter une connexion
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hasMounted
          ? databases.map((db) => (
              <DatabaseCard 
                key={db.id} 
                db={db}
                onEdit={handleOpenDialog}
                onTest={handleTestConnection}
                onDelete={handleOpenDeleteDialog}
              />
            ))
          : initialDatabaseConnections.map((db) => (
              <DatabaseCardSkeleton key={db.id} />
            ))}
      </div>
      
      <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>{isEditing ? 'Modifier la connexion' : 'Ajouter une connexion à la base de données'}</DialogTitle>
              <DialogDescription>
                {isEditing ? 'Modifiez les détails de votre connexion.' : 'Entrez les détails de votre nouvelle connexion.'}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Nom</Label>
                <Input id="name" value={formData.name} onChange={handleInputChange} placeholder="Ex: Ma BD de production" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">Type</Label>
                <Select value={formData.type} onValueChange={handleSelectChange}>
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
                <Input id="host" value={formData.host} onChange={handleInputChange} placeholder="db.example.com" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="port" className="text-right">Port</Label>
                <Input id="port" type="number" value={formData.port} onChange={handleInputChange} placeholder="5432" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="user" className="text-right">Utilisateur</Label>
                <Input id="user" value={formData.user} onChange={handleInputChange} placeholder="db_user" className="col-span-3" />
              </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">Mot de passe</Label>
              <Input id="password" type="password" value={formData.password || ''} onChange={handleInputChange} placeholder={isEditing ? 'Laisser vide pour ne pas changer' : ''} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dbname" className="text-right">Base de données</Label>
              <Input id="dbname" value={formData.dbname} onChange={handleInputChange} placeholder="production_db" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">{isEditing ? 'Enregistrer les modifications' : 'Enregistrer la connexion'}</Button>
          </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      <AlertDialog open={!!connectionToDelete} onOpenChange={(open) => !open && setConnectionToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr de vouloir supprimer cette connexion ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. La connexion "{connectionToDelete?.name}" sera définitivement supprimée.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setConnectionToDelete(null)}>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete} className="bg-destructive hover:bg-destructive/90">
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
