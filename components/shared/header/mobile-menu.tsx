'use client'

import { motion as m } from 'framer-motion'
import { Library, MenuIcon, User, XIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'

import { ButtonTheme } from './button-theme'
import { headerData } from './header.data'

export const MobileMenu = () => {
	const [isOpen, setIsOpen] = useState(false)

	const toggleMenu = () => {
		setIsOpen(!isOpen)
	}

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = 'auto'
		}
	}, [isOpen])

	return (
		<div className='flex sm:hidden'>
			<button
				className='relative z-20'
				onClick={toggleMenu}
				type='button'
				title='Меню навигации'
			>
				{isOpen ? <XIcon className='w-8 h-8' /> : <MenuIcon className='w-8 h-8' />}
			</button>
			<m.div
				className='fixed top-0 transition w-full bg-background z-10 overflow-hidden'
				initial={{ left: '-100%' }}
				animate={{ left: isOpen ? 0 : '-100%' }}
				transition={{ duration: 0.15, ease: 'easeInOut' }}
			>
				<div className='px-[0.9375rem] flex flex-col pt-4 pb-8 min-h-svh'>
					<Link
						className='flex items-center self-start w-fit gap-4'
						href='/'
					>
						<Image
							className='rounded-lg'
							src='/logo.webp'
							alt='logo'
							width={50}
							height={50}
						/>
						<p className='text-2xl font-bold'>AniHaven</p>
					</Link>
					<nav className='pt-6'>
						<ul className='flex flex-col gap-6'>
							{headerData.map(item => (
								<li key={item.id}>
									<Button asChild>
										<Link
											className='w-full text-xl py-6'
											href={item.href}
											onClick={toggleMenu}
										>
											{item.title}
										</Link>
									</Button>
								</li>
							))}
						</ul>
					</nav>
					<div className='flex gap-4 pt-6'>
						<Button asChild>
							<Link
								className='py-6 w-full'
								href='/history'
								onClick={toggleMenu}
								title='История'
							>
								История <Library />
							</Link>
						</Button>
						<Button asChild>
							<Link
								className='py-6 w-full'
								href='/profile'
								onClick={toggleMenu}
								title='Профиль'
							>
								Профиль <User />
							</Link>
						</Button>
					</div>
					<div className='pt-6 mt-auto'>
						<ButtonTheme />
					</div>
				</div>
			</m.div>
		</div>
	)
}
