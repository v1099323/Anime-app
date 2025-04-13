'use client'

import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'

import { CatalogLoader } from './catalog/catalog-loader'
import { SearchEpisodes } from './catalog/search-episodes'
import { DialogModal } from './player/dialog-modal'
import { cn } from '@/lib/utils'
import { GETITEM } from '@/service/get-item'
import { IEpisode } from '@/types/episode.types'

export default function EpisodesList({ code }: { code: string }) {
	const { data: episodes, isLoading } = useQuery<{
		list: { [key: string]: IEpisode }
		host: string
	}>({
		queryKey: ['episodes', code],
		queryFn: () => GETITEM.ESPISODES(code),
		enabled: !!code
	})

	const [searchQuery, setSearchQuery] = useState('')
	const [selectedEpisode, setSelectedEpisode] = useState<IEpisode | null>(null)
	const [isDialogOpen, setIsDialogOpen] = useState(false)

	const filteredEpisodes = useMemo(() => {
		if (!episodes || !episodes.list) return []
		return Object.values(episodes.list).filter(episode => {
			return (
				episode.episode.toString().includes(searchQuery) ||
				(episode.name && episode.name.toLowerCase().includes(searchQuery.toLowerCase()))
			)
		})
	}, [episodes, searchQuery])

	const handleChangeEpisode = (offset: number) => {
		if (!selectedEpisode) return

		const currentIndex = filteredEpisodes.findIndex(e => e.uuid === selectedEpisode.uuid)
		const newEpisode = filteredEpisodes[currentIndex + offset] || null
		setSelectedEpisode(newEpisode)
	}

	const GetTime = ({ episode }: { episode: IEpisode }) => {
		const [savedTime, setSavedTime] = useState<string | null>(null)

		useEffect(() => {
			const time = localStorage.getItem(`episode_${episode.uuid}_time`)
			setSavedTime(time)
		}, [episode])

		return (
			<>
				{savedTime && (
					<span className='bg-selection px-2 py-1 rounded-lg'>
						Остановлена на: {new Date(parseInt(savedTime) * 1000).toISOString().slice(14, 19)}
					</span>
				)}
			</>
		)
	}

	if (isLoading)
		return (
			<div className='grid gap-4 md:grid-cols-2 pt-8'>
				<CatalogLoader />
			</div>
		)
	if (!episodes || !episodes.list) return <p>Эпизоды не найдены</p>

	return (
		<div className='min-h-[37.5rem]'>
			<SearchEpisodes
				className='pt-5'
				onSearchChange={setSearchQuery}
			/>

			<Dialog
				open={isDialogOpen}
				onOpenChange={open => (open ? setIsDialogOpen(true) : setIsDialogOpen(false))}
			>
				<ul className='grid gap-4 md:grid-cols-2 pt-8'>
					{filteredEpisodes.map(episode => (
						<DialogTrigger
							asChild
							key={episode.uuid}
						>
							<li
								className={cn(
									'grid sm:grid-cols-2 gap-5 cursor-pointer bg-black/10 hover:bg-[#ff7373]/20  dark:hover:bg-violet-500/20 p-3 rounded-lg transition-colors'
								)}
								onClick={() => {
									setSelectedEpisode(episode)
									setIsDialogOpen(true)
								}}
							>
								{episode.preview && (
									<Image
										className='w-full h-full max-h-[15.625rem] max-sm:h-[6.25rem] max-sm:max-h-[6.25rem] aspect-video object-cover rounded-lg'
										src={`https://www.anilibria.tv${episode.preview}`}
										width={256}
										height={144}
										alt={`Превью эпизода ${episode.episode}`}
										loading='lazy'
										placeholder='blur'
										blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII='
									/>
								)}
								<div className='flex-1 flex gap-2 flex-col items-start'>
									<div className='flex flex-wrap gap-2'>
										<strong>Серия {episode.episode}:</strong>
										<h4>{episode.name}</h4>
									</div>
									<GetTime episode={episode} />
									<div className='text-sm '>
										<p>
											Дата выхода: {new Date(episode.created_timestamp * 1000).toLocaleDateString()}
										</p>
									</div>
								</div>
							</li>
						</DialogTrigger>
					))}
				</ul>

				<DialogContent className='max-w-3xl'>
					{selectedEpisode && (
						<DialogModal
							episodes={Object.values(episodes.list)}
							episode={selectedEpisode}
							host={episodes.host}
							onChangeEpisode={handleChangeEpisode}
						/>
					)}
				</DialogContent>
			</Dialog>
		</div>
	)
}
