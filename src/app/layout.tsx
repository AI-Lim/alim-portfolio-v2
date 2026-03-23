import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Alim Bachabi — The CreaBuilder',
  description: 'Étudiant IA, fondateur SMARTB & BAYO, danseur, créateur de contenu. Cotonou, Bénin.',
  keywords: ['IA', 'Bénin', 'SMARTB', 'BAYO', 'CreaBuilder', 'multipotentiel'],
  authors: [{ name: 'Abdel Alim Bachabi' }],
  openGraph: {
    title: 'Alim Bachabi — The CreaBuilder',
    description: 'Un cerveau africain qui déborde.',
    url: 'https://portfolio-alimbachabi.vercel.app',
    siteName: 'Alim Bachabi',
    locale: 'fr_FR',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500;600&family=Caveat:wght@500;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}