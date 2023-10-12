'use client'
import './globals.css'
import type { Metadata } from 'next'
import { Roboto_Slab, Roboto_Mono } from 'next/font/google'
import 'material-icons/iconfont/material-icons.css'

const roboto_slab = Roboto_Slab({
  subsets: ['latin'],
  variable: '--font-roboto-slab',
  weight: '800',
})
const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
})

export const metadata: Metadata = {
  title: 'discover videos',
  description: 'allow to discover favorite videos',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
    <html lang="en">
      <head>
        <title>discover videos</title>
      </head>
      <body className={roboto_slab.className}>
          <div id="__next">{children}</div>
        </body>
    </html>
  )

}
