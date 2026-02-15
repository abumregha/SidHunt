'use server';
/**
 * @fileOverview A Genkit flow for generating a concise summary of an article.
 *
 * - generateArticleSummary - A function that handles the article summarization process.
 * - GenerateArticleSummaryInput - The input type for the generateArticleSummary function.
 * - GenerateArticleSummaryOutput - The return type for the generateArticleSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateArticleSummaryInputSchema = z.object({
  articleContent: z.string().describe('The full content of the article to be summarized.'),
});
export type GenerateArticleSummaryInput = z.infer<typeof GenerateArticleSummaryInputSchema>;

const GenerateArticleSummaryOutputSchema = z.object({
  summary: z.string().describe('A concise, 3-line summary of the article content.'),
});
export type GenerateArticleSummaryOutput = z.infer<typeof GenerateArticleSummaryOutputSchema>;

export async function generateArticleSummary(
  input: GenerateArticleSummaryInput
): Promise<GenerateArticleSummaryOutput> {
  return generateArticleSummaryFlow(input);
}

const generateArticleSummaryPrompt = ai.definePrompt({
  name: 'generateArticleSummaryPrompt',
  input: {schema: GenerateArticleSummaryInputSchema},
  output: {schema: GenerateArticleSummaryOutputSchema},
  prompt: `Summarize the following article content into exactly 3 concise lines.

Article Content:
{{{articleContent}}}`,
});

const generateArticleSummaryFlow = ai.defineFlow(
  {
    name: 'generateArticleSummaryFlow',
    inputSchema: GenerateArticleSummaryInputSchema,
    outputSchema: GenerateArticleSummaryOutputSchema,
  },
  async input => {
    const {output} = await generateArticleSummaryPrompt(input);
    if (!output) {
      throw new Error('Failed to generate summary.');
    }
    return output;
  }
);
