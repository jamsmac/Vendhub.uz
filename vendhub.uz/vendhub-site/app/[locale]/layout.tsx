import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans } from 'next/font/google'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { setRequestLocale, getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { ToastProvider } from '@/components/ui/Toast'
import { ModalProvider } from '@/lib/modal-context'
import ModalRoot from '@/components/modals/ModalRoot'
import '../globals.css'

const playfair = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-display',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-body',
  display: 'swap',
})

const BASE_URL = 'https://vendhub.uz'

export const metadata: Metadata = {
  title: 'VendHub — Кофе из автоматов в пару кликов',
  description:
    '25+ видов напитков. 16 автоматов в больницах, университетах и общественных местах Ташкента. Программа лояльности и скидки.',
  keywords: [
    'VendHub',
    'кофе',
    'вендинг',
    'Ташкент',
    'автомат',
    'кофейный автомат',
  ],
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: BASE_URL,
    languages: {
      ru: BASE_URL,
      uz: `${BASE_URL}/uz`,
    },
  },
  openGraph: {
    title: 'VendHub — Кофе из автоматов в пару кликов',
    description: '25+ видов напитков. 16 автоматов в Ташкенте.',
    url: BASE_URL,
    siteName: 'VendHub',
    locale: 'ru_RU',
    alternateLocale: ['uz_UZ'],
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: 'VendHub — Кофе из автоматов в Ташкенте',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VendHub — Кофе из автоматов в пару кликов',
    description: '25+ видов напитков. 16 автоматов в Ташкенте.',
    images: [`${BASE_URL}/opengraph-image`],
  },
}

// Static JSON-LD structured data — safe to inline (not user input)
const jsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'VendHub',
  description: 'Сеть вендинговых автоматов в Ташкенте — кофе, чай, снеки',
  url: BASE_URL,
  logo: `${BASE_URL}/images/brand/hub-logo.png`,
  telephone: '+998712003999',
  email: 'info@vendhub.uz',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Ташкент',
    addressCountry: 'UZ',
  },
  areaServed: 'Ташкент',
  sameAs: [
    'https://t.me/vendhub_support',
    'https://instagram.com/vendhub.uz',
    'https://youtube.com/@vendhub',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    reviewCount: '10000',
    bestRating: '5',
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '06:00',
    closes: '23:00',
  },
})

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)

  const messages = await getMessages()

  return (
    <html lang={locale} className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="font-body bg-cream text-chocolate antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
        <NextIntlClientProvider messages={messages}>
          <ToastProvider>
            <ModalProvider>
              {children}
              <ModalRoot />
            </ModalProvider>
          </ToastProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
