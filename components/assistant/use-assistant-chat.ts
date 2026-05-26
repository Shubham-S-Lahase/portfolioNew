"use client";

import { useCallback, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import {
  createUIMessageStream,
  createUIMessageStreamResponse,
  DefaultChatTransport,
  type UIMessage,
} from "ai";

export type RomanticRevealState = {
  stanzas: string[];
  userId: string;
} | null;

export function useAssistantChat() {
  const [romantic, setRomantic] = useState<RomanticRevealState>(null);
  const romanticRef = useRef(setRomantic);
  romanticRef.current = setRomantic;

  const { messages, setMessages, sendMessage, status, error, stop } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
      fetch: async (input, init) => {
        const response = await fetch(input, init);
        if (response.headers.get("X-Portfolio-Mode") === "rose") {
          const data = (await response.json()) as { stanzas: string[] };
          try {
            const body = JSON.parse(String(init?.body ?? "{}")) as {
              messages?: UIMessage[];
            };
            const lastUser = [...(body.messages ?? [])]
              .reverse()
              .find((m) => m.role === "user");
            if (lastUser?.id) {
              romanticRef.current({
                stanzas: data.stanzas,
                userId: lastUser.id,
              });
            }
          } catch {
            /* ignore parse errors */
          }
          return createUIMessageStreamResponse({
            stream: createUIMessageStream({
              execute({ writer }) {
                writer.write({ type: "finish", finishReason: "stop" });
              },
            }),
          });
        }
        return response;
      },
    }),
  });

  const isBusy = status === "submitted" || status === "streaming";

  const clearChat = useCallback(() => {
    stop();
    setMessages([]);
    setRomantic(null);
  }, [stop, setMessages]);

  const sendUserMessage = useCallback(
    async (text: string) => {
      setRomantic(null);
      await sendMessage({ text });
    },
    [sendMessage]
  );

  return {
    messages,
    status,
    error,
    romantic,
    isBusy,
    sendUserMessage,
    stop,
    clearChat,
  };
}
