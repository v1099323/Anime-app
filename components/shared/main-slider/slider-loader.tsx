import { Skeleton } from '@/components/ui/skeleton'

interface ISliderLoader {
	num?: number
}

export const SliderLoader = ({ num = 4 }: ISliderLoader) => {
	return (
		<div className='pt-7 md:pt-12 grid grid-cols-[repeat(auto-fit,minmax(3.125rem,1fr))] gap-[0.9375rem] overflow-hidden min-w-[28.125rem]'>
			{Array.from({ length: num }).map((_, index) => (
				<div
					className=' '
					key={index}
				>
					<Skeleton className='aspect-[9/16]' />
				</div>
			))}
		</div>
	)
}
