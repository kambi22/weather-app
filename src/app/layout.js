// app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../../component/Navbar";
import Footer from "../../component/Footer";
import ReduxProvider from "./redux/provider";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Weather App",
  description: "Created by satnam singh",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased background-image`}
      >

        <Navbar />
        <ReduxProvider>
          {children}
        </ReduxProvider>
        <Footer />
      </body>
    </html>
  );
}
