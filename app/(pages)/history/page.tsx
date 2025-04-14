// 'use client'

import React from 'react'

const page = () => {
  return (
    <div>page</div>
  )
}

export default page

// import { useInfiniteQuery } from '@tanstack/react-query'
// import { AnimatePresence, motion } from 'framer-motion'
// import { useEffect, useState } from 'react'
// import { useInView } from 'react-intersection-observer'

// import CatalogItem from '@/components/shared/catalog/catalog-item'
// import { CatalogLoader } from '@/components/shared/catalog/catalog-loader'

// import { useSaveTitle } from '@/hooks/useSaveTitle'

// import { GETITEM } from '@/service/get-item'

// const ITEMS_PER_PAGE = 12

// const Page = () => {
// 	const [code, setCode] = useState<string | null>(null)
// 	const { removeTitle } = useSaveTitle()
// 	const [isDeleting, setIsDeleting] = useState(false)

// 	const { ref, inView } = useInView({
// 		threshold: 0.5
// 	})

// 	useEffect(() => {
// 		const savedTitles = localStorage.getItem('saved_Titles')
// 		setCode(savedTitles ? JSON.parse(savedTitles).reverse().join(',') : '')
// 		setIsDeleting(true)
// 	}, [])

// 	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
// 		queryKey: ['saved-titles', code],
// 		queryFn: async ({ pageParam = 1 }) => {
// 			const result = await GETITEM.HISTORY(code as string)
// 			const startIndex = (pageParam - 1) * ITEMS_PER_PAGE
// 			const paginatedEpisodes = result.slice(startIndex, startIndex + ITEMS_PER_PAGE)

// 			return {
// 				episodes: paginatedEpisodes,
// 				nextPage: startIndex + ITEMS_PER_PAGE < result.length ? pageParam + 1 : null
// 			}
// 		},
// 		enabled: !!code,
// 		initialPageParam: 1,
// 		getNextPageParam: lastPage => lastPage.nextPage
// 	})

// 	// 👇 Объединяем все страницы в один массив
// 	const localEpisodes = data?.pages.flatMap(page => page.episodes) ?? []

// 	// 👇 Если дошли до конца страницы и есть еще данные, подгружаем
// 	useEffect(() => {
// 		if (inView && hasNextPage) {
// 			fetchNextPage()
// 		}
// 	}, [inView, hasNextPage, fetchNextPage])

// 	const handleDelete = (itemCode: string) => {
// 		const savedTitles = JSON.parse(localStorage.getItem('saved_Titles') || '[]')
// 		const updatedTitles = savedTitles.filter((title: string) => title !== itemCode)
// 		localStorage.setItem('saved_Titles', JSON.stringify(updatedTitles))

// 		removeTitle(itemCode)
// 	}

// 	return (
// 		<div>
// 			<div className='text-2xl md:text-3xl font-bold text-center pt-6 md:pt-12'>
// 				История просмотров
// 			</div>
// 			<div className='pt-7 md:pt-12'>
// 				<div className='pt-7 md:pt-12 grid grid-cols-[repeat(auto-fill,minmax(18.125rem,1fr))] md:grid-cols-[repeat(auto-fill,minmax(21.875rem,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(28.125rem,1fr))] gap-5'>
// 					{localEpisodes.length === 0 && !isLoading && (
// 						<div className='text-center text-xl col-span-2'>Нет сохранённых эпизодов</div>
// 					)}
// 					{isLoading ? (
// 						<CatalogLoader />
// 					) : (
// 						<AnimatePresence>
// 							{localEpisodes.map(item => (
// 								<motion.div
// 									key={item.id}
// 									initial={{ opacity: 0, scale: 0.9 }}
// 									animate={{ opacity: 1, scale: 1 }}
// 									exit={{ opacity: 0, scale: 0.7 }}
// 									transition={{ duration: 0.15 }}
// 									className='relative'
// 								>
// 									<CatalogItem
// 										item={item}
// 										isDeleting={isDeleting}
// 										handleDelete={handleDelete}
// 									/>
// 								</motion.div>
// 							))}
// 						</AnimatePresence>
// 					)}
// 				</div>

// 				{/* 👇 Кнопка или триггер подгрузки */}
// 				<div
// 					ref={ref}
// 					className='pt-7 md:pt-12 grid grid-cols-[repeat(auto-fill,minmax(18.125rem,1fr))] md:grid-cols-[repeat(auto-fill,minmax(21.875rem,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(28.125rem,1fr))] gap-5'
// 				>
// 					{isFetchingNextPage ? <CatalogLoader /> : null}
// 				</div>
// 			</div>
// 		</div>
// 	)
// }

// export default Page
