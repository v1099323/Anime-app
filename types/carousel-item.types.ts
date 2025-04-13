export interface ICarouselItem {
	id: number
	code: string
	names: {
		ru: string
		en: string
		alternative: string | null
	}
	franchises: {
		franchise: {
			id: string
			name: string
		}
	}[]
	releases: {
		id: number
		code: string
		ordinal: number
		names: {
			ru: string
			en: string
			alternative: string | null
		}
	}[]
	announce: null
	status: {
		string: string
		code: number
	}
	posters: {
		small: {
			url: string
			raw_base64_file: null
		}
		medium: {
			url: string
			raw_base64_file: null
		}
		original: {
			url: string
			raw_base64_file: null
		}
	}
	updated: number
	last_change: number
	type: {
		full_string: string
		code: number
		string: string
		episodes: number
		length: number
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
		code: number
	}
	year: number
	week_day: number
	description: string
	in_favorites: number
	blocked: {
		copyrights: boolean
		geoip: boolean
		geoip_list: string[]
	}
	player: {
		alternative_player: null
		host: string
		is_rutube: boolean
	}
	episodes: {
		first: number
		last: number
		string: string
		list: {
			[key: string]: unknown // Здесь можно уточнить структуру, если она известна
		}
	}
	rutube: object
	torrents: {
		episodes: {
			first: number
			last: number
			string: string
		}
		list: {
			torrent_id: number
			episodes: {
				first: number
				last: number
				string: string
			}
			quality: {
				string: string
				type: string
				resolution: string
				encoder: string
			}
			lq_audio: null
			leechers: number
			seeders: number
			downloads: number
			total_size: number
			size_string: string
			url: string
			magnet: string
			uploaded_timestamp: number
			hash: string
			metadata: null
			raw_base64_file: null
		}[]
	}
}

export interface ICarouselItemList {
	list?: [ICarouselItem] | []

	pagination: {
		pages: number
		current_page: number
		items_per_page: number
		total_items: number
	}
}
