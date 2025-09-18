import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata = {
  title: "Adham Magdy",
  description: "Created with v0",
  generator: "v0.dev",
  icons: {
    icon: "/favicon-v2.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${GeistSans.className} ${GeistMono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
