import Footer from './components/Footer'
import Navbar from './components/Navbar'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'TextGrabr',
  description: 'Extract text from images seamlessly.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"></meta>
      </head>
      <body className={inter.className}>
      <Navbar/>
        {children}
        </body>
      {/* <Footer /> */}
    </html>
  )
}
