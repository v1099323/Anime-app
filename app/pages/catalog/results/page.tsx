'use client'

import { useInfiniteQuery } from '@tanstack/react-query'
import axios from 'axios'
import { AnimatePresence, motion } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import { Suspense, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

import CatalogItem from '@/components/shared/catalog/catalog-item'
import { CatalogLoader } from '@/components/shared/catalog/catalog-loader'
import { Filters } from '@/components/shared/filters/filters'

const ITEMS_PER_PAGE = 12

export default function ResultsPage() {
	return (
		<Suspense fallback={<div>Загрузка...</div>}>
			<ResultsPageContent />
		</Suspense>
	)
}

function ResultsPageContent() {
	const searchParams = useSearchParams()
	const searchQuery = searchParams.get('search')
	const year = searchParams.get('year')
	const genres = searchParams.get('genres')
	const voice = searchParams.get('voice')
	const sort = searchParams.get('sort')

	const { ref, inView } = useInView({
		threshold: 0.5
	})

	// Fetch paginated data using useInfiniteQuery
	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
		queryKey: ['search-titles', searchQuery, year, genres, voice, sort],
		queryFn: async ({ pageParam = 1 }) => {
			const params = {
				search: searchQuery,
				year,
				genres,
				voice,
				filter: 'id,code,names,team,genres,posters,type,description',
				limit: ITEMS_PER_PAGE,
				order_by: sort,
				items_per_page: pageParam
			}

			const response = await axios.get('https://api.anilibria.tv/v3/title/search', { params })
			const titles = response.data.list

			return {
				titles,
				nextPage: titles.length < ITEMS_PER_PAGE ? null : pageParam + 1
			}
		},
		enabled: !!searchQuery,
		initialPageParam: 1,
		getNextPageParam: lastPage => lastPage.nextPage
	})

	// Combine all pages into one array of results
	const allTitles = data?.pages.flatMap(page => page.titles) ?? []

	// Trigger fetch when reaching the bottom of the page
	useEffect(() => {
		if (inView && hasNextPage) {
			fetchNextPage()
		}
	}, [inView, hasNextPage, fetchNextPage])

	return (
		<div>
			<div className='flex max-sm:flex-col gap-4 justify-between pt-12'>
				<h1 className='text-xl md:text-3xl'>
					Результаты поиска: {searchQuery} {allTitles.length > 0 && `найдено: ${allTitles.length}`}
				</h1>
				<Filters />
			</div>

			{isLoading ? (
				<div className='pt-7 md:pt-12 grid grid-cols-[repeat(auto-fill,minmax(18.125rem,1fr))] md:grid-cols-[repeat(auto-fill,minmax(21.875rem,1fr))]  lg:grid-cols-[repeat(auto-fill,minmax(28.125rem,1fr))] gap-5'>
					<CatalogLoader />
				</div>
			) : allTitles.length > 0 ? (
				<div className='pt-7 md:pt-12 grid grid-cols-[repeat(auto-fill,minmax(18.125rem,1fr))] md:grid-cols-[repeat(auto-fill,minmax(21.875rem,1fr))]  lg:grid-cols-[repeat(auto-fill,minmax(28.125rem,1fr))] gap-5'>
					<AnimatePresence>
						{allTitles.map((item, index) => (
							<motion.div
								key={`${item.id}-${index}`}
								initial={{ opacity: 0, scale: 0.9 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.7 }}
								transition={{ duration: 0.15 }}
							>
								<CatalogItem item={item} />
							</motion.div>
						))}
					</AnimatePresence>
				</div>
			) : (
				<div>Нет данных для отображения</div>
			)}

			{/* Load more when in view */}
			<div
				ref={ref}
				className='pt-7 md:pt-12'
			>
				{isFetchingNextPage && (
					<div className='pt-7 md:pt-12 grid grid-cols-[repeat(auto-fill,minmax(18.125rem,1fr))] md:grid-cols-[repeat(auto-fill,minmax(21.875rem,1fr))]  lg:grid-cols-[repeat(auto-fill,minmax(28.125rem,1fr))] gap-5'>
						<CatalogLoader />
					</div>
				)}
			</div>
		</div>
	)
}
