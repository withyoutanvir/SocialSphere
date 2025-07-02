import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:5001";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    const token = localStorage.getItem("token");

    if (!token || token === "undefined") {
      console.warn("🔑 No valid token found. Skipping auth check.");
      set({ authUser: null, isCheckingAuth: false });
      return;
    }

    try {
      const res = await axiosInstance.get("/auth/check");
   

      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.error("❌ Error in checkAuth:", error);
      localStorage.removeItem("token"); // 🧹 Clear invalid token
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

signup: async (data, navigate) => {
  set({ isSigningUp: true });
  try {
    const res = await axiosInstance.post("/auth/signup", data);
    const { token } = res.data;

    if (token && token !== "undefined") {
      toast.success("✅ Account created successfully");
      navigate("/login"); // ✅ redirect to login
    } else {
      throw new Error("No valid token received");
    }
  } catch (error) {
    toast.error(error?.response?.data?.message || "Signup failed");
  } finally {
    set({ isSigningUp: false });
  }
},

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      console.log("🟢 Login response:", res.data);

      const { token, ...userData } = res.data;

      if (token && token !== "undefined") {
        localStorage.setItem("token", token);
        // console.log("💾 Token saved:", token);
      } else {
        console.error("❌ No valid token returned on login.");
        throw new Error("No valid token received");
      }

      set({ authUser: userData });
      toast.success("✅ Logged in successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Logout failed");
    } finally {
      localStorage.removeItem("token");
      set({ authUser: null, socket: null, onlineUsers: [] });
      get().disconnectSocket();
      toast.success("✅ Logged out successfully");
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("✅ Profile updated");
    } catch (error) {
      console.error("❌ Update failed:", error);
      toast.error(error?.response?.data?.message || "Update failed");
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    const { authUser, socket } = get();

    if (!authUser?._id) {
      console.warn("❌ Cannot connect socket: authUser or _id is missing", authUser);
      return;
    }

    if (socket?.connected) {
      // console.log("ℹ️ Socket already connected");
      return;
    }

    const newSocket = io(BASE_URL, {
      query: { userId: authUser._id },
    });

    newSocket.once("connect", () => {
      // console.log("✅ Socket connected:", newSocket.id);
    });

    newSocket.off("getOnlineUsers");
    newSocket.on("getOnlineUsers", (userIds) => {
      // console.log("👥 Online users:", userIds);
      set({ onlineUsers: userIds });
    });

    set({ socket: newSocket });
  },

  disconnectSocket: () => {
    const { socket } = get();
    if (socket?.connected) {
      socket.disconnect();
      set({ socket: null });
    }
  },
}));
