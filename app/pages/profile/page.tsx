'use client'

import { SignOutButton, useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { Button } from '@/components/ui/button'

const ProfilePage = () => {
	const router = useRouter()
	const { user, isLoaded } = useUser()

	useEffect(() => {
		if (isLoaded && !user) {
			router.replace('/sign-in')
		}
	}, [user, isLoaded, router])

	if (!isLoaded || !user) return null

	return (
		<div className='flex flex-col justify-start items-start gap-4 pt-12'>
			<p>Привет, {user.firstName}!</p>
			<SignOutButton>
				<Button>Выйти</Button>
			</SignOutButton>
		</div>
	)
}

export default ProfilePage
