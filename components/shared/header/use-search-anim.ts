'use client'

import { useEffect, useState } from 'react'

export const useSearchAnim = (data: string[]) => {
	const getRandomPlaceholder = (current: string) => {
		const filtered = data.filter(item => item !== current)
		return filtered[Math.floor(Math.random() * filtered.length)]
	}

	const [current, setCurrent] = useState(data[0])
	const [next, setNext] = useState<string | null>(null)
	const [isAnimating, setIsAnimating] = useState(false)

	useEffect(() => {
		const interval = setInterval(() => {
			if (!isAnimating) {
				const newPlaceholder = getRandomPlaceholder(current)
				setIsAnimating(true)
				setNext(newPlaceholder)

				setTimeout(() => {
					setCurrent(newPlaceholder)
					setNext(null)
					setIsAnimating(false)
				}, 500)
			}
		}, 3000)

		return () => clearInterval(interval)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isAnimating, current])

	return { current, next }
}
