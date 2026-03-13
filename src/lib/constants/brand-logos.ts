export interface BrandLogo {
	name: string
	src: string
	url: string
	lineup_url?: string
	invert?: boolean
	scale?: number
}

export const BRAND_LOGOS = [
	{
		name: 'Toyota',
		src: '/logo/toyota.jpg',
		url: 'https://toyota.jp/',
		lineup_url: 'https://toyota.jp/carlineup/',
		scale: 0.9,
	},
	{
		name: 'Honda',
		src: '/logo/honda.jpg',
		url: 'https://www.honda.co.jp/',
		lineup_url: 'https://www.honda.co.jp/auto-lineup/',
		invert: true,
		scale: 1.3,
	},
	{
		name: 'Nissan',
		src: '/logo/nissan.png',
		url: 'https://www.nissan.co.jp/',
		lineup_url: 'https://www.nissan.co.jp/CARLINEUP/',
		scale: 0.85,
	},
	{
		name: 'Mazda',
		src: '/logo/mazda.jpeg',
		url: 'https://www.mazda.co.jp/',
		lineup_url: 'https://www.mazda.co.jp/cars/',
		scale: 1.1,
	},
	{
		name: 'Mitsubishi',
		src: '/logo/mitsubishi.png',
		url: 'https://www.mitsubishi-motors.co.jp/',
		lineup_url: 'https://www.mitsubishi-motors.co.jp/lineup/',
	},
	{
		name: 'Subaru',
		src: '/logo/subaru.jpg',
		url: 'https://www.subaru.jp/',
		lineup_url: 'https://www.subaru.jp/carlineup/',
		scale: 0.9,
	},
	{
		name: 'Suzuki',
		src: '/logo/suzuki.jpg',
		url: 'https://www.suzuki.co.jp/',
		lineup_url: 'https://www.suzuki.co.jp/car/lineup/',
	},
	{
		name: 'Daihatsu',
		src: '/logo/daihatsu.png',
		url: 'https://www.daihatsu.co.jp/',
		lineup_url: 'https://www.daihatsu.co.jp/lineup/',
		scale: 1.1,
	},
] as const satisfies ReadonlyArray<BrandLogo>
