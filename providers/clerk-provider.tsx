import { ClerkProvider } from '@clerk/nextjs'

export const ProviderClerk = ({ children }: { children: React.ReactNode }) => {
	return <ClerkProvider>{children}</ClerkProvider>
}
