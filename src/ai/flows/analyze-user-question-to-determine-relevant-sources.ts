'use server';

/**
 * @fileOverview Analyzes a user's question to determine the relevant data sources.
 *
 * - analyzeUserQuestion - A function that analyzes the user question.
 * - AnalyzeUserQuestionInput - The input type for the analyzeUserQuestion function.
 * - AnalyzeUserQuestionOutput - The return type for the analyzeUserQuestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeUserQuestionInputSchema = z.object({
  question: z.string().describe('The user question to analyze.'),
});
export type AnalyzeUserQuestionInput = z.infer<typeof AnalyzeUserQuestionInputSchema>;

const AnalyzeUserQuestionOutputSchema = z.object({
  relevantSources: z
    .array(z.string())
    .describe('The list of relevant data sources (websites, databases) for the question.'),
  requiresCodeSnippet: z.boolean().describe('Whether the answer requires a code snippet.'),
});
export type AnalyzeUserQuestionOutput = z.infer<typeof AnalyzeUserQuestionOutputSchema>;

export async function analyzeUserQuestion(input: AnalyzeUserQuestionInput): Promise<AnalyzeUserQuestionOutput> {
  return analyzeUserQuestionFlow(input);
}

const decideWhetherToIncludeCodeSnippet = ai.defineTool({
  name: 'decideWhetherToIncludeCodeSnippet',
  description: 'Determines whether a code snippet is relevant to answering the user question.',
  inputSchema: z.object({
    question: z.string().describe('The user question.'),
  }),
  outputSchema: z.boolean().describe('Whether a code snippet is needed (true) or not (false).'),
},
async (input) => {
  // Basic logic, refine as needed
  const lowerCaseQuestion = input.question.toLowerCase();
    return lowerCaseQuestion.includes('code') || lowerCaseQuestion.includes('script') || lowerCaseQuestion.includes('sql');
});


const analyzeUserQuestionPrompt = ai.definePrompt({
  name: 'analyzeUserQuestionPrompt',
  input: {schema: AnalyzeUserQuestionInputSchema},
  output: {schema: AnalyzeUserQuestionOutputSchema},
  tools: [decideWhetherToIncludeCodeSnippet],
  prompt: `You are an AI assistant that analyzes user questions to determine the relevant data sources for answering the question.

  Analyze the following question and determine which data sources would be most helpful in providing an accurate and contextual answer.
  Return a list of relevant data sources (websites, databases).

  Question: {{{question}}}
  
  Consider if the user question could benefit from the inclusion of a code snippet.
  Use the decideWhetherToIncludeCodeSnippet tool.
  `,
});

const analyzeUserQuestionFlow = ai.defineFlow(
  {
    name: 'analyzeUserQuestionFlow',
    inputSchema: AnalyzeUserQuestionInputSchema,
    outputSchema: AnalyzeUserQuestionOutputSchema,
  },
  async input => {
    const {output} = await analyzeUserQuestionPrompt(input);

    if (!output) {
      throw new Error('No output from analyzeUserQuestionPrompt');
    }
    
    const requiresCodeSnippetResult = await decideWhetherToIncludeCodeSnippet({
      question: input.question,
    });

    return {
      ...output,
      requiresCodeSnippet: requiresCodeSnippetResult,
    };
  }
);
