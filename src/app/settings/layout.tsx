import AppLayout from "@/components/app-layout";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppLayout>
      <div className="p-4 md:p-6 h-full">
        <header className="mb-6">
          <h1 className="text-2xl font-headline font-semibold">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage your data sources and application settings.
          </p>
        </header>
        {children}
      </div>
    </AppLayout>
  );
}
