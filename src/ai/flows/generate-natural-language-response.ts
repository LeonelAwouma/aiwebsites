'use server';

/**
 * @fileOverview A flow to generate natural language responses by synthesizing information from different data sources.
 *
 * - generateNaturalLanguageResponse - A function that generates a natural language response from input data.
 * - GenerateNaturalLanguageResponseInput - The input type for the generateNaturalLanguageResponse function.
 * - GenerateNaturalLanguageResponseOutput - The return type for the generateNaturalLanguageResponse function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateNaturalLanguageResponseInputSchema = z.object({
  question: z.string().describe('The user question.'),
  dataSources: z.array(z.string()).describe('The data sources used to retrieve information.'),
  retrievedInformation: z.string().describe('The information retrieved from the data sources.'),
  includeCodeSnippets: z.boolean().optional().default(false).describe('Whether to include code snippets in the output.'),
});
export type GenerateNaturalLanguageResponseInput = z.infer<typeof GenerateNaturalLanguageResponseInputSchema>;

const GenerateNaturalLanguageResponseOutputSchema = z.object({
  answer: z.string().describe('The natural language answer to the question.'),
});
export type GenerateNaturalLanguageResponseOutput = z.infer<typeof GenerateNaturalLanguageResponseOutputSchema>;

export async function generateNaturalLanguageResponse(input: GenerateNaturalLanguageResponseInput): Promise<GenerateNaturalLanguageResponseOutput> {
  return generateNaturalLanguageResponseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateNaturalLanguageResponsePrompt',
  input: {schema: GenerateNaturalLanguageResponseInputSchema},
  output: {schema: GenerateNaturalLanguageResponseOutputSchema},
  prompt: `You are an AI assistant that generates clear and concise answers in natural language by synthesizing information retrieved from different data sources.

  Question: {{{question}}}
  Data Sources: {{{dataSources}}}
  Retrieved Information: {{{retrievedInformation}}}

  Based on the provided information, generate a natural language answer to the question.
`,
});

const generateNaturalLanguageResponseFlow = ai.defineFlow(
  {
    name: 'generateNaturalLanguageResponseFlow',
    inputSchema: GenerateNaturalLanguageResponseInputSchema,
    outputSchema: GenerateNaturalLanguageResponseOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      return { answer: "I'm sorry, I could not generate a response." };
    }
    return output;
  }
);
