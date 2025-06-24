import { Inter } from "next/font/google";
import "./globals.css";

const InterFont = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata = {
  title: "Listify",
  description: "Generate a modern UI with many option to show your Spotify",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${InterFont.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
