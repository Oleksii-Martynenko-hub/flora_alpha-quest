import { Suspense } from 'react'
import { Space_Grotesk } from 'next/font/google'

import Loading from './loading'

import './globals.css'
import styles from './layout.module.scss'

const space_grotesk = Space_Grotesk({ subsets: ['latin'] })

export const metadata = {
  title: 'Alpha Quest',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={space_grotesk.className}>
        <main className={styles.layout}>
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </main>
      </body>
    </html>
  )
}
