import { z } from 'zod';

import { MatchSchema } from './match.type';

const BracketRoundSchema = z.object({
  loser: z.array(MatchSchema),
  repechage: z.array(MatchSchema),
  winner: z.array(MatchSchema),
});

export const RoundsSchema = z.array(BracketRoundSchema);

export type BracketRound = z.infer<typeof BracketRoundSchema>;
export type Rounds = BracketRound[];
