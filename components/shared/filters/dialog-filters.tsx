'use client'

import { FilterIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog'

interface IDialogFilters {
	children: React.ReactNode
}

export const DialogFilters = ({ children }: IDialogFilters) => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button type='button'>
					Фильтр <FilterIcon />
				</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-lg'>
				<DialogHeader>
					<DialogTitle>Фильтры</DialogTitle>
					<DialogDescription>Тут вы можете настроить фильтры поиска</DialogDescription>
				</DialogHeader>
				<div className='flex items-center space-x-2'>{children}</div>
			</DialogContent>
		</Dialog>
	)
}
