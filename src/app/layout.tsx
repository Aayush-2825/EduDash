import { ThemeProvider } from "@/components/general/theme-provider"
import "./globals.css"
import { SessionProvider } from "next-auth/react"
import { auth } from "@/auth"
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: {
    template: '%s | Prakash Classes',
    default: 'Prakash Classes',
  },
  description: 'The one stop JEE NEET Solution here!',
};



export default async function RootLayout({ children }: {
  children: React.ReactNode}) {
    const session = await auth()
  return (
    <SessionProvider session={session}>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  )
}