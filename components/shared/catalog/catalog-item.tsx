'use client'

import { motion as m } from 'framer-motion'
import { Loader2, Trash2Icon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { useSaveTitle } from '@/hooks/useSaveTitle'

import { ICatalogItem } from '@/types/catalog-item-types'

const CatalogItem = ({
	isDeleting,
	handleDelete,
	item
}: {
	item: ICatalogItem
	isDeleting?: boolean
	handleDelete?: (itemCode: string) => void
}) => {
	const { code, names, genres, posters, type, description }: ICatalogItem = item
	const { addTitle } = useSaveTitle()

	return (
		<m.div
			className='flex gap-4 object-scale-down overflow-hidden'
			initial={{ opacity: 0, scale: 0.9, y: 10 }}
			whileInView={{ opacity: 1, scale: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{
				ease: 'easeIn',
				delay: genres.length * 0.05,
				duration: 0.15
			}}
		>
			<Link
				className='overflow-hidden rounded-lg bg-neutral-400 relative flex-[0_0_37.07%]'
				href={`/catalog/${code}`}
				onClick={() => addTitle(code)}
			>
				<Loader2 className=' absolute top-[calc(50%-1.25rem)] left-[calc(50%-1.25rem)] right-[calc(50%-1.25rem)] animate-spin text-white size-10 block z-1' />
				<m.div
					initial={{ scale: 1 }}
					whileHover={{ scale: 1.03 }}
					transition={{ duration: 0.1, ease: 'easeIn' }}
				>
					<Image
						className='object-cover aspect-[9/16] w-full h-auto relative z-2'
						src={'https://www.anilibria.tv' + posters.original.url}
						width={200}
						height={600}
						alt={names.ru}
					/>
				</m.div>
			</Link>
			<div className='flex flex-col'>
				<h2 className='text-xl line-clamp-2'>
					<Link
						className='hover:underline'
						href={`/catalog/${code}`}
						onClick={() => addTitle(code)}
					>
						{names.ru}
					</Link>
				</h2>

				{type && <p className='text-base pt-2'>Тип: {type.full_string}</p>}
				{description && (
					<div className='max-lg:hidden text-base line-clamp-3 pt-2'>Описание: {description}</div>
				)}

				{type.code > 1 && <p className='text-base pt-2'>Сезонов: {type.code}</p>}
				{genres && (
					<ul className='flex items-start gap-2 md:flex-wrap text-base pt-2 overflow-auto'>
						{genres.map((genre, index) => (
							<li
								className='bg-selection px-2 py-1 rounded-lg whitespace-nowrap'
								key={index}
							>
								{genre}
							</li>
						))}
					</ul>
				)}
				{isDeleting && handleDelete && (
					<div className='mt-auto'>
						<button
							onClick={() => handleDelete(code)}
							className='mt-2 flex items-center justify-center w-full
             px-3 py-1 gap-2 bg-selection text-white rounded-lg'
						>
							Удалить <Trash2Icon />
						</button>
					</div>
				)}
			</div>
		</m.div>
	)
}

export default CatalogItem
