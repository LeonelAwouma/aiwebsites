"use client";

import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import { initialWebsiteSources } from "@/lib/data";
import type { WebsiteSource } from "@/lib/types";

function WebsiteSourceCard({
  source,
  onToggle,
}: {
  source: WebsiteSource;
  onToggle: (id: string, isActive: boolean) => void;
}) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary font-bold text-primary">
              {getInitials(source.name)}
            </div>
            <div>
              <CardTitle className="text-base font-medium">
                {source.name}
              </CardTitle>
              <CardDescription>{source.url}</CardDescription>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Refresh</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardFooter className="flex justify-between items-center">
        <span
          className={`text-sm font-medium ${
            source.isActive ? "text-primary" : "text-muted-foreground"
          }`}
        >
          {source.isActive ? "Active" : "Inactive"}
        </span>
        <Switch
          checked={source.isActive}
          onCheckedChange={(checked) => onToggle(source.id, checked)}
        />
      </CardFooter>
    </Card>
  );
}

export default function WebsitesPage() {
  const [sources, setSources] = useState<WebsiteSource[]>(
    initialWebsiteSources
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleToggle = (id: string, isActive: boolean) => {
    setSources(
      sources.map((s) => (s.id === id ? { ...s, isActive } : s))
    );
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Website Sources</h2>
        <Button onClick={() => setIsDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Website
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sources.map((source) => (
          <WebsiteSourceCard
            key={source.id}
            source={source}
            onToggle={handleToggle}
          />
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Website Source</DialogTitle>
            <DialogDescription>
              Enter the URL of the website you want to add as a data source.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                placeholder="e.g. My Company Blog"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="url" className="text-right">
                URL
              </Label>
              <Input
                id="url"
                placeholder="https://example.com"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save source</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
