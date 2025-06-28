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
    try {
      const res = await axiosInstance.get("/auth/check");
      console.log("✅ Authenticated user:", res.data);
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.error("❌ Error in checkAuth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      localStorage.setItem("token", res.data.token); // ✅ store token
      set({ authUser: res.data });
      toast.success("✅ Account created successfully");
      get().connectSocket();
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
      localStorage.setItem("token", res.data.token); // ✅ store token
      set({ authUser: res.data });
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
      localStorage.removeItem("token"); // ✅ clear token
      set({ authUser: null, socket: null, onlineUsers: [] });
      toast.success("✅ Logged out successfully");
      get().disconnectSocket();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Logout failed");
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
      console.log("ℹ️ Socket already connected");
      return;
    }

    const newSocket = io(BASE_URL, {
      query: { userId: authUser._id },
    });

    newSocket.once("connect", () => {
      console.log("✅ Socket connected:", newSocket.id);
    });

    newSocket.off("getOnlineUsers");
    newSocket.on("getOnlineUsers", (userIds) => {
      console.log("👥 Online users:", userIds);
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
