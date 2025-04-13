import { Footer } from '@/components/shared/footer'
import { Header } from '@/components/shared/header/header'
import { MobileNav } from '@/components/shared/header/mobile-nav'

const LayoutMain = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className='mx-auto max-w-7xl px-[0.9375rem] flex min-h-screen flex-col'>
			<Header />
			<main className='flex-1 pt-20 md:pt-28'>
				{children}
				<MobileNav />
			</main>
			<Footer />
		</div>
	)
}

export default LayoutMain
