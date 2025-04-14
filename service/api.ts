import axios from 'axios'

import { URL } from './urls'

export const api = axios.create({
	baseURL: URL.API,
	timeout: 10000,
	headers: {
		'Content-Type': 'application/json'
	}
})
