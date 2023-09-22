'use client'
import './globals.css'
import type { Metadata } from 'next'
import { Roboto_Slab, Roboto_Mono } from 'next/font/google'
import 'material-icons/iconfont/material-icons.css'
import { magic } from './_lib/magic-client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Loading from './_components/loading/loading'

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
  const [isLoading, setIsLoading] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const router = useRouter()
  useEffect(() => {
    const isLoggedInCheck = async () => {
      const isLoggedInResult = await magic?.user.isLoggedIn()
      setIsLoggedIn(isLoggedInResult ? isLoggedInResult : false)
    }

    isLoggedInCheck()
    if (isLoggedIn) {
      router.push('/')
      setIsLoading(false)
    } else {
      router.push('/login')
      setIsLoading(false)
    }
  }, [isLoggedIn, router])

  return (
    <html lang="en">
      {isLoading ? (
        <body>
          <Loading />
        </body>
      ) : (
        <body className={roboto_slab.className}>
          <div id="__next">{children}</div>
        </body>
      )}
    </html>
  )
}
