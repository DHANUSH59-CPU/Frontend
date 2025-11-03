import { io, Socket } from "socket.io-client";

const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000";

export const createSocketConnection = (): Socket => {
  // For production, you might need to adjust this based on your deployment
  if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
    return io(BASE_URL, {
      withCredentials: true,
      transports: ["websocket", "polling"],
    });
  } else {
    // Production configuration
    return io(BASE_URL, {
      withCredentials: true,
      transports: ["websocket", "polling"],
    });
  }
};

