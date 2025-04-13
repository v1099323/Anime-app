'use client'

import Link from 'next/link'

import { Button } from '@/components/ui/button'

const NotFound = () => {
	return (
		<div className='flex flex-col items-center justify-center h-svh'>
			<div className='text-3xl flex text-center flex-col gap-4 mb-4'>
				<span className='text-9xl'>404</span> not found
			</div>
			<Button asChild>
				<Link href='/'>Домой</Link>
			</Button>
		</div>
	)
}

export default NotFound
