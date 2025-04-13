import Link from 'next/link'

import { Button } from '@/components/ui/button'

import { headerData } from './header.data'

export const Navigation = () => {
	return (
		<nav className='max-md:hidden'>
			<ul className='flex flex-wrap items-center gap-4'>
				{headerData.map(item => (
					<li key={item.id}>
						<Button asChild>
							<Link href={item.href}>{item.title}</Link>
						</Button>
					</li>
				))}
			</ul>
		</nav>
	)
}
