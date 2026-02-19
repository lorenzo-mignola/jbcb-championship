import { z } from 'zod';

import { JudokaSchema } from './judoka.type';

const JudokaTypeSchema = z.enum(['white', 'blue']);

export type JudokaType = z.infer<typeof JudokaTypeSchema>;

const PointsSchema = z.object({
  ippon: z.number(),
  wazari: z.number(),
  yuko: z.number(),
});

const PointsAndShidoSchema = z.object({
  ...PointsSchema.shape,
  shido: z.number(),
});

export type Points = z.infer<typeof PointsSchema>;

export const MatchJudokaSchema = z.object({
  ...JudokaSchema.shape,
  ...PointsAndShidoSchema.shape,
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
