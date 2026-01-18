import { config } from 'dotenv';
config();

import '@/ai/flows/analyze-user-question-to-determine-relevant-sources.ts';
import '@/ai/flows/generate-natural-language-response.ts';