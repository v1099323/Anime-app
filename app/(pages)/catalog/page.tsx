import { Metadata } from 'next'
import { Suspense } from 'react'

import CatalogItem from '@/components/shared/catalog/catalog-item'
import InfiniteCatalog from '@/components/shared/catalog/infinite-catalog'
import { Filters } from '@/components/shared/filters/filters'

import { catalogSEO } from '@/SEO/catalog.seo'
import { GETITEM } from '@/service/get-item'

export const revalidate = 60

export const metadata: Metadata = {
	title: catalogSEO.title
}

async function getPosts() {
	try {
		const posts = await GETITEM.CATALOG()
		return posts
	} catch (err) {
		console.error('Catalog fetch error:', err)
		return []
	}
}

const CatalogPage = async () => {
	const posts = await getPosts()
	return (
		<div>
			<div className='flex gap-4 justify-between pt-7 md:pt-12'>
				<h1 className='text-3xl'>Каталог</h1>
				<Suspense fallback={<div>Загрузка...</div>}>
					<Filters />
				</Suspense>
			</div>
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

export default CatalogPage
