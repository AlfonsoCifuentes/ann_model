import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '../contexts/LanguageContext'
import { AuthProvider } from '../contexts/AuthContext'
import { NotificationProvider } from '../components/ui/NotificationSystem'

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

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
}

export const metadata = {
  title: 'Ana Nicoleta - Professional Model & Actress',
  description: 'Professional portfolio of Ana Nicoleta - International model and actress specializing in editorial, runway, commercial, and acting work.',
  keywords: 'Ana Nicoleta, model, actress, portfolio, editorial, fashion, runway, commercial',
  authors: [{ name: 'Ana Nicoleta' }],
  creator: 'Ana Nicoleta',
  publisher: 'Ana Nicoleta',
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' }
    ],
    apple: [
      { url: '/icons/icon-152x152.png', sizes: '152x152', type: 'image/png' }
    ],
    shortcut: '/favicon.svg',
  },
  appleWebApp: {
    capable: true,
    title: 'Ana Nicoleta',
    statusBarStyle: 'black-translucent',
  },
  formatDetection: {
    telephone: false,
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
      <body className="bg-fashion-bg text-fashion-fg font-inter antialiased" suppressHydrationWarning={true}>
        <LanguageProvider>
          <AuthProvider>
            <NotificationProvider>
              <div className="min-h-screen bg-fashion-bg">
                {children}
              </div>
            </NotificationProvider>
          </AuthProvider>
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
