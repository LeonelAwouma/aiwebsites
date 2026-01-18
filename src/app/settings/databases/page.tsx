"use client";

import { useState } from "react";
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
import { MoreHorizontal, PlusCircle } from "lucide-react";
import { initialDatabaseConnections } from "@/lib/data";
import type { DatabaseConnection, DatabaseType } from "@/lib/types";

const dbIcons: Record<DatabaseType, React.ElementType> = {
  postgresql: PostgresqlIcon,
  mysql: MysqlIcon,
  firestore: FirestoreIcon,
};

function DatabaseCard({ db }: { db: DatabaseConnection }) {
  const Icon = dbIcons[db.type];
  const connectionString = `${db.user}@${db.host}:${db.port}/${db.dbname}`;

  return (
    <Card>
      <CardHeader className="flex flex-row items-start gap-4 space-y-0">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg border bg-secondary">
          <Icon className="h-6 w-6 text-muted-foreground" />
        </div>
        <div className="flex-1">
          <CardTitle className="text-base font-medium">{db.name}</CardTitle>
          <CardDescription className="capitalize">{db.type}</CardDescription>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Test Connection</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <p className="font-code text-sm bg-muted p-2 rounded-md text-muted-foreground">
          {connectionString}
        </p>
      </CardContent>
    </Card>
  );
}

export default function DatabasesPage() {
  const [databases, setDatabases] = useState(initialDatabaseConnections);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Database Connections</h2>
        <Button onClick={() => setIsDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Connection
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {databases.map((db) => (
          <DatabaseCard key={db.id} db={db} />
        ))}
      </div>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Database Connection</DialogTitle>
            <DialogDescription>
              Enter the details for your new database connection.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input id="name" placeholder="My Production DB" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">Type</Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="postgresql">PostgreSQL</SelectItem>
                  <SelectItem value="mysql">MySQL</SelectItem>
                  <SelectItem value="firestore">Firestore</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="host" className="text-right">Host</Label>
              <Input id="host" placeholder="db.example.com" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="port" className="text-right">Port</Label>
              <Input id="port" type="number" placeholder="5432" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="user" className="text-right">User</Label>
              <Input id="user" placeholder="db_user" className="col-span-3" />
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">Password</Label>
              <Input id="password" type="password" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dbname" className="text-right">Database</Label>
              <Input id="dbname" placeholder="production_db" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save connection</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
