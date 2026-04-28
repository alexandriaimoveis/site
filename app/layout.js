import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Alexandria Imóveis",
  description: "Alexandria Imóveis - Encontre seu lar perfeito conosco. Oferecemos uma ampla variedade de imóveis para venda e aluguel, desde apartamentos modernos até casas aconchegantes. Explore nossas opções e encontre o imóvel dos seus sonhos hoje mesmo!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
