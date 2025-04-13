'use client'

import { Input } from '@/components/ui/input'

import { cn } from '@/lib/utils'

export const SearchEpisodes = ({
	className,
	onSearchChange
}: {
	className?: string
	onSearchChange: (value: string) => void
}) => {
	return (
		<div className={cn('', className)}>
			<Input
				className='placeholder:text-black/50 dark:placeholder:text-white/30'
				placeholder='Поиск серий'
				autoComplete='true'
				onChange={e => onSearchChange(e.target.value)}
			/>
		</div>
	)
}
