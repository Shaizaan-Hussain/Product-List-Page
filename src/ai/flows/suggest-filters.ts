'use server';

/**
 * @fileOverview AI-powered filter suggestion flow.
 *
 * - suggestFilters - A function that suggests relevant filters based on user browsing patterns and previously filtered parameters.
 * - SuggestFiltersInput - The input type for the suggestFilters function.
 * - SuggestFiltersOutput - The return type for the suggestFilters function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestFiltersInputSchema = z.object({
  browsingHistory: z
    .string()
    .describe(
      'A description of the users recent browsing history, including viewed products and categories.'
    ),
  previousFilters: z
    .string()
    .describe('A description of the filters the user has already applied.'),
});
export type SuggestFiltersInput = z.infer<typeof SuggestFiltersInputSchema>;

const SuggestFiltersOutputSchema = z.object({
  suggestedFilters: z
    .string()
    .describe('A list of suggested filters based on browsing history and previous filters.'),
});
export type SuggestFiltersOutput = z.infer<typeof SuggestFiltersOutputSchema>;

export async function suggestFilters(input: SuggestFiltersInput): Promise<SuggestFiltersOutput> {
  return suggestFiltersFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestFiltersPrompt',
  input: {schema: SuggestFiltersInputSchema},
  output: {schema: SuggestFiltersOutputSchema},
  prompt: `You are an e-commerce expert. Based on the user's browsing history and previously applied filters, suggest additional relevant filters that the user may want to apply to refine their search.

Browsing History: {{{browsingHistory}}}
Previous Filters: {{{previousFilters}}}

Suggested Filters:`,
});

const suggestFiltersFlow = ai.defineFlow(
  {
    name: 'suggestFiltersFlow',
    inputSchema: SuggestFiltersInputSchema,
    outputSchema: SuggestFiltersOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
