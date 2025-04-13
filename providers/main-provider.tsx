'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import NextTopLoader from 'nextjs-toploader'
import { useState } from 'react'

import { ThemeProvider } from './theme-provider'

export const MainProvider = ({ children }: { children: React.ReactNode }) => {
	const [queryClient] = useState(() => new QueryClient())
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider
				attribute='class'
				defaultTheme='system'
				enableSystem
				disableTransitionOnChange
			>
				<NextTopLoader
					color='violet'
					height={5}
					showSpinner={false}
				/>
				{children}
			</ThemeProvider>
			{/* </ProviderClerk> */}
		</QueryClientProvider>
	)
}
