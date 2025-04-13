import { useEffect, useState } from 'react'

import { IEpisode } from '@/types/episode.types'

export const useSkipOpening = (playerRef: React.RefObject<HTMLVideoElement>, episode: IEpisode) => {
	const [visibleSkipButton, setVisibleSkipButton] = useState(false)
	const [showNextButton, setShowNextButton] = useState(false)

	useEffect(() => {
		const interval = setInterval(() => {
			if (playerRef.current && playerRef.current.currentTime >= playerRef.current.duration * 0.9) {
				setShowNextButton(true)
			} else {
				setShowNextButton(false)
			}

			if (!episode?.skips?.opening || episode.skips.opening.length < 2) return

			const [start, end] = episode.skips.opening

			if (
				playerRef.current &&
				playerRef.current.currentTime > start &&
				playerRef.current.currentTime < end
			) {
				setVisibleSkipButton(true)
			} else {
				setVisibleSkipButton(false)
			}
		}, 1000)

		return () => clearInterval(interval)
	}, [episode, playerRef])

	const handleSkipOpening = () => {
		if (!episode.skips?.opening || episode.skips.opening.length < 2) return

		if (playerRef.current) {
			playerRef.current.currentTime = episode.skips.opening[1]
		}
	}

	return { visibleSkipButton, showNextButton, handleSkipOpening }
}
