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
import { AuthContext } from "./AuthContext";

interface ISocketContext {
  socketKanban: Socket | null;
  isConnected: boolean;
}

const SocketContext = createContext({} as ISocketContext);

const SocketProvider = ({ children }: { children: ReactNode }) => {
  const socketKanbanRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const { user } = useContext(AuthContext);

  const pathname = usePathname();

  useEffect(() => {
    if (!pathname.includes("/kanbanlist/")) {
      socketKanbanRef.current?.emit("exitKanbans");
    }
  }, [pathname]);

  useEffect(() => {
    const socketKanban = io(`${process.env.NEXT_PUBLIC_API_URL}/kanbansocket`, {
      transports: ["websocket"],
      withCredentials: true,
    });

    socketKanbanRef.current = socketKanban;

    return () => {
      socketKanban.disconnect();
    };
  }, [user]);

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
