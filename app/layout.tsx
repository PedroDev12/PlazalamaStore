import type { Metadata } from "next";
import { Outfit } from 'next/font/google'
import "./globals.css";
import Providers from "./providers";

const outfit = Outfit({subsets: ['latin']})

export const metadata: Metadata = {
  title: "ElectroLama store",
  description: "Electrolama es una tienda de productos electrónicos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${outfit.className} bg-gray-200`}
      >
       <Providers>{children}</Providers>
      </body>
    </html>
  );
}
