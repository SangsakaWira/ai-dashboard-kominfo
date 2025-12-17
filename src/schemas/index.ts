import { z } from "zod"

export const cctvSchema = z.object({
  name: z.string().min(1, "Name wajib diisi"),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
  is_active: z.boolean().default(true),
//   status: z.enum(["online", "offline"]).optional(),
  status: z.enum(["normal", "warning", "danger"]).optional(),
  category: z.string().optional(),
  stream_url: z.string().optional(),
  location_name: z.string().optional(),
  resolution: z.string().optional(),   
  description: z.string().optional(), 
})

export const reportSchema = z.object({
  latitude: z.string().min(1, "Latitude wajib diisi"),
  longitude: z.string().min(1, "Longtitude wajib diisi"),
  location_id: z.number().nullable().optional(),
  reporter_name: z.string().optional(),
  reporter_phone: z.string().optional(),
  description: z.string().optional(),
  photo_url: z.string().optional(),
  source: z.string().optional(),
  status: z.enum(["pending", "verified", "rejected", "resolved"]).optional(),
  depth: z.number().optional(),
});

export const spotSchema = z.object({
  name: z.string().min(1, "Nama spot wajib diisi"),
  latitude: z.string().min(1, "Latitude wajib diisi"),
  longitude: z.string().min(1, "Longtitude wajib diisi"),
  location_id: z.number().nullable().optional(),
  severity: z.string().optional().nullable(),
  depth: z.number().optional(),
  description: z.string().optional(),
  source: z.string().optional(),
});

export const locationSchema = z.object({
  name: z.string().min(1, "Name wajib diisi"),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
  capacity_building: z.number().optional(),
  description: z.string().optional(),
  zone_type: z.string().optional(),
});

export const sensorSchema = z.object({
  name: z.string().min(1, "Nama sensor wajib diisi"),
  key: z.string().min(1, "Key wajib diisi"),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
  unit: z.string().optional(),
  codenumber: z.string().optional(),
  external_url: z.string().optional(),
  image_url: z.string().optional(),
  threshold_low: z.number().optional(),
  threshold_high: z.number().optional(),
  // threshold_low: z.number().nullable().optional(),
  // threshold_high: z.number().nullable().optional(),
  location_id: z.number().nullable().optional(),

  is_active: z.boolean().optional(),
});

export type SensorSchemaPayload = z.infer<typeof sensorSchema>;

export type ReportPayload = z.infer<typeof reportSchema>;
export type SpotPayload = z.infer<typeof spotSchema>;
export type CctvPayload = z.infer<typeof cctvSchema>
export type LocationPayload = z.infer<typeof locationSchema>
