import * as Tooltip from '@radix-ui/react-tooltip'

import { cn } from '@/lib/utils'

interface CustomTooltipProps {
	children: React.ReactNode
	content: string
	className?: string
	boundary?: HTMLElement
	isFullscreen?: boolean
	align?: 'start' | 'end' | 'center'
}

export const CustomTooltip = ({
	children,
	content,
	className,
	boundary,
	isFullscreen,
	align = 'center'
}: CustomTooltipProps) => {
	return (
		<Tooltip.Provider delayDuration={100}>
			<Tooltip.Root>
				<Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
				<Tooltip.Content
					className={cn(
						'bg-black text-white px-2 py-1 rounded shadow-md text-sm',
						className
					)}
					side='top'
					sideOffset={5}
					collisionBoundary={isFullscreen ? undefined : boundary ? [boundary] : undefined}
					avoidCollisions
					align={align}
				>
					{content}
					<Tooltip.Arrow className='fill-black' />
				</Tooltip.Content>
			</Tooltip.Root>
		</Tooltip.Provider>
	)
}
