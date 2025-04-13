'use client'

import { Loader2, SkipBackIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import ReactHlsPlayer from 'react-hls-player'

import { useSkipOpening } from '@/hooks/useSkipOpening'

import { Button } from '../../ui/button'

import { PlayerControls } from './player-controls'
import { IEpisode } from '@/types/episode.types'

interface PlayerProps {
	episode: IEpisode
	host: string
	onChangeEpisode: (offset: number) => void
}

export const PlayerTest = ({ episode, host, onChangeEpisode }: PlayerProps) => {
	const playerRef = useRef<HTMLVideoElement>(null)
	const [loadingPlayer, setLoadingPlayer] = useState(true)
	const [currentQuality, setCurrentQuality] = useState<'fhd' | 'hd' | 'sd'>('hd')

	useEffect(() => {
		const savedQuality = localStorage.getItem('preferredQuality') as 'fhd' | 'hd' | 'sd'
		if (savedQuality) {
			setCurrentQuality(savedQuality)
		}
	}, [])

	const { visibleSkipButton, showNextButton, handleSkipOpening } = useSkipOpening(
		playerRef as React.RefObject<HTMLVideoElement>,
		episode
	)

	const handleNextEpisode = () => {
		onChangeEpisode(1)
	}

	const getSrc = () => {
		return `https://${host}${episode.hls[currentQuality] || ''}`
	}

	return (
		<div className='aspect-video w-full h-auto relative overflow-hidden rounded-md'>
			<ReactHlsPlayer
				className='absolute z-[4] top-0 left-0 h-full w-full object-contain'
				playerRef={playerRef as React.RefObject<HTMLVideoElement>}
				src={getSrc()}
				poster={`https://anilibria.tv/${episode.preview}`}
				autoPlay={true}
				controls={false}
				disablePictureInPicture
				controlsList='nodownload'
				onLoadedData={() => setLoadingPlayer(false)}
				onLoadStart={() => setLoadingPlayer(true)}
			/>

			{loadingPlayer && (
				<div className='absolute z-[15] bg-white/70 top-0 left-0 h-full w-full flex items-center justify-center'>
					<div className='p-2 bg-black rounded-lg'>
						<Loader2 className='w-12 h-12 animate-spin text-white' />
					</div>
				</div>
			)}

			{visibleSkipButton && (
				<Button
					className='absolute z-10 bottom-16 right-3 starting active:playing'
					type='button'
					title='Пропустить опеннинг'
					onClick={handleSkipOpening}
				>
					Пропустить <SkipBackIcon className='rotate-180' />
				</Button>
			)}

			{showNextButton && (
				<Button
					className='absolute z-10 bottom-16 right-3 starting'
					type='button'
					title='Следующая серия'
					onClick={handleNextEpisode}
				>
					Следующая серия <SkipBackIcon className='rotate-180' />
				</Button>
			)}

			<PlayerControls
				episode={episode}
				playerRef={playerRef as React.RefObject<HTMLVideoElement>}
				setCurrentQuality={setCurrentQuality}
				currentQuality={currentQuality}
			/>
		</div>
	)
}
