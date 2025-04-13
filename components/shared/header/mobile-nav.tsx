'use client'

import { type LucideIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { headerData } from './header.data'
import { cn } from '@/lib/utils'

export const MobileNav = () => {
	const pathname = usePathname()

	return (
		<nav className='fixed bottom-0 left-0 w-full bg-white dark:bg-black z-10 h-20 md:hidden'>
			<ul className='grid grid-cols-2 items-center h-full  p-4'>
				{headerData.map(
					({ id, href, icon: Icon }: { id: number; href: string; icon: LucideIcon }) => {
						const isActive = href === pathname || pathname.startsWith(`${href}/`)
						return (
							<li
								className='w-full h-full'
								key={id}
							>
								<Link
									className={cn(
										'flex h-full items-center justify-center rounded-lg transition-colors',
										isActive && 'bg-selection dark:bg-neutral-700'
									)}
									href={href}
								>
									<Icon className='w-6 h-6 text-black dark:text-white' />
								</Link>
							</li>
						)
					}
				)}
			</ul>
		</nav>
	)
}
