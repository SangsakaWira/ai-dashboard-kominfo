import { apiRequest } from "@/apiRequest";

export const register = async (body: {
  email?: string;
  username?: string;
  password?: string;
}) =>
  apiRequest({
    path: `auth/register`,
    auth: false,
    method: "POST",
    bodyRequest: body,
  });

export const login = async (body: { email?: string; password?: string }) =>
  apiRequest({
    path: `auth/login`,
    auth: false,
    method: "POST",
    bodyRequest: body,
  });

export const getMe = async () =>
  apiRequest({
    path: "auth/me",
    method: "GET",
    auth: true,
  });

export const forgotPassword = async (body: { email?: string }) =>
  apiRequest({
    method: "POST",
    path: "auth/forgot-password",
    auth: true,
    bodyRequest: body,
  });

export const resetPassword = async (body: {
  token?: string;
  newPassword?: string;
}) =>
  apiRequest({
    method: "POST",
    path: "auth/reset-password",
    auth: true,
    bodyRequest: body,
  });
