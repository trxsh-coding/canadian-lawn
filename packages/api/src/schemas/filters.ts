import { z } from 'zod';

export const filterValueSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const checkboxFilterSchema = z.object({
  field: z.string(),
  type: z.literal('checkbox'),
  title: z.string(),
  values: z.array(filterValueSchema),
});

export const rangeFilterSchema = z.object({
  field: z.string(),
  type: z.literal('range'),
  title: z.string(),
  min: z.number(),
  max: z.number(),
});

export const filterItemSchema = z.discriminatedUnion('type', [
  checkboxFilterSchema,
  rangeFilterSchema,
]);

export const filtersSchema = z.array(filterItemSchema);

export type FilterValue = z.infer<typeof filterValueSchema>;

export type CheckboxFilter = z.infer<typeof checkboxFilterSchema>;

export type RangeFilter = z.infer<typeof rangeFilterSchema>;

export type FilterItem = z.infer<typeof filterItemSchema>;

export type Filters = FilterItem[];

/** @deprecated Use FilterValue */
export type Filter = FilterValue;
