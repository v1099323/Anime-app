'use client'

import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'

import { DialogHeader } from '@/components/ui/dialog'

import { Button } from '../../ui/button'

import { PlayerTest } from './player-test'
import { cn } from '@/lib/utils'
import { IEpisode } from '@/types/episode.types'

interface PlayerModalProps {
	episodes: IEpisode[]
	episode: IEpisode
	host: string
	onChangeEpisode: (offset: number) => void
}

export const DialogModal = ({ episodes, episode, host, onChangeEpisode }: PlayerModalProps) => {
	const [canGoPrev, setCanGoPrev] = useState(false)
	const [canGoNext, setCanGoNext] = useState(false)

	useEffect(() => {
		const index = episodes.findIndex(e => e.uuid === episode.uuid)

		setCanGoPrev(index > 0)
		setCanGoNext(index < episodes.length - 1)
	}, [episode, episodes, setCanGoNext, setCanGoPrev])

	return (
		<>
			<DialogHeader className='sr-only'>
				<DialogTitle>Anime player</DialogTitle>
				<DialogDescription>
					{episode.episode} {episode.name}
				</DialogDescription>
			</DialogHeader>
			<div className='font-semibold'>Ceрия {episode.episode}</div>
			<PlayerTest
				episode={episode}
				host={host}
				onChangeEpisode={onChangeEpisode}
			/>
			<div className='flex justify-between items-center gap-4'>
				<Button
					type='button'
					title='Предыдущая cерия'
					onClick={() => onChangeEpisode(-1)}
					disabled={!canGoPrev}
					className={cn('transition-opacity', !canGoPrev && 'opacity-50 cursor-not-allowed')}
				>
					<ArrowLeft /> Предыдущая
				</Button>
				<Button
					type='button'
					title='Следующая cерия'
					onClick={() => onChangeEpisode(1)}
					disabled={!canGoNext}
					className={cn('transition-opacity', !canGoNext && 'opacity-50 cursor-not-allowed')}
				>
					Следующая <ArrowRight />
				</Button>
			</div>
		</>
	)
}
