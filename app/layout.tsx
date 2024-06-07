import { Nunito } from "next/font/google";

import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import ClinetOnly from "./components/ClientOnly";
import RegisterModel from "./components/models/RegisterModel";
import LoginModel from "./components/models/LoginModel";
import ToasterProvider from "./providers/ToasterProvider";
import getCurrentUser from "./actions/getCurrentUser";

export const metadata = {
  title: "Clonebnb",
  description: "Clone of Airbnb",
};

const font = Nunito({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <ClinetOnly>
          <ToasterProvider />
          <LoginModel />
          <RegisterModel />
          <Navbar currentUser={currentUser} />
        </ClinetOnly>
        {children}
      </body>
    </html>
  );
}
