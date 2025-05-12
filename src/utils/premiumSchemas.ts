import { z } from 'zod';

/** Composite row schema and type */
const compositeRowSchema = z.object({
  id: z.string(),
  tier: z.enum(['EMP', 'EMP_SPOUSE', 'EMP_CHILDREN', 'FAMILY']),
  baseRate: z.number().min(0),
  spouseRate: z.number().min(0).optional(),
  childRate: z.number().min(0).optional(),
  tobaccoRate: z.number().min(0).optional(),
});
export type CompositeRow = z.infer<typeof compositeRowSchema>;

/** Age-banded row schema and type */
const ageBandedRowSchema = z.object({
  id: z.string(),
  age: z.number().int().min(0),
  baseRate: z.number().min(0),
  spouseRate: z.number().min(0).optional(),
  childRate: z.number().min(0).optional(),
  tobaccoRate: z.number().min(0).optional(),
});
export type AgeBandedRow = z.infer<typeof ageBandedRowSchema>;

/** Volume-based row schema and type */
const volumeBasedRowSchema = z.object({
  id: z.string(),
  perUnit: z.number().min(0),
  unitLabel: z.string(),
});
export type VolumeBasedRow = z.infer<typeof volumeBasedRowSchema>;

/** Union type for any premium row */
export type PremiumRow = CompositeRow | AgeBandedRow | VolumeBasedRow;

/** Array schemas for bulk validation */
export const compositeSchema = z.array(compositeRowSchema);
export const ageBandedSchema = z.array(ageBandedRowSchema);
export const volumeBasedSchema = z.array(volumeBasedRowSchema);

/** Generate default composite rows */
export function generateCompositeRows(): CompositeRow[] {
  return [
    { id: 'emp', tier: 'EMP', baseRate: 0 },
    { id: 'emp_spouse', tier: 'EMP_SPOUSE', baseRate: 0 },
    { id: 'emp_children', tier: 'EMP_CHILDREN', baseRate: 0 },
    { id: 'family', tier: 'FAMILY', baseRate: 0 },
  ];
}

/** Generate age-banded rows for ages 0–64 */
export function generateAgeBandedRows(): AgeBandedRow[] {
  const rows: AgeBandedRow[] = [];
  for (let age = 0; age <= 64; age++) {
    rows.push({ id: String(age), age, baseRate: 0 });
  }
  return rows;
} 