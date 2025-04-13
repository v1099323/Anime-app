'use client'

import * as SliderPrimitive from '@radix-ui/react-slider'
import * as React from 'react'

import { cn } from '@/lib/utils'

const Slider = React.forwardRef<
	React.ElementRef<typeof SliderPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
	<SliderPrimitive.Root
		ref={ref}
		className={cn('relative flex w-full touch-none select-none items-center', className)}
		{...props}
	>
		<SliderPrimitive.Track className='relative h-[0.3125rem] w-full grow overflow-hidden rounded-full bg-purple-400/30 cursor-pointer'>
			<SliderPrimitive.Range className='absolute h-full bg-purple-400' />
		</SliderPrimitive.Track>
		<SliderPrimitive.Thumb className='block cursor-pointer transition-colors border-transparent h-4 w-4 rounded-full bg-purple-400 hover:border-white border-[0.125rem] bg-background shadow  focus-visible:outline-none focus-visible:border-white disabled:pointer-events-none disabled:opacity-50' />
	</SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
