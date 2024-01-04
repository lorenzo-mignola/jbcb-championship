import { JudokaSchema } from './Judoka';
import { MatchSchema } from './Match';

import { z } from 'zod';
import { RoundsSchema } from './Rounds';

const CategoryTypeSchema = z.enum(['pool', 'double_pool', 'brackets']);

export const CategoryBaseSchema = z.object({
  _id: z.string(),
  name: z.string(),
  athletes: z.array(JudokaSchema),
  matches: z.array(MatchSchema),
  currentMatch: z.string().optional(),
  duration: z.coerce.number(),
  type: CategoryTypeSchema
});

const PoolCategorySchema = CategoryBaseSchema.extend({
  type: z.literal(CategoryTypeSchema.enum.pool)
});

export type PoolCategory = z.infer<typeof PoolCategorySchema>;

const BracketsCategorySchema = CategoryBaseSchema.extend({
  type: z.literal(CategoryTypeSchema.enum.brackets),
  rounds: RoundsSchema
});

export type BracketsCategory = z.infer<typeof BracketsCategorySchema>;

const DoublePoolCategorySchema = CategoryBaseSchema.extend({
  type: z.literal(CategoryTypeSchema.enum.double_pool),
  pools: z.object({
    A: z.array(MatchSchema),
    B: z.array(MatchSchema),
    aAthletes: z.array(JudokaSchema),
    bAthletes: z.array(JudokaSchema)
  }),
  semifinals: z.tuple([MatchSchema, MatchSchema]),
  finalMatch: MatchSchema
});

export type DoublePoolCategory = z.infer<typeof DoublePoolCategorySchema>;

export type Category = PoolCategory | BracketsCategory | DoublePoolCategory;
