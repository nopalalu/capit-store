import { Outfit, Fraunces } from "next/font/google";
import "./globals.css";
import { AppContextProvider } from "@/context/AppContext";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";
import MotionProvider from "@/components/MotionProvider";

const outfit = Outfit({ subsets: ['latin'], weight: ["300", "400", "500", "600", "700"] })
const fraunces = Fraunces({
  subsets: ['latin'],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
})

export const metadata = {
  title: "Capit Store - Sandalimo",
  description: "Sandalimo",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${outfit.className} ${fraunces.variable} antialiased text-neutral-800 bg-white`} >
          <Toaster />
          <MotionProvider>
            <AppContextProvider>
              {children}
            </AppContextProvider>
          </MotionProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
