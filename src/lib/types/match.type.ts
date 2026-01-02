import { z } from 'zod';

import { JudokaSchema } from './judoka.type';

const JudokaTypeSchema = z.enum(['white', 'blue']);

export type JudokaType = z.infer<typeof JudokaTypeSchema>;

export const MatchJudokaSchema = JudokaSchema.extend({
  ippon: z.number(),
  shido: z.number(),
  wazari: z.number(),
}).or(z.null());

export type MatchJudoka = z.infer<typeof MatchJudokaSchema>;

export const MatchSchema = z.object({
  blue: MatchJudokaSchema.optional(),
  finalTime: z.number().or(z.null()),
  goldenScore: z.boolean().or(z.null()),
  id: z.string(),
  isRepechage: z.boolean().optional(),
  white: MatchJudokaSchema.optional(),
  winner: JudokaTypeSchema.optional(),
});

export type Match = z.infer<typeof MatchSchema>;

export type MatchWithWinner = Match & { winner: JudokaType };
