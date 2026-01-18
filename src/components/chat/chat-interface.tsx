"use client";

import { useState, useRef, useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SendHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import type { ChatMessage } from "@/lib/types";
import { getAiResponse } from "@/lib/actions";
import { EmptyState } from "./empty-state";
import { ChatMessageBubble } from "./chat-message";
import { MessageLoader } from "./message-loader";
import { AiIcon } from "../icons/ai-icon";

const formSchema = z.object({
  message: z.string().min(1, "Message cannot be empty."),
});

let idCounter = 0;
const generateId = () => `chat-message-${Date.now()}-${idCounter++}`;

export function ChatInterface() {
  const { toast } = useToast();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isPending, startTransition] = useTransition();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { message: "" },
  });

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const userMessage: ChatMessage = {
      id: generateId(),
      role: "user",
      content: values.message,
    };
    setMessages((prev) => [...prev, userMessage]);
    form.reset();

    startTransition(async () => {
      const res = await getAiResponse(messages, values.message);

      if (!res.aiResponse) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to get a response from the AI.",
        });
        return;
      }

      const aiMessage: ChatMessage = {
        id: generateId(),
        role: "assistant",
        content: res.aiResponse,
        sources: res.sources,
      };
      setMessages((prev) => [...prev, aiMessage]);
    });
  };

  return (
    <div className="flex flex-col h-full bg-background">
      <header className="flex items-center gap-3 p-4 border-b">
        <AiIcon variant="subtle" className="h-8 w-8 text-sm" />
        <h2 className="font-semibold text-lg">New Conversation</h2>
      </header>
      <div ref={scrollAreaRef} className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          {messages.length === 0 ? (
            <EmptyState onExampleClick={(q) => form.setValue("message", q)} />
          ) : (
            <div className="space-y-6">
              {messages.map((msg) => (
                <ChatMessageBubble key={msg.id} {...msg} />
              ))}
              {isPending && <MessageLoader />}
            </div>
          )}
        </div>
      </div>

      <div className="p-4 md:p-6 bg-background border-t">
        <div className="max-w-4xl mx-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="relative">
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Posez votre question..."
                        className="pr-14 h-12"
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            form.handleSubmit(onSubmit)();
                          }
                        }}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="absolute top-1/2 -translate-y-1/2 right-3 flex items-center">
                <Button
                  type="submit"
                  size="icon"
                  disabled={isPending}
                  className="rounded-full h-9 w-9"
                >
                  <SendHorizontal className="h-5 w-5" />
                  <span className="sr-only">Send</span>
                </Button>
              </div>
            </form>
          </Form>
          <p className="text-xs text-center text-muted-foreground mt-3">
            Appuyez sur Entrée pour envoyer, Shift+Entrée pour une nouvelle
            ligne
          </p>
        </div>
      </div>
    </div>
  );
}
