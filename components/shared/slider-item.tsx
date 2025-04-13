'use client'

import Image from 'next/image'
import Link from 'next/link'

import { useSaveTitle } from '@/hooks/useSaveTitle'

import { ICarouselItem } from '@/types/carousel-item.types'

export const SliderItem = ({ names, posters, type, code, description }: ICarouselItem) => {
	const { addTitle } = useSaveTitle()

	return (
		<Link
			className='block relative'
			href={`/catalog/${code}`}
			onClick={() => addTitle(code)}
		>
			<Image
				className='object-cover aspect-[9/16]  w-full h-auto rounded-lg'
				src={'https://www.anilibria.tv' + posters.original.url}
				width={1250}
				height={600}
				alt={names.ru}
			/>
			<div className='opacity-0 transition-opacity hover:opacity-100'>
				<div className='absolute inset-0 z-[1] bg-gradient-to-r from-neutral-900 rounded-lg max-md:hidden'></div>
				<div className='absolute inset-0 z-[2] p-8 text-white flex flex-col gap-4 max-md:hidden'>
					<h2 className='text-xl line-clamp-2'>{names.ru}</h2>
					{type && <p className='text-base'>Тип: {type.full_string}</p>}
					<div className='max-lg:hidden text-base line-clamp-3'>Описание: {description}</div>
					{type.code > 1 && <p className='text-base'>Сезонов: {type.code}</p>}
				</div>
			</div>
		</Link>
	)
}
