"use server";

import { z } from "zod";
import { analyzeUserQuestion } from "@/ai/flows/analyze-user-question-to-determine-relevant-sources";
import { generateNaturalLanguageResponse } from "@/ai/flows/generate-natural-language-response";
import type { ChatMessage } from "./types";

const chatSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(["user", "assistant"]),
      content: z.string(),
    })
  ),
});

export async function getAiResponse(
  history: ChatMessage[],
  question: string
): Promise<{ aiResponse: string; sources: string[] }> {
  const fullHistory = [
    ...history,
    { id: "temp", role: "user" as const, content: question },
  ];

  // To simulate a network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  try {
    // 1. Analyze the user's question to determine relevant sources
    const analysis = await analyzeUserQuestion({ question });
    const { relevantSources, requiresCodeSnippet } = analysis;

    // 2. Simulate data retrieval from the identified sources
    // In a real application, you would fetch data from APIs, databases, or scrape websites here.
    const retrievedInformation = `Based on the analysis, information was retrieved from the following sources: ${
      relevantSources.join(", ") || "general knowledge"
    }. The query for "${question}" returned mock data successfully. This is a placeholder for real-time data fetching.`;

    // 3. Generate a natural language response based on the retrieved information
    const response = await generateNaturalLanguageResponse({
      question,
      dataSources: relevantSources,
      retrievedInformation,
      includeCodeSnippets: requiresCodeSnippet,
    });
    
    if (!response || !response.answer) {
      throw new Error("AI response generation failed.");
    }

    return {
      aiResponse: response.answer,
      sources: relevantSources,
    };
  } catch (error) {
    console.error(error);
    return {
      aiResponse: "Sorry, I encountered an error while processing your request. Please try again.",
      sources: [],
    };
  }
}
