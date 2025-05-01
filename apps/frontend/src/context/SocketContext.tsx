"use client";

import { createContext, ReactNode, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

interface ISocketContext {
  socketToDo: Socket | null;
  isConnected: boolean;
}

const SocketContext = createContext({} as ISocketContext);

const SocketProvider = ({ children }: { children: ReactNode }) => {
  const socketTodoRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    const socketToDo = io("http://localhost:3030/todosocket", {
      transports: ["websocket"],
      withCredentials: true,
    });

    socketTodoRef.current = socketToDo;

    socketToDo.on("connect", () => {
      setIsConnected(true);
    });
    socketToDo.on("disconnect", () => {
      setIsConnected(false);
    });

    return () => {
      socketToDo.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider
      value={{
        socketToDo: socketTodoRef.current,
        isConnected,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { SocketContext, SocketProvider };
