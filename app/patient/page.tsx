"use client";

import React from "react";
import { PreviewMessage, ThinkingMessage } from "@/components/message";
import { MultimodalInput } from "@/components/multimodal-input";
import { useScrollToBottom } from "@/hooks/use-scroll-to-bottom";
import { useChat } from "ai/react";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function PatientChatPage() {
  const chatId = "patient-001";

  const {
    messages,
    setMessages,
    handleSubmit,
    input,
    setInput,
    append,
    isLoading,
    stop,
  } = useChat({
    api: "/api/patient-chat",
    maxSteps: 4,
    onError: (error) => {
      if (error.message.includes("Too many requests")) {
        toast.error(
          "You are sending too many messages. Please try again later.",
        );
      }
    },
  });

  const [messagesContainerRef, messagesEndRef] =
    useScrollToBottom<HTMLDivElement>();

  const hasMessages = messages.length > 0;

  return (
    <div className="flex h-[calc(100dvh-64px)] overflow-hidden bg-background">
      <div className="flex flex-col h-full w-full overflow-hidden">
        <div className="flex flex-col min-w-0 h-full bg-background">
          {/* Header */}
          {hasMessages && (
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="flex-shrink-0 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80"
            >
              <div className="px-4 py-4">
                <div className="flex flex-col gap-3 max-w-4xl mx-auto">
                  <motion.div
                    className="flex flex-col gap-0.5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                  >
                    <p className="text-white font-medium text-base sm:text-lg leading-tight tracking-tight">
                      Patient Health Assistant
                    </p>
                    <p className="text-muted-foreground font-normal text-xs sm:text-sm tracking-tight">
                      Tell us about your symptoms and health concerns
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}

          <div
            ref={messagesContainerRef}
            className="flex flex-col flex-1 overflow-y-scroll pt-4"
          >
            <div className="px-4">
              {/* Welcome message when no messages */}
              {!hasMessages && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="flex flex-col items-center justify-center min-h-[calc(100vh-300px)]"
                >
                  <div className="max-w-2xl w-full space-y-6 px-4">
                    <div className="text-center space-y-3">
                      <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                        Welcome to Patient Care
                      </h1>
                      <p className="text-lg text-muted-foreground">
                        I'm here to help answer your health questions and gather information about your symptoms.
                      </p>
                    </div>
                    
                    <div className="grid gap-4 md:grid-cols-2 mt-8">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => append({ role: "user", content: "I'd like to schedule an appointment" })}
                        className="p-4 rounded-lg border border-border/50 bg-card hover:bg-accent text-left transition-colors"
                      >
                        <p className="font-semibold mb-1">Schedule Appointment</p>
                        <p className="text-sm text-muted-foreground">Book a visit with a provider</p>
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => append({ role: "user", content: "I'm not feeling well and want to discuss my symptoms" })}
                        className="p-4 rounded-lg border border-border/50 bg-card hover:bg-accent text-left transition-colors"
                      >
                        <p className="font-semibold mb-1">Discuss Symptoms</p>
                        <p className="text-sm text-muted-foreground">Tell us what you're experiencing</p>
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => append({ role: "user", content: "I have a question about my medications" })}
                        className="p-4 rounded-lg border border-border/50 bg-card hover:bg-accent text-left transition-colors"
                      >
                        <p className="font-semibold mb-1">Medication Questions</p>
                        <p className="text-sm text-muted-foreground">Ask about your prescriptions</p>
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => append({ role: "user", content: "I need to update my medical history" })}
                        className="p-4 rounded-lg border border-border/50 bg-card hover:bg-accent text-left transition-colors"
                      >
                        <p className="font-semibold mb-1">Update Information</p>
                        <p className="text-sm text-muted-foreground">Update medical history or details</p>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}

              {messages.map((message, index) => (
                <PreviewMessage
                  key={message.id}
                  chatId={chatId}
                  message={message}
                  isLoading={isLoading && messages.length - 1 === index}
                />
              ))}

              {isLoading &&
                messages.length > 0 &&
                messages[messages.length - 1].role === "user" && <ThinkingMessage />}

              <div
                ref={messagesEndRef}
                className="shrink-0 min-w-[24px] min-h-[24px]"
              />
            </div>
          </div>

          <div className="flex-shrink-0 mx-auto px-4 bg-background pb-4 md:pb-6 w-full md:max-w-3xl">
            <MultimodalInput
              chatId={chatId}
              input={input}
              setInput={setInput}
              handleSubmit={handleSubmit}
              isLoading={isLoading}
              stop={stop}
              messages={messages}
              setMessages={setMessages}
              append={append}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

