"use client";

import { useEffect, useRef, useState } from "react";
import {  useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Loader2, Zap } from "lucide-react";
import Navbar from "./Navbar";

interface Message {
    role: "user" | "assistant";
    content: string;
}

export default function ChatInterface() {
    const { user } = useUser();
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput("");
        setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
        setIsLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: userMessage }),
            });

            const data = await response.json();
            if (response.ok) {
                setMessages((prev) => [
                    ...prev,
                    { role: "assistant", content: data.response },
                ]);
            } else {
                throw new Error(data.error || "Failed to get response");
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    <div className="flex flex-col h-screen min-h-screen overflow-hidden bg-gradient-to-br from-purple-950 via-black to-purple-900">
      {/* Navbar */}
      <Navbar />

      {/* Chat container - adjusted for full height and mobile scroll */}
      <div className="flex-1 overflow-hidden pt-16 px-4 pb-2 flex flex-col">
        <Card className="relative flex-1 bg-purple-950/30 backdrop-blur-lg border-purple-500/20 overflow-hidden">
          <ScrollArea className="h-full w-full pr-4 pb-4">
            <div className="space-y-4 p-2">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-3 ${
                    message.role === "assistant" ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  {message.role === "assistant" ? (
                    <Avatar className="border-2 border-purple-500/50">
                      <AvatarFallback className="bg-purple-700">
                        <Zap className="h-5 w-5 text-purple-200" />
                      </AvatarFallback>
                    </Avatar>
                  ) : (
                    <Avatar className="border-2 border-pink-500/50">
                      <AvatarImage src={user?.imageUrl} />
                      <AvatarFallback className="bg-pink-700 text-white">
                        {user?.firstName?.[0] || "U"}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`rounded-lg px-4 py-2 max-w-[80%] backdrop-blur-sm ${
                      message.role === "assistant"
                        ? "bg-purple-900/80 text-purple-50 shadow-lg shadow-purple-900/20"
                        : "bg-gradient-to-r from-pink-600 to-purple-600 text-white ml-auto shadow-lg shadow-purple-900/20"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-center gap-2 text-purple-200">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>ZenZai is thinking...</span>
                </div>
              )}
              {/* Invisible div to help with scrolling */}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        </Card>
      </div>

      {/* Input form - fixed at bottom */}
      <form onSubmit={handleSubmit} className="px-4 pb-4 pt-2 bg-transparent">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Talk To ZenZai..."
            className="bg-purple-950/30 border-purple-500/20 text-white placeholder:text-purple-300/50 backdrop-blur-sm focus:border-purple-400/50 focus:ring-purple-400/50"
          />
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}