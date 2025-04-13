'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import NextTopLoader from 'nextjs-toploader'

import { ProviderClerk } from './clerk-provider'
import { ThemeProvider } from './theme-provider'

const queryClient = new QueryClient()

export const MainProvider = ({ children }: { children: React.ReactNode }) => {
	return (
		<QueryClientProvider client={queryClient}>
			<ProviderClerk>
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
			</ProviderClerk>
		</QueryClientProvider>
	)
}
