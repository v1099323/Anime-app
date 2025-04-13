'use client'

import {
	MaximizeIcon,
	MinimizeIcon,
	PauseIcon,
	PlayIcon,
	SkipBackIcon,
	SkipForwardIcon,
	Volume2Icon,
	VolumeXIcon
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { CustomTooltip } from '@/components/ui/button-tooltip'
import { Slider } from '@/components/ui/slider'

import { QualitySelector } from './select-player'
import { cn } from '@/lib/utils'
import { IEpisode } from '@/types/episode.types'

interface IPlayerControls {
	episode: IEpisode
	playerRef: React.RefObject<HTMLVideoElement>
	setCurrentQuality: (quality: 'fhd' | 'hd' | 'sd') => void
	currentQuality: 'fhd' | 'hd' | 'sd'
}

export const PlayerControls = ({
	episode,
	playerRef,
	setCurrentQuality,
	currentQuality
}: IPlayerControls) => {
	const [isPlaying, setIsPlaying] = useState(false)
	const [volume, setVolume] = useState(1)
	const [previousVolume, setPreviousVolume] = useState(1)
	const [progress, setProgress] = useState(0)
	const [isFullscreen, setIsFullscreen] = useState(false)
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [isLoading, setIsLoading] = useState(false)
	const [isControlsVisible, setIsControlsVisible] = useState(false)
	const [isMouseActive, setIsMouseActive] = useState(false)
	const controlsRef = useRef<HTMLDivElement>(null)
	const ScreenRef = useRef<HTMLDivElement>(null)
	const WallRef = useRef<HTMLDivElement>(null)

	//quality

	const savedTimeKey = `episode_${episode.uuid}_time`
	const [savedTime, setSavedTime] = useState<string | null>(null)

	useEffect(() => {
		setSavedTime(localStorage.getItem(savedTimeKey))
	}, [episode, savedTimeKey])

	useEffect(() => {
		if (playerRef.current && savedTime) {
			playerRef.current.currentTime = parseFloat(savedTime)
		}
	}, [savedTime, playerRef, currentQuality])

	useEffect(() => {
		if (episode?.hls) {
			const bestQuality = episode.hls.fhd ? 'fhd' : episode.hls.hd ? 'hd' : 'sd'
			setCurrentQuality(episode.hls[currentQuality] ? currentQuality : bestQuality)
		}
	}, [episode, currentQuality, setCurrentQuality])

	const handleQualityChange = (quality: 'fhd' | 'hd' | 'sd') => {
		if (playerRef.current) {
			const currentTime = playerRef.current.currentTime
			localStorage.setItem(savedTimeKey, currentTime.toString())
			localStorage.setItem('preferredQuality', quality)

			setCurrentQuality(quality)

			// Ждём обновления качества и восстанавливаем время
			setTimeout(() => {
				if (playerRef.current) {
					const savedTime = localStorage.getItem(savedTimeKey)
					if (savedTime) {
						playerRef.current.currentTime = parseFloat(savedTime)
					}
				}
			}, 500) // небольшая задержка на обработку смены качества
		}
	}

	useEffect(() => {
		const player = playerRef.current
		if (!player) return

		const savedTime = localStorage.getItem(`episode_${episode.uuid}_time`)
		if (savedTime) {
			player.currentTime = parseFloat(savedTime)
		}

		const updateProgress = () => {
			const currentTime = player.currentTime
			setProgress((currentTime / player.duration) * 100)

			localStorage.setItem(`episode_${episode.uuid}_time`, currentTime.toString())
		}

		const handlePlay = () => {
			setIsPlaying(false)
		}

		const handlePause = () => {
			setIsPlaying(true)
		}

		const handleEnded = () => {}

		player.addEventListener('timeupdate', updateProgress)
		player.addEventListener('waiting', () => setIsLoading(true))
		player.addEventListener('playing', () => setIsLoading(false))
		player.addEventListener('play', handlePlay)
		player.addEventListener('pause', handlePause)
		player.addEventListener('ended', handleEnded)

		return () => {
			player.removeEventListener('timeupdate', updateProgress)
			player.removeEventListener('waiting', () => setIsLoading(true))
			player.removeEventListener('playing', () => setIsLoading(false))
			player.removeEventListener('play', handlePlay)
			player.removeEventListener('pause', handlePause)
			player.removeEventListener('ended', handleEnded)
		}
	}, [playerRef, episode.uuid])

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			e.preventDefault()
			if (e.code === 'Space') togglePlay()
			if (e.code === 'KeyF') toggleFullscreen()
			if (e.code === 'ArrowRight') skip(15)
			if (e.code === 'ArrowLeft') skip(-15)
			if (e.code === 'ArrowUp') {
				const newVolume = Math.min(volume + 0.2, 1)
				setVolume(newVolume)
				playerRef.current.volume = newVolume
				localStorage.setItem('Volume', String(newVolume.toFixed(1)))
			}
			if (e.code === 'ArrowDown') {
				const newVolume = Math.max(volume - 0.25, 0)
				setVolume(newVolume)
				playerRef.current.volume = Number(newVolume.toFixed(1))
				localStorage.setItem('Volume', String(newVolume.toFixed(1)))
			}
			if (e.code === 'KeyM') toggleMute()
		}

		document.addEventListener('keydown', handleKeyDown)
		return () => document.removeEventListener('keydown', handleKeyDown)
	})

	useEffect(() => {
		let timeoutId: NodeJS.Timeout

		const handleMouseMove = () => {
			setIsMouseActive(true)
			setIsControlsVisible(true)
			clearTimeout(timeoutId)
			timeoutId = setTimeout(() => {
				setIsControlsVisible(false)
				setIsMouseActive(false)
			}, 2000)
		}

		const handlePause = () => {
			setIsControlsVisible(true)
		}

		const handlePlay = () => {
			if (!isMouseActive) {
				setIsControlsVisible(false)
			}
		}

		const player = playerRef.current
		const controls = ScreenRef.current

		if (controls) {
			controls.addEventListener('mousemove', handleMouseMove)
		}

		if (player) {
			player.addEventListener('pause', handlePause)
			player.addEventListener('play', handlePlay)
		}

		return () => {
			if (controls) {
				controls.removeEventListener('mousemove', handleMouseMove)
			}
			if (player) {
				player.removeEventListener('pause', handlePause)
				player.removeEventListener('play', handlePlay)
			}
			clearTimeout(timeoutId)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isMouseActive])

	const togglePlay = () => {
		if (!playerRef.current) return

		if (playerRef.current.paused) {
			playerRef.current.play()
		} else {
			playerRef.current.pause()
		}

		setIsPlaying(!isPlaying)
	}

	const mainSlider = (value: number[]) => {
		const newTime = (parseFloat(String(value)) / 100) * playerRef.current.duration
		playerRef.current.currentTime = newTime
		setProgress(parseFloat(String(value)))
	}

	const handleVolumeChanger = (value: number[]) => {
		const newVolume = parseFloat(String(value))
		localStorage.setItem('Volume', String(newVolume))
		if (playerRef.current) {
			playerRef.current.volume = newVolume
		}
		setVolume(newVolume)
	}

	useEffect(() => {
		const savedVolume = localStorage.getItem('Volume')
		if (savedVolume) {
			setVolume(parseFloat(savedVolume))
			if (playerRef.current) {
				playerRef.current.volume = parseFloat(savedVolume)
			}
		}
	}, [playerRef])

	const toggleMute = () => {
		if (!playerRef.current) return

		if (playerRef.current.volume > 0) {
			setPreviousVolume(playerRef.current.volume)
			setVolume(0)
			playerRef.current.volume = 0
		} else {
			setVolume(previousVolume)
			playerRef.current.volume = previousVolume
		}
	}

	const toggleFullscreen = () => {
		if (!document.fullscreenElement) {
			playerRef.current?.parentElement?.requestFullscreen()
		} else {
			document.exitFullscreen()
		}
		setIsFullscreen(!isFullscreen)
	}

	const skip = (seconds: number) => {
		if (playerRef.current) {
			playerRef.current.currentTime += seconds
		}
	}

	const CurrentTimeAndEndTime = () => {
		if (!playerRef.current) return
		const minutes = Math.floor(playerRef.current.currentTime / 60)
		const seconds = Math.floor(playerRef.current.currentTime % 60)

		const totalMinutes = Math.floor(playerRef.current.duration / 60)
		const totalSeconds = Math.floor(playerRef.current.duration % 60)

		return (
			<div className='flex gap-2 items-center'>
				<div className=''>
					{minutes}:{seconds < 10 ? `0${seconds}` : seconds}
				</div>
				/
				<div className=''>
					{totalMinutes}:{totalSeconds < 10 ? `0${totalSeconds}` : totalSeconds}
				</div>
			</div>
		)
	}

	return (
		<div
			className={cn('absolute bottom-0 left-0 w-full h-full', !isMouseActive && 'cursor-none')}
			ref={controlsRef}
		>
			<div
				className='absolute bottom-0 left-0 w-full h-full z-[4] flex items-center justify-center'
				onClick={togglePlay}
				ref={ScreenRef}
			>
				<span className='text-white'>
					{isPlaying ? (
						<PlayIcon className='size-14 p-2 bg-black/30 rounded-lg' />
					) : (
						<PauseIcon className='size-12 playing' />
					)}
				</span>
			</div>
			<div
				className={cn(
					'absolute bottom-0 left-0 w-full z-10 px-3 bg-gradient-to-t from-black to-transparent opacity-0 pointer-events-none text-white backdrop:filter backdrop-blur-sm transition-opacity hover:opacity-100 hover:pointer-events-auto hover:cursor-auto',
					isControlsVisible && 'opacity-100 pointer-events-auto'
				)}
			>
				<div className=''>
					<Slider
						defaultValue={[0]}
						max={100}
						step={0.1}
						value={[progress]}
						onValueChange={mainSlider}
					/>
				</div>
				<div
					className='flex justify-between items-center gap-2'
					ref={WallRef}
				>
					<div className='flex items-center'>
						<CustomTooltip
							boundary={WallRef.current as HTMLDivElement}
							isFullscreen={isFullscreen}
							align='start'
							className='z-50'
							content='отмотать 15 секунд'
						>
							<button
								className='w-12 h-12 inline-flex rounded-lg items-center justify-center transition-colors hover:bg-white/10 hover:text-[#ccc] title:text-green'
								onClick={() => skip(-15)}
							>
								<SkipBackIcon />
							</button>
						</CustomTooltip>
						<CustomTooltip
							boundary={WallRef.current as HTMLDivElement}
							isFullscreen={isFullscreen}
							className='z-50'
							content={isPlaying ? 'воспроизвести' : 'пауза'}
						>
							<button
								className='w-12 h-12 inline-flex rounded-lg items-center justify-center transition-colors hover:bg-white/10 hover:text-[#ccc]'
								onClick={togglePlay}
							>
								{isPlaying ? <PlayIcon /> : <PauseIcon />}
							</button>
						</CustomTooltip>
						<CustomTooltip
							boundary={WallRef.current as HTMLDivElement}
							isFullscreen={isFullscreen}
							className='z-50'
							content='пропустить 15 секунд'
						>
							<button
								className='w-12 h-12 inline-flex rounded-lg items-center justify-center transition-colors hover:bg-white/10 hover:text-[#ccc]'
								onClick={() => skip(15)}
							>
								<SkipForwardIcon />
							</button>
						</CustomTooltip>

						<div className='flex hover:gap-2 items-center group transition-all hover:pr-4'>
							<CustomTooltip
								boundary={WallRef.current as HTMLDivElement}
								isFullscreen={isFullscreen}
								className='z-50'
								content={volume > 0 ? 'отключить звук' : 'включить звук'}
							>
								<button
									className='w-12 h-12 inline-flex rounded-lg items-center justify-center transition-colors hover:bg-white/10 hover:text-[#ccc]'
									onClick={toggleMute}
								>
									{volume > 0 ? <Volume2Icon /> : <VolumeXIcon />}
								</button>
							</CustomTooltip>

							<Slider
								className='w-0 opacity-0 transition-all group-hover:w-16 group-hover:opacity-100'
								defaultValue={[0]}
								min={0}
								max={1}
								value={[volume]}
								step={0.01}
								onValueChange={handleVolumeChanger}
							/>
						</div>
						<CurrentTimeAndEndTime />
					</div>
					<div className='flex gap-2 items-center'>
						<QualitySelector
							qualities={episode.hls}
							currentQuality={currentQuality}
							onChange={handleQualityChange}
						/>

						<CustomTooltip
							boundary={WallRef.current as HTMLDivElement}
							isFullscreen={isFullscreen}
							align='end'
							content={
								isFullscreen ? 'отключить полноэкранный режим' : 'включить полноэкранный режим'
							}
						>
							<button
								className='w-12 h-12 inline-flex rounded-lg items-center justify-center transition-colors hover:bg-white/10 hover:text-[#ccc]'
								onClick={toggleFullscreen}
							>
								{isFullscreen ? <MinimizeIcon /> : <MaximizeIcon />}
							</button>
						</CustomTooltip>
					</div>
				</div>
			</div>
		</div>
	)
}
