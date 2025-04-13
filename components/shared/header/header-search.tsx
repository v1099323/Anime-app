'use client'

import { XIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCallback, useRef, useState } from 'react'

import { Input } from '@/components/ui/input'

import { useSearchAnim } from './use-search-anim'

const placeholderData = [
	'Наруто',
	'Код Гиасс',
	'Гримгал пепла и иллюзий',
	'Меч чужака',
	'Идолмастер: Мальчики'
]

export const HeaderSearch = () => {
	const { current, next } = useSearchAnim(placeholderData)
	const [visible, setVisible] = useState(true)
	const inputRef = useRef<HTMLInputElement>(null)
	const router = useRouter()

	const handleClean = () => {
		if (inputRef.current) {
			inputRef.current.value = ''
			inputRef.current.focus()
		}
		OnChange()
	}

	// Обработка изменения ввода
	const OnChange = useCallback(() => {
		if (inputRef.current?.value) setVisible(false)
		else setVisible(true)
	}, [inputRef, setVisible])

	// Обработка отправки формы (нажатие Enter)
	const handleSearch = useCallback(
		(e: React.KeyboardEvent<HTMLInputElement>) => {
			if (e.key === 'Enter') {
				const query = inputRef.current?.value.trim()
				if (query) {
					// Переход на страницу результатов с параметром поиска
					router.push(`/catalog/results?search=${encodeURIComponent(query)}`)
				} else {
					router.push('/catalog')
				}
			}
		},
		[router]
	)

	return (
		<div className='flex-1 h-9 relative overflow-hidden'>
			<Input
				className='w-full bg-transparent'
				placeholder='Поиск Аниме'
				ref={inputRef}
				onInput={OnChange}
				onKeyDown={handleSearch} // Обработка нажатия Enter
			/>

			{!visible && (
				<button
					className='absolute top-1/2 right-2 -translate-y-1/2 p-1 rounded-full bg-black text-white dark:bg-white dark:text-black'
					onClick={handleClean}
					type='button'
					title='Очистить'
				>
					<XIcon className='w-4 h-4' />
				</button>
			)}

			{/* Кастомный анимированный плейсхолдер */}
			{visible && (
				<div className='absolute top-0 w-full left-3 h-full flex items-center pointer-events-none text-muted-foreground'>
					<div className='relative h-6 w-full overflow-hidden'>
						<div
							className={`
                absolute transition-all duration-500 line-clamp-1
                ${next ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'}
              `}
						>
							Поиск Аниме: {current}
						</div>
					</div>
				</div>
			)}
		</div>
	)
}
