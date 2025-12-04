"use client";

import { usePathname } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";

interface ISocketContext {
  socketKanban: Socket | null;
  isConnected: boolean;
}

const SocketContext = createContext({} as ISocketContext);

const SocketProvider = ({ children }: { children: ReactNode }) => {
  const socketKanbanRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const pathname = usePathname();

  useEffect(() => {
    if (!pathname.includes("/kanbanlist/")) {
      socketKanbanRef.current?.emit("exitKanbans");
    }
  }, [pathname]);

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");

    if (!token) {
      console.warn("Token not found");
      return;
    }

    const socketKanban = io(`${process.env.NEXT_PUBLIC_API_URL}/kanbansocket`, {
      transports: ["websocket"],
      auth: { token: `Bearer ${token}` },
    });

    socketKanbanRef.current = socketKanban;

    socketKanban.on("connect", () => {
      setIsConnected(true);
      console.log("Connected");
    });
    socketKanban.on("disconnect", () => {
      setIsConnected(false);
      console.log("Disconnected");
    });
    socketKanban.on("connect_error", (error) => {
      setIsConnected(false);
      console.log("Error connecting", error.message);
    });

    return () => {
      socketKanban.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider
      value={{
        socketKanban: socketKanbanRef.current,
        isConnected,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { SocketContext, SocketProvider };
