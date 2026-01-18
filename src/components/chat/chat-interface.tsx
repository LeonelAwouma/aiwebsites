"use client";

import { useState, useRef, useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SendHorizontal, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
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
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Brand } from "../brand";


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
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { message: "" },
  });
  
  const { watch } = form;
  const messageValue = watch("message");

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [messageValue]);


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
      <header className="flex items-center gap-4 p-4 border-b">
        <SidebarTrigger className="md:hidden" />
        <div className="md:hidden">
            <Brand />
        </div>
        <h2 className="font-semibold text-lg hidden md:block">Nouvelle conversation</h2>
      </header>
      <div ref={scrollAreaRef} className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-6 md:py-10">
          {messages.length === 0 ? (
            <EmptyState onExampleClick={(q) => form.setValue("message", q)} />
          ) : (
            <div className="space-y-8">
              {messages.map((msg) => (
                <ChatMessageBubble key={msg.id} {...msg} />
              ))}
              {isPending && <MessageLoader />}
            </div>
          )}
        </div>
      </div>

      <div className="p-4 md:p-6 bg-background/95 backdrop-blur-sm border-t">
        <div className="max-w-4xl mx-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="relative">
               <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        {...field}
                        ref={textareaRef}
                        rows={1}
                        placeholder="Posez votre question..."
                        className="pr-16 py-3 min-h-[52px] max-h-48 resize-none"
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            if (field.value.trim()) {
                                form.handleSubmit(onSubmit)();
                            }
                          }
                        }}
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
                  disabled={isPending || !messageValue?.trim()}
                  className="rounded-full h-9 w-9"
                >
                  {isPending ? <LoaderCircle className="h-5 w-5 animate-spin" /> : <SendHorizontal className="h-5 w-5" />}
                  <span className="sr-only">Envoyer</span>
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
