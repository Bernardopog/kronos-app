import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/ui/Header/Header";
import Navbar from "@/ui/Navbar/Navbar";
import Modal from "@/ui/Modal/Modal";
import { NavbarProvider } from "@/context/NavbarContext";
import { ToDoProvider } from "@/context/ToDoContext";
import { ToDoCategoryProvider } from "@/context/ToDoCategoryContext";
import { ModalProvider } from "@/context/ModalContext";
import { DeviceScreenProvider } from "@/context/DeviceScreenContext";
import { NoteProvider } from "@/context/NoteContext";
import { KanbanProvider } from "@/context/KanbanContext";

const roboto = Roboto({
  weight: ["400", "500", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kronos",
  description: "A time tracking app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <DeviceScreenProvider>
        <NavbarProvider>
          <ToDoProvider>
            <ToDoCategoryProvider>
              <NoteProvider>
                <KanbanProvider>
                  <ModalProvider>
                    <body
                      className={`grid min-h-screen main-layout duration-300 ease-in-out overflow-hidden ${roboto.className}`}
                    >
                      <Modal />
                      <Header />
                      <Navbar />
                      {children}
                    </body>
                  </ModalProvider>
                </KanbanProvider>
              </NoteProvider>
            </ToDoCategoryProvider>
          </ToDoProvider>
        </NavbarProvider>
      </DeviceScreenProvider>
    </html>
  );
}
