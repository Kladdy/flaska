import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { Toaster } from 'react-hot-toast';
import { classNames } from '@/utils/tools';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'flaska',
  description: 'Håll koll på dina flaskor',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <UserProvider>
      <html lang="sv">
        <body className={classNames(inter.className)}>
          <Toaster
           position="bottom-center"
           reverseOrder={false}
          />
          {children}
        </body>
      </html>
    </UserProvider>
  )
}
