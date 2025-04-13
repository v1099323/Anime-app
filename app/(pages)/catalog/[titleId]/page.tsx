import { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'

import { DescriptionTab } from '@/components/shared/description-tab'
import EpisodesList from '@/components/shared/episodes-list'

import { filterURI } from '@/service/filter-url'
import { URL } from '@/service/urls'
import { TitleData } from '@/types/title.types'

export async function generateMetadata({
	params
}: {
	params: { titleId: string }
}): Promise<Metadata> {
	const { titleId } = params
	const data = await fetchTitleData(titleId)

	if (!data) {
		return {
			title: 'Not Found',
			description: 'The title you are looking for does not exist.'
		}
	}

	return {
		title: data.names.ru || data.names.en || 'Unknown Title',
		description: data.description || 'No description available.',
		openGraph: {
			title: data.names.ru || data.names.en || 'Unknown Title',
			description: data.description || 'No description available.',
			images: [
				{
					url: URL.IMAGE + data.posters.original.url,
					width: 455,
					height: 650,
					alt: data.names.ru || data.names.en || 'Unknown Title'
				}
			]
		},
		twitter: {
			card: 'summary_large_image',
			title: data.names.ru || data.names.en || 'Unknown Title',
			description: data.description || 'No description available.',
			images: [URL.IMAGE + data.posters.original.url]
		}
	}
}

export default async function TitlePage({ params }: { params: { titleId: string } }) {
	const { titleId } = params
	const data = await fetchTitleData(titleId)

	if (!data) {
		return notFound()
	}

	return (
		<div className=''>
			<div className='grid md:grid-cols-[1.3fr_2.2fr] gap-5 md:pt-12 relative overflow-hidden max-md:mx-[-0.9375rem]'>
				<Image
					className='max-md:absolute z-2 inset-0 max-md:w-full max-md:h-full md:rounded-lg object-cover'
					src={URL.IMAGE + data.posters.original.url}
					width={455}
					height={650}
					alt={data.names.ru}
				/>
				<div className='absolute inset-0 z-1 bg-neutral-900/70 md:hidden'></div>
				<div className='relative max-md:p-5 z-2 flex-1 max-md:text-white'>
					<h1 className='text-3xl font-bold'>{data.names.ru}</h1>
					<div className='inline-block pt-2'>
						<h2 className='bg-selection text-foreground px-2 py-1 rounded-sm max-md:text-xl'>
							{data.names.en}
						</h2>
					</div>

					{data.description && (
						<p className='pt-5 max-md:hidden'>
							<b>Описание:</b> {data.description}
						</p>
					)}
					<div className='pt-5 space-y-4'>
						<p className=' max-md:text-xl'>
							<b>Статус:</b> {data.status.string}
						</p>
						<p className=' max-md:text-xl'>
							<b>Тип:</b> {data.type.full_string}
						</p>
						<p className=' max-md:text-xl'>
							<b>Жанры:</b> {data.genres.join(', ')}
						</p>
						<p className=' max-md:text-xl'>
							<b>Сезон:</b> {data.season.string} {data.season.year}
						</p>
						<p className=' max-md:text-xl'>
							<b>В избранном у:</b> {data.in_favorites} пользователей
						</p>
						<p className=' max-md:text-xl'>
							<b>Последнее обновление: </b>
							{new Date(data.updated * 1000).toLocaleString().split(', ')[0]}
						</p>
						<p className=' max-md:text-xl'>
							<b>Серия:</b> {data.player.episodes.string}
						</p>
						<div className='flex flex-wrap items-center gap-2 max-md:text-xl'>
							<b>Озвучка:</b>
							<ul className='flex flex-wrap items-center gap-x-2 gap-y-1'>
								{data.team.voice.map((voice, index) => (
									<li
										className='py-1 px-2 bg-selection text-foreground rounded-sm cursor-default'
										key={index}
										title={voice}
									>
										<p>{voice}</p>
									</li>
								))}
							</ul>
						</div>
						{data.description && (
							<DescriptionTab
								className='md:hidden'
								title='Описание:'
								content={data.description}
							/>
						)}
					</div>
				</div>
			</div>
			<div className='pt-5'>
				<h2 className='text-2xl font-bold'>Список серий</h2>
				<EpisodesList code={titleId} />
			</div>
		</div>
	)
}

async function fetchTitleData(code: string): Promise<TitleData | null> {
	try {
		const response = await fetch(`https://api.anilibria.tv/v3/title?code=${code}${filterURI.Post}`)
		return response.json()
	} catch (error) {
		console.error('Error fetching title data:', error)
		return null
	}
}

export const revalidate = 60
