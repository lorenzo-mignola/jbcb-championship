import { z } from 'zod';

import { JudokaSchema } from './judoka.type';
import { MatchSchema } from './match.type';
import { RoundsSchema } from './rounds.type';

const CategoryTypeSchema = z.enum(['pool', 'double_pool', 'brackets']);

export const CategoryBaseSchema = z.object({
  athletes: z.array(JudokaSchema),
  currentMatch: z.string().or(z.null()),
  duration: z.coerce.number(),
  id: z.string(),
  matches: z.array(MatchSchema),
  name: z.string(),
  tournament: z.string().default(''),
  type: CategoryTypeSchema,
});

// eslint-disable-next-line unused-imports/no-unused-vars
const PoolCategorySchema = CategoryBaseSchema.extend({
  type: z.literal(CategoryTypeSchema.enum.pool),
});

export type PoolCategory = z.infer<typeof PoolCategorySchema>;

// eslint-disable-next-line unused-imports/no-unused-vars
const BracketsCategorySchema = CategoryBaseSchema.extend({
  rounds: RoundsSchema,
  type: z.literal(CategoryTypeSchema.enum.brackets),
});

export type BracketsCategory = z.infer<typeof BracketsCategorySchema>;

// eslint-disable-next-line unused-imports/no-unused-vars
const DoublePoolCategorySchema = CategoryBaseSchema.extend({
  finalMatch: MatchSchema,
  pools: z.object({
    A: z.array(MatchSchema),
    aAthletes: z.array(JudokaSchema),
    B: z.array(MatchSchema),
    bAthletes: z.array(JudokaSchema),
  }),
  semifinals: z.tuple([MatchSchema, MatchSchema]),
  type: z.literal(CategoryTypeSchema.enum.double_pool),
});

export type DoublePoolCategory = z.infer<typeof DoublePoolCategorySchema>;

export type Category = PoolCategory | BracketsCategory | DoublePoolCategory;

export interface RankingAthlete {
  evaluationPoint?: number;
  id?: string;
  matchPoint?: number;
  rank: number;
}
