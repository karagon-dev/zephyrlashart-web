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
  clientKey?: number;
  clientFirstName?: string;
  clientLastName?: string;
  clientEmail?: string;
  clientPhoneNumber?: string;
}

export interface ClientInfo {
  clientKey: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

export interface AuthResponse {
  token: string;
  expiresAt: string;
  user: AuthUser;
  client?: ClientInfo;
}