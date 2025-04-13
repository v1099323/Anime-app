import CatalogItem from '@/components/shared/catalog/catalog-item'
import InfiniteCatalog from '@/components/shared/catalog/infinite-catalog'
import { MainSlider } from '@/components/shared/main-slider/main-slider'

import { GETITEM } from '@/service/get-item'

async function getPosts() {
	try {
		const posts = await GETITEM.CATALOG()
		return posts
	} catch (err) {
		console.error('Catalog fetch error:', err)
		return []
	}
}

export default async function Home() {
	const posts = await getPosts()

	return (
		<div>
			<h1 className='text-2xl lg:text-3xl text-center pt-7 md:pt-12'>
				AniHaven Смотри, мечтай, вдохновляйся!
			</h1>
			<MainSlider />
			<div className='pt-7 md:pt-12 grid grid-cols-[repeat(auto-fill,minmax(18.125rem,1fr))] md:grid-cols-[repeat(auto-fill,minmax(21.875rem,1fr))]  lg:grid-cols-[repeat(auto-fill,minmax(28.125rem,1fr))] gap-5'>
				{posts?.map(item => (
					<CatalogItem
						key={item.id}
						item={item}
					/>
				))}
			</div>
			<InfiniteCatalog />
		</div>
	)
}
