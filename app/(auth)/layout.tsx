'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Header } from '@/components/shared/header/header'

const AuthLayout = ({
	children
}: Readonly<{
	children: React.ReactNode
}>) => {
	const pathname = usePathname()

	const isLogin = pathname === '/sign-in'

	return (
		<div className='min-h-screen flex flex-col justify-center items-center pt-24 md:pt-[8.125rem]'>
			<Header />
			<div className='max-w-3xl w-full flex flex-col gap-4 bg-selection md:rounded-lg p-4 md:mx-[0.9375rem] text-center'>
				<div className='bg-neutral-50/25 p-4 rounded-lg'>
					<h1 className='text-3xl font-bold'>AniHaven</h1>
					<div className='text-xl'>{isLogin ? 'Вход в профиль' : 'Регистрация'}</div>
				</div>

				<div className='md:grid gap-4 grid-cols-2 w-full rounded-lg '>
					<div className='w-full h-full'>{children}</div>
					<div className='md:block hidden w-full h-full'>
						{isLogin ? (
							<Image
								className='w-full h-full rounded-lg'
								width={500}
								height={500}
								src='/auth/login.png'
								alt='Вход в профиль'
							/>
						) : (
							<Image
								className='w-full h-full rounded-lg object-cover'
								width={500}
								height={500}
								src='/auth/register.png'
								alt='Регистрация'
							/>
						)}
					</div>
				</div>

				<div className='flex justify-center gap-4 items-center bg-neutral-50/25 p-4 rounded-lg'>
					{isLogin ? (
						<>
							Нет аккаунта?
							<Link
								className='text-blue-500 hover:underline bg-white rounded-lg px-2 py-1'
								href={'/sign-up'}
							>
								Регистрация
							</Link>
						</>
					) : (
						<>
							Есть аккаунт?{' '}
							<Link
								className='text-blue-500 hover:underline bg-white rounded-lg px-2 py-1'
								href={'/sign-in'}
							>
								{' '}
								Вход
							</Link>
						</>
					)}
				</div>
			</div>
		</div>
	)
}

export default AuthLayout
