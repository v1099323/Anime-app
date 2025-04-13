import { useCallback, useEffect, useState } from 'react'

export const useSaveTitle = () => {
	const [watchedEpisodes, setWatchedEpisodes] = useState<string[]>([])
	const [isInitialized, setIsInitialized] = useState(false)

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const saved = localStorage.getItem('saved_Titles')
			setWatchedEpisodes(saved ? JSON.parse(saved) : [])
			setIsInitialized(true)
		}
	}, [])

	useEffect(() => {
		if (isInitialized) {
			localStorage.setItem('saved_Titles', JSON.stringify(watchedEpisodes))
		}
	}, [watchedEpisodes, isInitialized])

	const addTitle = useCallback((code: string) => {
		setWatchedEpisodes(prev => {
			if (prev.includes(code)) return prev
			return [...prev, code]
		})
	}, [])

	const removeTitle = useCallback((code: string) => {
		setWatchedEpisodes(prev => prev.filter(episode => episode !== code))
	}, [])

	return {
		addTitle,
		removeTitle,
		watchedEpisodes
	}
}
