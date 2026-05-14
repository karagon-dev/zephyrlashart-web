import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { AuthResponse, AuthUser, LoginRequest } from "../types/auth";
import { login as loginRequest } from "../services/authApi";

interface AuthContextValue {
  token: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  login: (request: LoginRequest) => Promise<AuthUser>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const TOKEN_KEY = "authToken";
const USER_KEY = "authUser";
const LAST_ACTIVITY_KEY = "lastActivity";
const SESSION_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const timeoutIdRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetSessionTimeout = () => {
    if (!token) return;

    localStorage.setItem(LAST_ACTIVITY_KEY, Date.now().toString());

    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }

    timeoutIdRef.current = setTimeout(() => {
      const lastActivity = parseInt(
        localStorage.getItem(LAST_ACTIVITY_KEY) || "0",
        10
      );
      const timeSinceLastActivity = Date.now() - lastActivity;

      if (timeSinceLastActivity >= SESSION_TIMEOUT_MS) {
        logoutInternal();
      }
    }, SESSION_TIMEOUT_MS);
  };

  const logoutInternal = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(LAST_ACTIVITY_KEY);

    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = null;
    }

    setToken(null);
    setUser(null);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_KEY);
    const storedUser = localStorage.getItem(USER_KEY);

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser) as AuthUser);
      resetSessionTimeout();
    }

    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (!token) return;

    const handleActivity = () => {
      resetSessionTimeout();
    };

    // Track user activity
    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keypress", handleActivity);
    window.addEventListener("click", handleActivity);
    window.addEventListener("scroll", handleActivity);

    return () => {
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keypress", handleActivity);
      window.removeEventListener("click", handleActivity);
      window.removeEventListener("scroll", handleActivity);
    };
  }, [token]);

  const login = async (request: LoginRequest): Promise<AuthUser> => {
    const response: AuthResponse = await loginRequest(request);

    // Merge client info into user object for easier access
    const userWithClient: AuthUser = {
      ...response.user,
      ...(response.client && {
        clientKey: response.client.clientKey,
        clientFirstName: response.client.firstName,
        clientLastName: response.client.lastName,
        clientEmail: response.client.email,
        clientPhoneNumber: response.client.phoneNumber,
      }),
    };

    localStorage.setItem(TOKEN_KEY, response.token);
    localStorage.setItem(USER_KEY, JSON.stringify(userWithClient));

    setToken(response.token);
    setUser(userWithClient);

    resetSessionTimeout();

    return userWithClient;
  };

  const logout = () => {
    logoutInternal();
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated: Boolean(token),
        isInitialized,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider.");
  }

  return context;
}