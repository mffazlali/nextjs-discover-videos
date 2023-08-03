import './globals.css'
import type { Metadata } from 'next'
import { Roboto_Slab } from 'next/font/google'

const roboto_Slab = Roboto_Slab({ subsets: ['latin'],variable:'--font-roboto-slab' })

export const metadata: Metadata = {
  title: "discover videos",
  description: "allow to discover favorite videos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={roboto_Slab.className}>{children}</body>
    </html>
  )
}
