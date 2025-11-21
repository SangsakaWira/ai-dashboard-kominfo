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

export type CctvPayload = z.infer<typeof cctvSchema>
