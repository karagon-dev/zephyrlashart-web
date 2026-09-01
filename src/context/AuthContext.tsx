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
const EXPIRES_AT_KEY = "authExpiresAt";
const LEGACY_LAST_ACTIVITY_KEY = "lastActivity";

function parseExpiresAt(raw: string | null): number | null {
  if (!raw) return null;
  const ms = Date.parse(raw);
  return Number.isNaN(ms) ? null : ms;
}

function isExpired(expiresAtMs: number | null): boolean {
  return expiresAtMs == null || Date.now() >= expiresAtMs;
}

function clearStoredSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(EXPIRES_AT_KEY);
  localStorage.removeItem(LEGACY_LAST_ACTIVITY_KEY);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const timeoutIdRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearExpiryTimer = () => {
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = null;
    }
  };

  const logoutInternal = () => {
    clearStoredSession();
    clearExpiryTimer();
    setToken(null);
    setUser(null);
  };

  const scheduleExpiryLogout = (expiresAtMs: number) => {
    clearExpiryTimer();
    const delay = Math.max(0, expiresAtMs - Date.now());
    timeoutIdRef.current = setTimeout(() => {
      logoutInternal();
    }, delay);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_KEY);
    const storedUser = localStorage.getItem(USER_KEY);
    const expiresAtMs = parseExpiresAt(localStorage.getItem(EXPIRES_AT_KEY));

    if (storedToken && storedUser && !isExpired(expiresAtMs)) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser) as AuthUser);
      scheduleExpiryLogout(expiresAtMs as number);
    } else {
      clearStoredSession();
    }

    setIsInitialized(true);

    return () => {
      clearExpiryTimer();
    };
    // Restore session once on mount; timer callbacks use the initial logoutInternal.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!token) return;

    const checkExpiry = () => {
      const expiresAtMs = parseExpiresAt(localStorage.getItem(EXPIRES_AT_KEY));
      if (isExpired(expiresAtMs)) {
        logoutInternal();
      }
    };

    document.addEventListener("visibilitychange", checkExpiry);
    window.addEventListener("focus", checkExpiry);

    return () => {
      document.removeEventListener("visibilitychange", checkExpiry);
      window.removeEventListener("focus", checkExpiry);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const login = async (request: LoginRequest): Promise<AuthUser> => {
    const response: AuthResponse = await loginRequest(request);

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
    localStorage.setItem(EXPIRES_AT_KEY, response.expiresAt);
    localStorage.removeItem(LEGACY_LAST_ACTIVITY_KEY);

    const expiresAtMs = parseExpiresAt(response.expiresAt);
    if (expiresAtMs) {
      scheduleExpiryLogout(expiresAtMs);
    }

    setToken(response.token);
    setUser(userWithClient);

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
