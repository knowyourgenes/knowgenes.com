import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Lora } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://knowgenes.com"),
  title: {
    default: "knowgenes.com - genetics, explained from zero",
    template: "%s · knowgenes.com",
  },
  description:
    "The clearest starting point on the internet for understanding your genes. Plain-language answers to the most-asked questions about genes, DNA, inheritance, and genetic testing. No PhD required.",
  openGraph: {
    title: "knowgenes.com - genetics, explained from zero",
    description:
      "Plain-language genetics for the curious and the brand-new. A beginner's FAQ, a searchable glossary, and an honest myth-buster.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${lora.variable} ${jetBrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">{children}</body>
    </html>
  );
}
