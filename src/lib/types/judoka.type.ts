import { z } from 'zod';

export const JudokaSchema = z.object({
  club: z.string().optional(),
  id: z.string(),
  name: z.string(),
});

export type Judoka = z.infer<typeof JudokaSchema>;
