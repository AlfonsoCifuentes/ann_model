import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '../contexts/LanguageContext'
import { NotificationProvider } from '../components/ui/NotificationSystem'
import CustomCursor from '../components/ui/CustomCursor'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600']
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700']
})

export const metadata = {
  title: 'Ana Nicoleta - Professional Model & Actress',
  description: 'Professional portfolio of Ana Nicoleta - International model and actress specializing in editorial, runway, commercial, and acting work.',
  keywords: 'Ana Nicoleta, model, actress, portfolio, editorial, fashion, runway, commercial',
  authors: [{ name: 'Ana Nicoleta' }],
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'Ana Nicoleta - Professional Model & Actress',
    description: 'Professional portfolio of Ana Nicoleta - International model and actress',
    type: 'website',
    locale: 'es_ES',
    alternateLocale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ana Nicoleta - Professional Model & Actress',
    description: 'Professional portfolio of Ana Nicoleta - International model and actress',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning={true}>
      <body className="bg-white text-gray-900 font-inter antialiased" suppressHydrationWarning={true}>
        <LanguageProvider>
          <NotificationProvider>
            <CustomCursor />
            <div className="min-h-screen">
              {children}
            </div>
          </NotificationProvider>
        </LanguageProvider>
        {process.env.NEXT_PUBLIC_ANALYTICS_DOMAIN && (
          <script
            defer
            data-domain={process.env.NEXT_PUBLIC_ANALYTICS_DOMAIN}
            src="https://plausible.io/js/script.js"
          />
        )}
      </body>
    </html>
  )
}
