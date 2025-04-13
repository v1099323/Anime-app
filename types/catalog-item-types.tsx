export interface ICatalogItem {
	code: string
	names: {
		ru: string
		en: string
		alternative: string | null
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
	type: {
		full_string: string
		code: number
		string: string
		episodes: number
		length: number
	}
	genres: string[]
	description: string
}
