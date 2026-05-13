import { clientApi } from "./clientApi";
import type {
  AuthResponse,
  ChangePasswordRequest,
  LoginRequest,
  RegisterRequest,
} from "../types/auth";

export function login(request: LoginRequest): Promise<AuthResponse> {
  return clientApi<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(request),
  });
}

export function register(request: RegisterRequest): Promise<AuthResponse> {
  return clientApi<AuthResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify(request),
  });
}

export function changePassword(request: ChangePasswordRequest): Promise<void> {
  return clientApi<void>("/auth/change-password", {
    method: "POST",
    body: JSON.stringify(request),
  });
}
