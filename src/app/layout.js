import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import NavBar from "@/components/NavBar";
import { dark } from "@clerk/themes";
import { SocketProvider } from "./socketContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "DocX",
  description: "create documents effortlessly",
};

export default function RootLayout({ children }) {
  return (
    
    <html lang="en">
      <body className={inter.className}>
        <SocketProvider>
      <ClerkProvider appearance={dark} >
        <NavBar />
        {children}
        <ToastContainer position="bottom-center" theme="dark" />
      </ClerkProvider>
      </SocketProvider>
      </body>
    </html>
    
  );
}
