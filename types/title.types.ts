import { IEpisode } from './episode.types'

export interface TitleData {
	id: number
	code: string
	names: {
		ru: string
		en: string
		alternative: string | null
	}
	posters: {
		original: {
			url: string
		}
	}
	description: string
	updated: number
	status: {
		string: string
	}
	type: {
		full_string: string
	}
	genres: string[]
	team: {
		voice: string[]
		translator: string[]
		editing: string[]
		decor: string[]
		timing: string[]
	}
	season: {
		string: string
		year: number
	}
	player: {
		list: IEpisode[]
		host: string
		episodes: {
			string: number
		}
	}
	in_favorites: number
	blocked: {
		copyrights: boolean
		geoip: boolean
	}
}
