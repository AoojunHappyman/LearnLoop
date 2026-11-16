import './globals.css'
import { Navbar, Footer } from '@/components/Shell'
import { ProgressProvider } from '@/lib/progress'
export const metadata = {
  title: 'LearnLoop — Learn. Practice. Level Up.',
  description:
    'Explore university courses, practice programming, and build your skills with LearnLoop.',
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/fonts.css" />
      </head>
      <body>
        <ProgressProvider>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </ProgressProvider>
      </body>
    </html>
  )
}
