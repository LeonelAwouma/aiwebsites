"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
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
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MoreHorizontal, PlusCircle, Globe } from "lucide-react";
import { initialWebsiteSources } from "@/lib/data";
import type { WebsiteSource } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

function WebsiteSourceCard({
  source,
  onToggle,
  onEdit,
  onRefresh,
  onDelete,
}: {
  source: WebsiteSource;
  onToggle: (id: string, isActive: boolean) => void;
  onEdit: (source: WebsiteSource) => void;
  onRefresh: (source: WebsiteSource) => void;
  onDelete: (source: WebsiteSource) => void;
}) {

  return (
    <Card className="transition-all hover:shadow-lg hover:-translate-y-1">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary">
               <Globe className="h-6 w-6 text-muted-foreground" />
            </div>
            <div>
              <CardTitle className="text-base font-semibold">
                {source.name}
              </CardTitle>
              <CardDescription>{source.url}</CardDescription>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(source)}>Modifier</DropdownMenuItem>
              <DropdownMenuItem onClick={() => onRefresh(source)}>Rafraîchir</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive" onClick={() => onDelete(source)}>
                Supprimer
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardFooter className="flex justify-between items-center bg-secondary/50 px-6 py-3 rounded-b-lg">
        <div className="flex items-center gap-2">
            <div className={cn("h-2 w-2 rounded-full", source.isActive ? "bg-green-500" : "bg-muted-foreground")} />
            <span
            className={`text-sm font-medium ${
                source.isActive ? "text-foreground" : "text-muted-foreground"
            }`}
            >
            {source.isActive ? "Actif" : "Inactif"}
            </span>
        </div>
        <Switch
          checked={source.isActive}
          onCheckedChange={(checked) => onToggle(source.id, checked)}
        />
      </CardFooter>
    </Card>
  );
}

function WebsiteSourceCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary">
              <Globe className="h-6 w-6 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
          <div className="h-8 w-8 flex-shrink-0" />
        </div>
      </CardHeader>
      <CardFooter className="flex justify-between items-center bg-secondary/50 px-6 py-3 rounded-b-lg">
        <div className="flex items-center gap-2">
          <Skeleton className="h-2 w-2 rounded-full" />
          <Skeleton className="h-4 w-12" />
        </div>
        <Skeleton className="h-6 w-11 rounded-full" />
      </CardFooter>
    </Card>
  );
}

export default function WebsitesPage() {
  const [sources, setSources] = useState<WebsiteSource[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [editingSource, setEditingSource] = useState<WebsiteSource | null>(null);
  const [sourceToDelete, setSourceToDelete] = useState<WebsiteSource | null>(null);
  const [newSourceName, setNewSourceName] = useState("");
  const [newSourceUrl, setNewSourceUrl] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    setHasMounted(true);
    setSources(initialWebsiteSources);
  }, []);
  
  const isEditing = !!editingSource;

  const handleToggle = (id: string, isActive: boolean) => {
    setSources(
      sources.map((s) => (s.id === id ? { ...s, isActive } : s))
    );
  };
  
  const handleOpenDialog = (source: WebsiteSource | null) => {
    setEditingSource(source);
    if (source) {
      setNewSourceName(source.name);
      setNewSourceUrl(source.url);
    } else {
      setNewSourceName('');
      setNewSourceUrl('');
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingSource(null);
    setNewSourceName('');
    setNewSourceUrl('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSourceName || !newSourceUrl) {
      toast({
        variant: "destructive",
        title: "Champs requis",
        description: "Veuillez renseigner le nom et l'URL.",
      });
      return;
    }

    if (isEditing && editingSource) {
      setSources(sources.map(s => s.id === editingSource.id ? { ...s, name: newSourceName, url: newSourceUrl } : s));
      toast({ title: 'Source mise à jour', description: `La source "${newSourceName}" a été mise à jour.` });
    } else {
      const newSource: WebsiteSource = {
        id: `ws-${Date.now()}`,
        name: newSourceName,
        url: newSourceUrl,
        isActive: true,
      };
      setSources([newSource, ...sources]);
      toast({ title: 'Source ajoutée', description: `La source "${newSourceName}" a été ajoutée.` });
    }
    handleCloseDialog();
  };

  const handleOpenDeleteDialog = (source: WebsiteSource) => {
    setSourceToDelete(source);
  };

  const handleConfirmDelete = () => {
    if (sourceToDelete) {
      setSources(sources.filter(s => s.id !== sourceToDelete.id));
      toast({ title: 'Source supprimée', description: `La source "${sourceToDelete.name}" a été supprimée.` });
    }
    setSourceToDelete(null);
  };

  const handleRefresh = (source: WebsiteSource) => {
    toast({
      title: `Rafraîchissement de ${source.name}`,
      description: 'Cette opération peut prendre quelques instants...',
    });
    // Simulate a delay
    setTimeout(() => {
        toast({
            title: 'Source rafraîchie !',
            description: `${source.name} a été mis à jour avec succès.`,
        });
    }, 2000);
  };


  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
            <h2 className="text-2xl font-headline font-semibold">Sources de sites web</h2>
            <p className="text-muted-foreground mt-1">Gérez les sites web utilisés pour alimenter l'IA.</p>
        </div>
        <Button onClick={() => handleOpenDialog(null)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Ajouter un site
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hasMounted
          ? sources.map((source) => (
              <WebsiteSourceCard
                key={source.id}
                source={source}
                onToggle={handleToggle}
                onEdit={handleOpenDialog}
                onRefresh={handleRefresh}
                onDelete={handleOpenDeleteDialog}
              />
            ))
          : initialWebsiteSources.map((source) => (
              <WebsiteSourceCardSkeleton key={source.id} />
            ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>{isEditing ? 'Modifier la source' : 'Ajouter une source de site web'}</DialogTitle>
              <DialogDescription>
                {isEditing ? "Modifiez les détails de votre source." : "Entrez l'URL du site web que vous souhaitez ajouter comme source de données."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nom
                </Label>
                <Input
                  id="name"
                  value={newSourceName}
                  onChange={(e) => setNewSourceName(e.target.value)}
                  placeholder="Ex: Blog de mon entreprise"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="url" className="text-right">
                  URL
                </Label>
                <Input
                  id="url"
                  value={newSourceUrl}
                  onChange={(e) => setNewSourceUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">{isEditing ? 'Enregistrer les modifications' : 'Enregistrer la source'}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      <AlertDialog open={!!sourceToDelete} onOpenChange={(open) => !open && setSourceToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr de vouloir supprimer cette source ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. La source "{sourceToDelete?.name}" sera définitivement supprimée.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setSourceToDelete(null)}>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete} className="bg-destructive hover:bg-destructive/90">
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
