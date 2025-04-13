import { Metadata } from 'next'
import { Noto_Sans } from 'next/font/google'

import { MainProvider } from '@/providers/main-provider'

import './globals.css'
import { homeSEO } from '@/SEO/home.seo'
import { cn } from '@/lib/utils'

const notoSans = Noto_Sans({
	variable: '--font-noto-sans',
	subsets: ['latin', 'cyrillic', 'cyrillic-ext'],
	display: 'swap',
	preload: true
})

export const metadata: Metadata = {
	title: homeSEO.title,
	description: homeSEO.description,
	keywords: homeSEO.keywords,
	openGraph: homeSEO.openGraph,
	metadataBase: new URL('https://example.com')
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html
			lang='ru'
			suppressHydrationWarning
		>
			<body className={cn('antialiased', notoSans.className)}>
				<MainProvider>{children}</MainProvider>
			</body>
		</html>
	)
}
