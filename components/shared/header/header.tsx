import { Library, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

import { ButtonTheme } from './button-theme'
import { HeaderClient } from './header-client'
import { HeaderSearch } from './header-search'
import { MobileMenu } from './mobile-menu'
import { Navigation } from './navigation'

export const Header = () => {
	return (
		<header className='fixed z-50 top-0 left-0 w-full flex items-center border-b bg-background transition-all duration-300 h-20 md:h-28'>
			<div className='mx-auto max-w-7xl w-full px-[0.9375rem] flex items-center gap-4'>
				<Link
					className='flex items-center gap-4'
					href='/'
				>
					<Image
						className='rounded-lg'
						src='/logo.webp'
						alt='logo'
						width={50}
						height={50}
					/>
					<p className='text-2xl font-bold max-xl:hidden'>AniHaven</p>
				</Link>
				<Navigation />
				<HeaderClient />
				<HeaderSearch />
				<Button asChild>
					<Link
						className='max-sm:hidden'
						href='/profile'
						title='Профиль'
					>
						<User />
					</Link>
				</Button>
				<Button asChild>
					<Link
						className='max-sm:hidden'
						href='/history'
						title='История просмотров'
					>
						<Library />
					</Link>
				</Button>
				<div className='max-sm:hidden'>
					<ButtonTheme />
				</div>
				<MobileMenu />
			</div>
		</header>
	)
}
