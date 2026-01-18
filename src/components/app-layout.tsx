"use client";

import React from "react";
import Link from "next/link";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Plus, Settings } from "lucide-react";
import { ConversationHistory } from "@/components/chat/conversation-history";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <Button className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Nouvelle conversation
          </Button>
        </SidebarHeader>
        <SidebarContent>
          <ConversationHistory />
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild variant="ghost">
                <Link href="/settings">
                  <Settings />
                  <span>Paramètres</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
};

export default AppLayout;
