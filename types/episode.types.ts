export interface IEpisode {
	episode: number
	name: string
	uuid: string
	created_timestamp: number
	preview: string
	hls: {
		fhd: string
		hd: string
		sd: string
	}
	skips?: {
		opening?: number[]
		ending?: number[]
	}
}
