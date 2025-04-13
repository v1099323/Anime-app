'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'

export const ButtonTheme = () => {
	const { theme, setTheme } = useTheme()

	return (
		<Button
			className='max-sm:w-full max-sm:text-xl max-sm:py-6'
			onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
		>
			{theme === 'light' ? <Sun /> : <Moon />}
		</Button>
	)
}
