import { z } from 'zod';
import { JudokaSchema } from './Judoka';

const JudokaTypeSchema = z.enum(['white', 'blue']);

export type JudokaType = z.infer<typeof JudokaTypeSchema>;

export const MatchJudokaSchema = JudokaSchema.extend({
  wazari: z.number(),
  ippon: z.number(),
  shido: z.number()
});

export type MatchJudoka = z.infer<typeof MatchJudokaSchema>;

export const MatchSchema = z.object({
  id: z.string(),
  white: MatchJudokaSchema.optional(),
  blue: MatchJudokaSchema.optional(),
  winner: JudokaTypeSchema.optional(),
  finalTime: z.number().or(z.null()),
  goldenScore: z.boolean().or(z.null())
});

export type Match = z.infer<typeof MatchSchema>;
