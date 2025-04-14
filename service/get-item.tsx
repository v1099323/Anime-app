import { api } from './api'
import { filterURI } from './filter-url'
import { currentDay } from '@/lib/utils'
import { ICarouselItem } from '@/types/carousel-item.types'

/* eslint-disable @typescript-eslint/no-explicit-any */

const ITEMS_PER_PAGE = 12

type PaginationParams = {
	pageParam?: number
}

const fetchData = async <T,>(url: string): Promise<T> => {
	try {
		const response = await api.get<T>(url)
		return response.data
	} catch (error) {
		console.error(`API request failed for: ${url}`, error)
		throw error
	}
}

export const GETITEM = {
	SLIDER: () => {
		const day = currentDay()
		const url = `/title/schedule?days=${day}${filterURI.Slider}`
		return fetchData(url)
	},

	HISTORY: (code: string) => {
		const url = `/title/list?code_list=${code}${filterURI.Posts}`
		return fetchData(url)
	},

	POST: async (code: string): Promise<string> => {
		const url = `/title/list?code_list=${code}${filterURI.Post}`
		const data = await fetchData<any[]>(url)
		return data[0]?.player ?? ''
	},

	ESPISODES: async (code: string): Promise<string> => {
		const url = `/title/list?code_list=${code}${filterURI.Episodes}`
		const data = await fetchData<any[]>(url)
		return data[0]?.player ?? ''
	},

	CATALOG: async (): Promise<ICarouselItem[]> => {
		const url = `/title/updates?items_per_page=${ITEMS_PER_PAGE}${filterURI.Posts}`
		const data = await fetchData<{ list: ICarouselItem[] }>(url)
		return data.list
	},

	INFINITE_CATALOG: async ({ pageParam = 1 }: PaginationParams) => {
		const url = `/title/updates?items_per_page=${ITEMS_PER_PAGE}&page=${pageParam}${filterURI.Posts}`
		const data = await fetchData<{ list: ICarouselItem[] }>(url)
		return {
			data: data.list,
			nextPage: data.list.length ? pageParam + 1 : null
		}
	}
}
