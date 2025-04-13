import axios from 'axios'

import { filterURI } from './filter-url'
import { URL } from './urls'
import { currentDay } from '@/lib/utils'
import { ICarouselItem } from '@/types/carousel-item.types'

const ITEMS_PER_PAGE = 12

export const GETITEM = {
	SLIDER: async () => {
		const day = currentDay()
		const response = await axios.get(`${URL.API}/title/schedule?days=${day}${filterURI.Slider}`)
		return response.data
	},
	HISTORY: async (code: string) => {
		const response = await axios.get(`${URL.API}/title/list?code_list=${code}${filterURI.Posts}`)
		return response.data
	},
	POST: async (code: string) => {
		const response = await axios.get(`${URL.API}/title/list?code_list=${code}${filterURI.Post}`)
		return response.data[0].player
	},
	ESPISODES: async (code: string) => {
		const response = await axios.get(`${URL.API}/title/list?code_list=${code}${filterURI.Episodes}`)
		return response.data[0].player
	},
	CATALOG: async () => {
		const response = await axios.get<{ list: ICarouselItem[] }>(
			`${URL.API}/title/updates?items_per_page=${ITEMS_PER_PAGE}${filterURI.Posts}`
		)
		return response.data.list
	},
	INFINITE_CATALOG: async ({ pageParam = 1 }) => {
		const response = await axios.get<{ list: ICarouselItem[] }>(
			`${URL.API}/title/updates?items_per_page=${ITEMS_PER_PAGE}&page=${pageParam}${filterURI.Posts}`
		)
		return { data: response.data.list, nextPage: response.data.list.length ? pageParam + 1 : null }
	}
}
