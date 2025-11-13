import { createData, getData } from "@/hooks/requestHelper";
import { PayloadForgotPassword, PayloadLogin, PayloadRegister, PayloadResetPassword, User } from "@/types";
import type { ApiResponse, AuthData, AuthRegisterData } from "@/types";

export const authService = {
  login: (data: PayloadLogin): Promise<ApiResponse<AuthData>> => createData<AuthData>("/auth/login", data),
  
  register: (data: PayloadRegister): Promise<ApiResponse<AuthRegisterData>> =>
    createData("/auth/register", data),

  getMe: (): Promise<ApiResponse<User>> => getData<User>("/auth/me"),
  
  // resetPassword: (data: PayloadResetPassword): Promise<{ message: string }> =>
  //   createData("/auth/reset-password", data),
  
  forgotPassword: (data: PayloadForgotPassword): Promise<ApiResponse<AuthRegisterData>> =>
    createData("/auth/forgot-password", data),
};