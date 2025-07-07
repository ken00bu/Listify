import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";

const InterFont = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const InstrumentFont = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrumentSerif",
  weight: "400",
  display: "swap",
})

export const metadata = {
  title: "Listify",
  description: "Generate a modern UI with many option to show your Spotify",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${InterFont.variable} ${InstrumentFont.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
