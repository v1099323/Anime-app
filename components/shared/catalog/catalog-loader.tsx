import { Skeleton } from '@/components/ui/skeleton'

export const CatalogLoader = () => {
	return (
		<>
			{Array.from({ length: 4 }).map((_, index) => (
				<div
					className='grid grid-cols-[0.5fr_1fr] gap-4 '
					key={index}
				>
					<Skeleton className='aspect-[9/16]' />
					<div className='flex justify-start items-start flex-col gap-4'>
						<Skeleton className='w-full h-14' />
						<Skeleton className='w-full h-8' />
						<Skeleton className='w-full h-20' />
						<Skeleton className='w-full h-8' />
					</div>
				</div>
			))}
		</>
	)
}
