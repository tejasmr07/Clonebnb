import { Nunito } from "next/font/google";

import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import ClinetOnly from "./components/ClientOnly";
import RegisterModel from "./components/models/RegisterModel";
import ToasterProvider from "./providers/ToasterProvider";

export const metadata = {
  title: "Clonebnb",
  description: "Clone of Airbnb",
};

const font = Nunito({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        {/* <ClinetOnly> */}
        <ToasterProvider />
        <RegisterModel />
        <Navbar />
        {/* </ClinetOnly> */}
        {children}
      </body>
    </html>
  );
}
