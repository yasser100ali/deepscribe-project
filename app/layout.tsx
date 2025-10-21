import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { Toaster } from "sonner";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/navbar";

export const metadata = {
  title: "DeepScribe Healthcare Assistant - Project by Yasser Ali",
  description:
    "An intelligent healthcare AI assistant for medical documentation and patient data insights. Built with FastAPI, Next.js, and OpenAI GPT-4.",
  openGraph: {
    images: [
      {
        url: "/og?title=DeepScribe Healthcare Assistant",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      {
        url: "/og?title=DeepScribe Healthcare Assistant",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head></head>
      <body className={cn(GeistSans.className, "antialiased dark")}>
        <Toaster position="top-center" richColors />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
