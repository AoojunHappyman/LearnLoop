import '@fontsource-variable/noto-sans-thai'
import './globals.css'
import { Navbar, Footer } from '@/components/Shell'
import { ProgressProvider } from '@/lib/progress'
export const metadata = {
  title: 'LearnLoop — เรียนรู้ ฝึกฝน ก้าวไปอีกขั้น',
  description:
    'สำรวจวิชาเรียนระดับมหาวิทยาลัย ฝึกเขียนโปรแกรม และติดตามพัฒนาการของคุณกับ LearnLoop',
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="th">
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
