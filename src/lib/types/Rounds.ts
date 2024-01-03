import { z } from 'zod';
import { MatchSchema } from './Match';

const BracketRoundSchema = z.object({
  winner: z.array(MatchSchema),
  loser: z.array(MatchSchema),
  repechage: z.array(MatchSchema)
});

export const RoundsSchema = z.array(BracketRoundSchema);

export type Rounds = z.infer<typeof BracketRoundSchema>[];
