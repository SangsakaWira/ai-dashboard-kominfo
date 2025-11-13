export interface ApiResponse<T> {
  status?: string;
  message?: string;
  data: T;
  meta?: Record<string, any>;
  links?: Record<string, any>;
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

// cctv
export interface CCTV {
  id: number;
  name: string;
  status: string;
  latitude: string;
  longitude: string;
  stream_url: string;
}