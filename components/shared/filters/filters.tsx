'use client'

import { DialogClose } from '@radix-ui/react-dialog'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'nextjs-toploader/app'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { DialogFooter } from '@/components/ui/dialog'

import { DialogFilters } from './dialog-filters'
import { FilterSelect } from './filter-select'

const sorts = [
	{ value: '', label: 'По новизне' },
	{ value: 'popular', label: 'По популярности' }
]

export const Filters = () => {
	const searchParams = useSearchParams()
	const router = useRouter()

	// Загрузка жанров
	const {
		data: genres,
		isLoading: isLoadingGenres,
		isError: isGenresError
	} = useQuery({
		queryKey: ['genres'],
		queryFn: async () => {
			const response = await axios.get('https://api.anilibria.tv/v3/genres')
			return response.data
		}
	})

	// Загрузка периодов (лет)
	const {
		data: periods,
		isLoading: isLoadingPeriods,
		isError: isPeriodsError
	} = useQuery({
		queryKey: ['years'],
		queryFn: async () => {
			const response = await axios.get('https://api.anilibria.tv/v3/years')
			// Преобразуем массив чисел в массив объектов для react-select
			return response.data.map((year: number) => ({
				value: year.toString(), // value должно быть строкой
				label: year.toString() // label тоже строка
			}))
		}
	})

	// Состояния для выбранных фильтров
	const [selectedGenres, setSelectedGenres] = useState<string[]>([])
	const [selectedSort, setSelectedSort] = useState('')
	const [selectedPeriods, setSelectedPeriods] = useState<string[]>([])

	// Инициализация состояний из URL при монтировании компонента
	useEffect(() => {
		if (searchParams) {
			setSelectedGenres(searchParams.get('genres') ? searchParams.get('genres')!.split(',') : [])
			setSelectedSort(searchParams.get('sort') || '')
			setSelectedPeriods(searchParams.get('year') ? searchParams.get('year')!.split(',') : [])
		}
	}, [searchParams])

	// Функции выбора
	const handleGenreChange = (genre: string) => {
		setSelectedGenres(prev =>
			prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]
		)
	}

	const handleSortChange = (sort: string) => setSelectedSort(sort)

	const handlePeriodChange = (selectedOptions: { value: string; label: string }[] | null) => {
		const periods = selectedOptions ? selectedOptions.map(opt => opt.value) : []
		setSelectedPeriods(periods)
	}

	// Применение фильтров и переход на страницу результатов
	const applyFilters = () => {
		const params = new URLSearchParams()

		if (selectedPeriods.length) params.set('year', selectedPeriods.join(','))
		if (selectedGenres.length) params.set('genres', selectedGenres.join(','))
		if (selectedSort) params.set('sort', selectedSort)

		// Переход на страницу результатов
		router.push(`/catalog/results?${params.toString()}`)
	}

	return (
		<DialogFilters>
			<div className='grid gap-4'>
				{/* Сортировка */}
				<div>
					<h4 className='text-xl mb-2'>Сортировка:</h4>
					<div className='flex items-center flex-wrap gap-2'>
						{sorts.map((sort, index) => (
							<Button
								key={`${sort.value}-${index}`}
								variant={selectedSort === sort.value ? 'default' : 'outline'}
								onClick={() => handleSortChange(sort.value)}
							>
								{sort.label}
							</Button>
						))}
					</div>
				</div>

				{/* Период */}
				<div>
					<h4 className='text-xl mb-2'>Период:</h4>
					{isLoadingPeriods ? (
						<div>Загрузка...</div>
					) : isPeriodsError ? (
						<div>Ошибка при загрузке периодов</div>
					) : (
						<FilterSelect
							periods={periods}
							handlePeriodChange={handlePeriodChange}
							selectedPeriods={selectedPeriods}
							isLoadingPeriods={isLoadingPeriods}
						/>
					)}
				</div>

				{/* Жанры */}
				<div>
					<h4 className='text-xl mb-2'>Жанры:</h4>
					<div className='flex items-center flex-wrap gap-2 overflow-scroll max-h-[18.75rem]'>
						{isLoadingGenres ? (
							<div>Загрузка...</div>
						) : isGenresError ? (
							<div>Ошибка при загрузке жанров</div>
						) : (
							genres?.map((genre: string, index: number) => (
								<Button
									key={`${genre}-${index}`}
									variant={selectedGenres.includes(genre) ? 'default' : 'outline'}
									onClick={() => handleGenreChange(genre)}
								>
									{genre}
								</Button>
							))
						)}
					</div>
				</div>

				{/* Кнопка "Применить" */}
				<div>
					<DialogFooter>
						<DialogClose asChild>
							<Button
								className='w-full'
								onClick={applyFilters}
							>
								Применить
							</Button>
						</DialogClose>
					</DialogFooter>
				</div>
			</div>
		</DialogFilters>
	)
}
