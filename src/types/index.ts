export interface ApiResponse<T> {
  status?: string;
  message?: string;
  data: T;
  meta?: Record<string, any>;
  links?: Record<string, any>;
}

export interface MetaPage {
  currentPage: number;
  totalPages: number;
}

// Upload
export interface UploadResponse {
  status: string;
  message: string;
  data: {
    secure_url: string;
  };
}

// Auth
export interface AuthData {
  accessToken: string;
  user: User;
}

export type AuthRegisterData = Record<string, never>;

export interface PayloadRegister {
  email: string;
  username: string;
  password: string;
}

export interface PayloadLogin {
  email: string;
  password: string;
}

export interface AuthResponse {
  message?: string;
  status?: string;
  data: {
    accessToken: string;
    user: User;
  };
}

export interface User {
  id: number;
  role_id: number;
  email: string;
  username: string;
  isActive: boolean;
  //   resetToken: null;
  //   resetTokenExpires: null;
}

export interface PayloadResetPassword {
  token: string;
  newPassword: string;
}
export interface PayloadForgotPassword {
  email: string;
}

// dashboard
export interface DashboardSummary {
  cctv_total: number;
  cctv_online: number;
  cctv_offline: number;
  flood_detection: number;
  alert: number;
}

// cctv
export interface CCTV {
  id: number;
  name: string;
  status: "online" | "offline";
  latitude: string;
  longitude: string;
  location_id: number;
  location_name: string;
  stream_url: string;
  category: string;
}

export interface CCTVPayload {
  name: string;
  status?: "online" | "offline";
  latitude?: string;
  longitude?: string;
  location_name?: string;
  stream_url?: string;
  category?: string;
}

// location
export interface Location {
  id: number;
  name: string;
  latitude: string;
  longitude: string;
  capacity_building: number;
  zone_type: string;
  description: string;
}

// occupancy
export interface OccupancyCurrent {
  cctv_id: number;
  totalIn: number;
  totalOut: number;
  currentOccupancy: number;
  buildingCapacity: number;
  occupancyPercentage: number;
  occupancyRate: number;
  occupancyTrend: string;
  isNearCapacity: boolean;
  isOverCapacity: boolean;
  occupancyStatus: string;
}

export interface OccupancyZones {
  id: number;
  zone: string;
  current: number;
  capacity: number;
  utilization: number;
  status: string;
  peak: number;
  peak_time: string;
  last_update: string;
}

export interface OccupancyChart {
  label: string;
  start?: string;
  end?: string;
  count_in: number;
  count_out: number;
  net: number;
}

// Alert
export interface Alert {
  id: number;
  is_read: boolean;
  level: string;
  message: string;
  reference_id: number;
  title: string;
  type: string;
  created_at: Date;
}

// Flood
export interface FloodSpot {
  id: number;
  latitude: string;
  longitude: string;
  severity: string;
  depth: number;
  source: string;
  description: string;
  location_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface FloodSpotPayload {
  latitude: string
  longitude: string
  location_id?: number
  severity?: string
  depth?: number
  source?: string
  description?: string
}

export interface FloodReport {
  id: number;
  latitude: string;
  longitude: string;
  reporter_name: string;
  reporter_phone: string;
  description: string;
  photo_url: string;
  status: string;
  source: string;
  location_id: number;
  created_at: Date;
}

export interface FloodReportPayload {
  latitude: string;
  longitude: string;
  location_id?: number;
  reporter_name?: string;
  reporter_phone?: string;
  description?: string;
  photo_url?: string;
  source?: string;
}

// Sensor
export interface Sensor {
  id: number;
  location_id: number;
  key: string;
  name: string;
  unit: string;
  threshold_low: number;
  threshold_high: number;
  is_active: boolean;
  latitude: string;
  longitude: string;
  created_at: Date;
  updated_at: Date;
}

export interface SensorPayload {
  name: string;
  key: string;
  latitude?: string;
  longitude?: string;
  unit?: string;
  threshold_low?: number;
  threshold_high?: number;
  location_id?: number;
  is_active?: boolean;
}
