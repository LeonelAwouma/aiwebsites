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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/settings/websites" className="block">
          <Card className="hover:border-primary">
            <CardHeader className="flex-row gap-4 items-center">
              <Globe className="h-8 w-8 text-primary" />
              <div>
                <CardTitle>Website Sources</CardTitle>
                <CardDescription>
                  Manage your website data sources.
                </CardDescription>
              </div>
            </CardHeader>
          </Card>
        </Link>
        <Link href="/settings/databases" className="block">
          <Card className="hover:border-primary">
            <CardHeader className="flex-row gap-4 items-center">
              <Database className="h-8 w-8 text-primary" />
              <div>
                <CardTitle>Database Connections</CardTitle>
                <CardDescription>
                  Manage your database connections.
                </CardDescription>
              </div>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </div>
  );
}
