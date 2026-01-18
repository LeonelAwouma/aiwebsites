"use client";

import { useState, useRef, useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Paperclip, SendHorizontal, X } from "lucide-react";
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
import { Badge } from "../ui/badge";

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
  const [attachedFile, setAttachedFile] = useState<File | null>(null);

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

  const handleFileAttach = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setAttachedFile(event.target.files[0]);
    }
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const userMessage: ChatMessage = {
      id: generateId(),
      role: "user",
      content: values.message,
    };
    setMessages((prev) => [...prev, userMessage]);
    form.reset();
    setAttachedFile(null);

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
    <div className="flex flex-col h-full">
      <div
        ref={scrollAreaRef}
        className="flex-1 overflow-y-auto p-4 md:p-6"
      >
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

      <div className="p-4 md:p-6 bg-background/75 backdrop-blur-sm border-t">
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
                        placeholder="Ask SourceWise anything..."
                        className="pr-24 min-h-[52px] resize-none"
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
              <div className="absolute top-1/2 -translate-y-1/2 right-3 flex items-center gap-2">
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Button variant="ghost" size="icon" asChild>
                    <div>
                      <Paperclip className="h-5 w-5 text-muted-foreground" />
                      <span className="sr-only">Attach file</span>
                    </div>
                  </Button>
                </label>
                <input id="file-upload" type="file" className="hidden" onChange={handleFileAttach}/>
                <Button type="submit" size="icon" disabled={isPending}>
                  <SendHorizontal className="h-5 w-5" />
                  <span className="sr-only">Send</span>
                </Button>
              </div>
            </form>
          </Form>
           {attachedFile && (
            <div className="mt-2">
              <Badge variant="secondary" className="flex items-center gap-2 max-w-min">
                <span>{attachedFile.name}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 rounded-full"
                  onClick={() => setAttachedFile(null)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            </div>
          )}
          <p className="text-xs text-center text-muted-foreground mt-3">
            SourceWise AI can make mistakes. Consider checking important information.
          </p>
        </div>
      </div>
    </div>
  );
}
