'use client'

import { useEffect, useState } from 'react'
import useMedia from 'use-media'

export const HeaderClient = () => {
	const isMedia = useMedia('(max-width: 48rem)')
	const [smallHeader, setSmallHeader] = useState(false)

	useEffect(() => {
		const handleScroll = () => {
			setSmallHeader(window.scrollY > 100)
		}
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	useEffect(() => {
		const header = document.querySelector('header')
		if (header) {
			header.style.height = smallHeader ? (isMedia ? '60px' : '80px') : isMedia ? '80px' : '112px'
		}
	}, [smallHeader, isMedia])

	return null
}
