import { z } from "zod"

export const cctvSchema = z.object({
  name: z.string().min(1, "Name wajib diisi"),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
  status: z.enum(["online", "offline"]).optional(),
  category: z.string().optional(),
  stream_url: z.string().optional(),
  location_name: z.string().optional(),
})

export const reportSchema = z.object({
  latitude: z.string().min(1, "Latitude wajib diisi"),
  longitude: z.string().min(1, "Longtitude wajib diisi"),
  location_id: z.number().optional(),
  reporter_name: z.string().optional(),
  reporter_phone: z.string().optional(),
  description: z.string().optional(),
  photo_url: z.string().optional(),
  source: z.string().optional(),
});

export const spotSchema = z.object({
  latitude: z.string().min(1, "Latitude wajib diisi"),
  longitude: z.string().min(1, "Longtitude wajib diisi"),
  location_id: z.number().optional(),
  severity: z.string().optional(),
  depth: z.number().optional(),
  description: z.string().optional(),
  source: z.string().optional(),
});

export type ReportPayload = z.infer<typeof reportSchema>;
export type SpotPayload = z.infer<typeof spotSchema>;
export type CctvPayload = z.infer<typeof cctvSchema>
