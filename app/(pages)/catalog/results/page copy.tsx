'use client'

import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'

import CatalogItem from '@/components/shared/catalog/catalog-item'
import { CatalogLoader } from '@/components/shared/catalog/catalog-loader'
import { Filters } from '@/components/shared/filters/filters'

export default function ResultsPage() {
	return (
		<Suspense fallback={<div>Загрузка...</div>}>
			<ResultsPageContent />
		</Suspense>
	)
}

function ResultsPageContent() {
	const searchParams = useSearchParams()
	const [loading, setLoading] = useState(false)
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [titles, setTitles] = useState<any[]>([])

	const searchQuery = searchParams.get('search') || ''
	const year = searchParams.get('year') || ''
	const genres = searchParams.get('genres') || ''
	const voice = searchParams.get('voice') || ''
	const sort = searchParams.get('sort') || ''

	useEffect(() => {
		const fetchTitles = async () => {
			setLoading(true)
			const params = {
				search: searchQuery,
				year,
				genres,
				voice,
				filter: 'id,code,names,team,genres,posters,type,description',
				limit: 100,
				order_by: sort,
				sort_direction: sort === 'popular' ? 1 : 0
			}

			try {
				const response = await axios.get('https://api.anilibria.tv/v3/title/search', { params })
				setTitles(response.data.list)
			} catch (error) {
				console.error('Ошибка при загрузке данных:', error)
			} finally {
				setLoading(false)
			}
		}

		fetchTitles()
	}, [searchQuery, year, genres, voice, sort])

	return (
		<div>
			<div className='flex max-sm:flex-col gap-4 justify-between pt-12'>
				<h1 className='text-xl md:text-3xl'>
					Результаты поиска: {searchQuery} {titles.length > 0 && `найдено: ${titles.length}`}
				</h1>
				<Filters />
			</div>
			{loading ? (
				<div className='pt-7 md:pt-12 grid grid-cols-[repeat(auto-fill,minmax(18.125rem,1fr))] md:grid-cols-[repeat(auto-fill,minmax(21.875rem,1fr))]  lg:grid-cols-[repeat(auto-fill,minmax(28.125rem,1fr))] gap-5'>
					<CatalogLoader />
				</div>
			) : titles.length > 0 ? (
				<div className='pt-7 md:pt-12 grid grid-cols-[repeat(auto-fill,minmax(18.125rem,1fr))] md:grid-cols-[repeat(auto-fill,minmax(21.875rem,1fr))]  lg:grid-cols-[repeat(auto-fill,minmax(28.125rem,1fr))] gap-5'>
					{titles.map(title => (
						<CatalogItem
							key={title.id}
							item={title}
						/>
					))}
				</div>
			) : (
				<div>Нет данных для отображения</div>
			)}
		</div>
	)
}
