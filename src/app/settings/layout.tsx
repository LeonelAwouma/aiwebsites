import AppLayout from "@/components/app-layout";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppLayout>
      <div className="p-4 md:p-8 h-full">
        {children}
      </div>
    </AppLayout>
  );
}
