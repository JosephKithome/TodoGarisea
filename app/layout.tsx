import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import NavBar from '../components/NavBar';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TodoHGarisea',
  description: 'Plan your day beforehand',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // <html lang="en">
    //   <body className={inter.className}>{children}</body>
    // </html>

    <html lang="en">
      <body>
        <div className="main">
          <div className="gradient" id="gradient" />

          <main className="app">
            <NavBar />
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
