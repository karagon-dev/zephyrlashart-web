export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface AuthUser {
  userAccountKey: number;
  email: string;
  roleName: string;
}

export interface AuthResponse {
  token: string;
  expiresAt: string;
  user: AuthUser;
}