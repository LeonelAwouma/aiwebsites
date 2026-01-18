"use client";

import React from "react";
import Link from "next/link";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Plus, Settings } from "lucide-react";
import { ConversationHistory } from "@/components/chat/conversation-history";
import { Brand } from "@/components/brand";
import { ThemeToggle } from "@/components/theme-toggle";

const AppLayout = ({ children }: { children: React.ReactNode }) => {

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <Brand />
        </SidebarHeader>
        <div className="p-2">
          <Button asChild className="w-full justify-start text-sm font-normal">
            <Link href="/">
              <Plus className="mr-2 h-4 w-4" />
              Nouvelle conversation
            </Link>
          </Button>
        </div>
        <SidebarContent>
          <ConversationHistory />
        </SidebarContent>
        <SidebarFooter className="mt-auto flex items-center justify-between border-t p-2">
          <SidebarMenu className="flex-1">
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/settings">
                  <Settings className="h-5 w-5" />
                  <span>Paramètres</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <ThemeToggle />
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
};

export default AppLayout;
