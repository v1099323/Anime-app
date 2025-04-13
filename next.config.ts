import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		// domains: ['www.anilibria.tv'], // Разрешаем изображения с этого домена
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'www.anilibria.tv',
				port: '',
				pathname: '/**'
			}
		]
	}
}

export default nextConfig
