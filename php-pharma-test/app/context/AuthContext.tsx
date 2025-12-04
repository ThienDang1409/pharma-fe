"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  email: string;
  name: string;
  role: "user" | "admin";
  avatar?: string;
  phone?: string;
  lastLogin?: string;
}

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, phone?: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Load tokens from localStorage on mount
  useEffect(() => {
    const loadTokens = () => {
      try {
        const storedAccessToken = localStorage.getItem("accessToken");
        const storedRefreshToken = localStorage.getItem("refreshToken");
        const storedUser = localStorage.getItem("user");

        if (storedAccessToken && storedUser) {
          setAccessToken(storedAccessToken);
          setRefreshToken(storedRefreshToken);
          setUser(JSON.parse(storedUser));
          
          // Verify token is still valid
          fetchProfile(storedAccessToken);
        }
      } catch (error) {
        console.error("Error loading auth data:", error);
        clearAuthData();
      } finally {
        setIsLoading(false);
      }
    };

    loadTokens();
  }, []);

  // Fetch user profile
  const fetchProfile = async (token: string) => {
    try {
      const response = await fetch(`${API_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.data.user);
        localStorage.setItem("user", JSON.stringify(data.data.user));
      } else {
        // Token expired or invalid
        await tryRefreshToken();
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  // Try to refresh token
  const tryRefreshToken = async () => {
    try {
      const storedRefreshToken = localStorage.getItem("refreshToken");
      if (!storedRefreshToken) {
        clearAuthData();
        return;
      }

      const response = await fetch(`${API_URL}/auth/refresh-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken: storedRefreshToken }),
      });

      if (response.ok) {
        const data = await response.json();
        setAccessToken(data.data.accessToken);
        setRefreshToken(data.data.refreshToken);
        localStorage.setItem("accessToken", data.data.accessToken);
        localStorage.setItem("refreshToken", data.data.refreshToken);
        
        // Fetch profile with new token
        await fetchProfile(data.data.accessToken);
      } else {
        clearAuthData();
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
      clearAuthData();
    }
  };

  // Clear auth data
  const clearAuthData = () => {
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  };

  // Login
  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Save tokens and user
      setAccessToken(data.data.accessToken);
      setRefreshToken(data.data.refreshToken);
      setUser(data.data.user);
      localStorage.setItem("accessToken", data.data.accessToken);
      localStorage.setItem("refreshToken", data.data.refreshToken);
      localStorage.setItem("user", JSON.stringify(data.data.user));

      // Redirect based on role
      if (data.data.user.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } catch (error: any) {
      throw new Error(error.message || "Login failed");
    }
  };

  // Register
  const register = async (email: string, password: string, name: string, phone?: string) => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name, phone }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      // Save tokens and user
      setAccessToken(data.data.accessToken);
      setRefreshToken(data.data.refreshToken);
      setUser(data.data.user);
      localStorage.setItem("accessToken", data.data.accessToken);
      localStorage.setItem("refreshToken", data.data.refreshToken);
      localStorage.setItem("user", JSON.stringify(data.data.user));

      router.push("/");
    } catch (error: any) {
      throw new Error(error.message || "Registration failed");
    }
  };

  // Logout
  const logout = async () => {
    try {
      if (accessToken) {
        await fetch(`${API_URL}/auth/logout`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      clearAuthData();
      router.push("/");
    }
  };

  // Update profile
  const updateProfile = async (data: Partial<User>) => {
    try {
      if (!accessToken) throw new Error("Not authenticated");

      const response = await fetch(`${API_URL}/auth/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Update failed");
      }

      setUser(result.data.user);
      localStorage.setItem("user", JSON.stringify(result.data.user));
    } catch (error: any) {
      throw new Error(error.message || "Update failed");
    }
  };

  // Change password
  const changePassword = async (currentPassword: string, newPassword: string) => {
    try {
      if (!accessToken) throw new Error("Not authenticated");

      const response = await fetch(`${API_URL}/auth/change-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Password change failed");
      }
    } catch (error: any) {
      throw new Error(error.message || "Password change failed");
    }
  };

  const value = {
    user,
    accessToken,
    refreshToken,
    isLoading,
    login,
    register,
    logout,
    updateProfile,
    changePassword,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
