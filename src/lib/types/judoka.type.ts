import { z } from 'zod';

export const JudokaSchema = z.object({
  id: z.string(),
  name: z.string(),
  club: z.string().optional()
});

export type Judoka = z.infer<typeof JudokaSchema>;
