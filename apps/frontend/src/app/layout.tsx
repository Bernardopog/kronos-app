import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Header, Navbar } from "@/layout/MainLayout/";
import Modal from "@/components/Modal/Modal";
import { NavbarProvider } from "@/context/NavbarContext";
import { ToDoProvider } from "@/context/ToDoContext";
import { ToDoCategoryProvider } from "@/context/ToDoCategoryContext";
import { ModalProvider } from "@/context/ModalContext";
import { DeviceScreenProvider } from "@/context/DeviceScreenContext";
import { NoteProvider } from "@/context/NoteContext";
import { KanbanProvider } from "@/context/KanbanContext";
import { AuthProvider } from "@/context/AuthContext";
import { SocketProvider } from "@/context/SocketContext";
import { cookies } from "next/headers";

const roboto = Roboto({
  weight: ["400", "500", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kronos",
  description: "A time tracking app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const themeIsDark = (await cookies()).get("theme")?.value === "dark";

  return (
    <html lang="pt-BR" className={`${themeIsDark ? "dark" : ""}`}>
      <AuthProvider>
        <SocketProvider>
          <DeviceScreenProvider>
            <NavbarProvider>
              <ToDoProvider>
                <ToDoCategoryProvider>
                  <NoteProvider>
                    <KanbanProvider>
                      <ModalProvider>
                        <body
                          className={`grid min-h-dvh main-layout duration-300 ease-in-out overflow-hidden ${roboto.className}`}
                        >
                          <Modal />
                          <Header themeIsDark={themeIsDark}/>
                          <Navbar themeIsDark={themeIsDark}/>
                          {children}
                        </body>
                      </ModalProvider>
                    </KanbanProvider>
                  </NoteProvider>
                </ToDoCategoryProvider>
              </ToDoProvider>
            </NavbarProvider>
          </DeviceScreenProvider>
        </SocketProvider>
      </AuthProvider>
    </html>
  );
}
