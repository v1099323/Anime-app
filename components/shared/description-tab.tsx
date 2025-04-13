import React from 'react'

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger
} from '@/components/ui/accordion'

import { cn } from '@/lib/utils'

export const DescriptionTab = ({
	className,
	title,
	content
}: {
	title: string
	content: string
	className?: string
}) => {
	return (
		<Accordion
			className={cn('', className)}
			type='single'
			collapsible
		>
			<AccordionItem
				className='bg-neutral-900/50 rounded-lg border-none px-[0.9375rem] '
				value='item-1'
			>
				<AccordionTrigger>
					<strong className='text-xl'>{title}</strong>
				</AccordionTrigger>
				<AccordionContent>
					<p className='text-xl'>{content}</p>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	)
}
