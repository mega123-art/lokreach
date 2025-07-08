import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Error parsing stored user:", error);
      localStorage.removeItem("user");
      return null;
    }
  });

  const [isLoading, setIsLoading] = useState(false);

  // Configure axios defaults
  useEffect(() => {
    // Set default timeout
    axios.defaults.timeout = 15000;

    // Add request interceptor for debugging
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        console.log("Making request to:", config.url);
        console.log("Request config:", {
          method: config.method,
          url: config.url,
          headers: config.headers,
          data: config.data,
        });
        return config;
      },
      (error) => {
        console.error("Request interceptor error:", error);
        return Promise.reject(error);
      }
    );

    // Add response interceptor for debugging
    const responseInterceptor = axios.interceptors.response.use(
      (response) => {
        console.log("Response received:", {
          status: response.status,
          data: response.data,
          url: response.config.url,
        });
        return response;
      },
      (error) => {
        console.error("Response interceptor error:", {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
          url: error.config?.url,
        });
        return Promise.reject(error);
      }
    );

    // Cleanup interceptors
    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  
  const login = async (email, password) => {
    setIsLoading(true);
    try {
      console.log("=== LOGIN ATTEMPT ===");
      console.log("API URL:", import.meta.env.VITE_API_URL);
      console.log("Email:", email);

      const apiUrl = `${import.meta.env.VITE_API_URL}/auth/signin`;
      console.log("Full URL:", apiUrl);

      const requestData = { email, password };
      console.log("Request data:", { email, password: "[HIDDEN]" });

      const { data } = await axios.post(apiUrl, requestData, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        timeout: 15000,
        withCredentials: false, // Set to false for CORS simplicity
      });

      console.log("Login successful:", data);

      if (!data.user || !data.token) {
        throw new Error("Invalid response format from server");
      }

      setUser(data.user);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      return data;
    } catch (error) {
      console.error("=== LOGIN ERROR ===");
      console.error("Error object:", error);
      console.error("Error message:", error.message);
      console.error("Error response:", error.response);
      console.error("Error request:", error.request);

      // Clear any stale data
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);

      // Provide detailed error messages
      if (error.code === "ECONNABORTED") {
        throw new Error(
          "Request timeout - please check your connection and try again"
        );
      } else if (error.code === "ERR_NETWORK") {
        throw new Error("Network error - unable to connect to server");
      } else if (error.response?.status === 404) {
        throw new Error("User not found - please check your email");
      } else if (error.response?.status === 401) {
        throw new Error("Invalid password - please try again");
      } else if (error.response?.status === 400) {
        throw new Error(
          error.response.data?.error ||
            "Invalid request - please check your input"
        );
      } else if (error.response?.data?.error) {
        throw new Error(error.response.data.error);
      } else if (error.request) {
        throw new Error(
          "Unable to connect to server - please check your internet connection"
        );
      } else {
        throw new Error("Login failed - please try again");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    console.log("Logging out user");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  // Check if token is valid on app load
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser && !user) {
      try {
        const parsedUser = JSON.parse(storedUser);
        console.log("Restoring user session:", parsedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing stored user on load:", error);
        logout();
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
