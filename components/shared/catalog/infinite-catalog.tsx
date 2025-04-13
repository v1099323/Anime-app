'use client'

import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import CatalogItem from './catalog-item'
import { CatalogLoader } from './catalog-loader'
import { GETITEM } from '@/service/get-item'

const InfiniteCatalog = () => {
	const [enabled, setEnabled] = useState(false)

	const { data, fetchNextPage, hasNextPage, isFetching, isError } = useInfiniteQuery({
		queryKey: ['infinite-posts'],
		queryFn: GETITEM.INFINITE_CATALOG,
		initialPageParam: 2,
		enabled: enabled,
		getNextPageParam: lastPage => lastPage.nextPage
	})

	const allPosts = data?.pages.flatMap(page => page.data) || []

	const { ref, inView } = useInView({
		threshold: 0.5
	})

	useEffect(() => {
		if (inView && !enabled) {
			setEnabled(true)
		}
	}, [inView, enabled])

	useEffect(() => {
		if (inView && hasNextPage && enabled) {
			fetchNextPage()
		}
	}, [inView, hasNextPage, fetchNextPage, enabled])

	return (
		<div className='pt-5 grid grid-cols-1 lg:grid-cols-2 gap-4 relative'>
			{allPosts.map((item, index) => {
				const uniqueKey = `${item.id}_${index}`
				return (
					<div key={uniqueKey}>
						<CatalogItem item={item} />
					</div>
				)
			})}
			<div
				className='absolute bottom-0 left-0 h-24 w-full'
				ref={ref}
			></div>
			{isFetching && <CatalogLoader />}
			{isError && <p className='text-center mt-4'>Произошла ошибка при загрузке данных</p>}
		</div>
	)
}

export default InfiniteCatalog
