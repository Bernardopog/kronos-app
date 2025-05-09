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
  socketToDo: Socket | null;
  socketKanban: Socket | null;
  socketNote: Socket | null;
  isConnected: boolean;
}

const SocketContext = createContext({} as ISocketContext);

const SocketProvider = ({ children }: { children: ReactNode }) => {
  const socketTodoRef = useRef<Socket | null>(null);
  const socketKanbanRef = useRef<Socket | null>(null);
  const socketNoteRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const { user } = useContext(AuthContext);

  const pathname = usePathname();

  useEffect(() => {
    if (!pathname.includes("/kanbanlist/")) {
      socketKanbanRef.current?.emit("exitKanbans");
    }
  }, [pathname]);

  useEffect(() => {
    const socketToDo = io("http://localhost:3030/todosocket", {
      transports: ["websocket"],
      withCredentials: true,
    });
    const socketKanban = io("http://localhost:3030/kanbansocket", {
      transports: ["websocket"],
      withCredentials: true,
    });
    const socketNote = io("http://localhost:3030/notesocket", {
      transports: ["websocket"],
      withCredentials: true,
    });

    socketTodoRef.current = socketToDo;
    socketKanbanRef.current = socketKanban;
    socketNoteRef.current = socketNote;

    socketToDo.on("connect", () => {
      setIsConnected(true);
    });
    socketToDo.on("disconnect", () => {
      setIsConnected(false);
    });

    return () => {
      socketToDo.disconnect();
      socketKanban.disconnect();
      socketNote.disconnect();
    };
  }, [user]);

  return (
    <SocketContext.Provider
      value={{
        socketToDo: socketTodoRef.current,
        socketKanban: socketKanbanRef.current,
        socketNote: socketNoteRef.current,
        isConnected,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { SocketContext, SocketProvider };
