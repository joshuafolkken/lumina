const LOGO_BASE_PATH = '/logo'

export interface BrandLogo {
	name: string
	src: string
	url: string
	lineup_url?: string
	invert?: boolean
	scale?: number
	lineup_scale?: number
}

export const BRAND_LOGOS = [
	{
		name: 'Toyota',
		src: `${LOGO_BASE_PATH}/toyota.jpg`,
		url: 'https://toyota.jp/',
		lineup_url: 'https://toyota.jp/carlineup/',
		scale: 0.9,
		lineup_scale: 0.9,
	},
	{
		name: 'Honda',
		src: `${LOGO_BASE_PATH}/honda.jpg`,
		url: 'https://www.honda.co.jp/',
		lineup_url: 'https://www.honda.co.jp/auto-lineup/',
		invert: true,
		scale: 1.4,
		lineup_scale: 1.5,
	},
	{
		name: 'Nissan',
		src: `${LOGO_BASE_PATH}/nissan.png`,
		url: 'https://www.nissan.co.jp/',
		lineup_url: 'https://www.nissan.co.jp/CARLINEUP/',
		scale: 0.85,
		lineup_scale: 0.85,
	},
	{
		name: 'Mazda',
		src: `${LOGO_BASE_PATH}/mazda.jpeg`,
		url: 'https://www.mazda.co.jp/',
		lineup_url: 'https://www.mazda.co.jp/cars/',
		scale: 1.1,
		lineup_scale: 1.1,
	},
	{
		name: 'Mitsubishi',
		src: `${LOGO_BASE_PATH}/mitsubishi.png`,
		url: 'https://www.mitsubishi-motors.co.jp/',
		lineup_url: 'https://www.mitsubishi-motors.co.jp/lineup/',
		scale: 1,
		lineup_scale: 0.9,
	},
	{
		name: 'Subaru',
		src: `${LOGO_BASE_PATH}/subaru.jpg`,
		url: 'https://www.subaru.jp/',
		lineup_url: 'https://www.subaru.jp/carlineup/',
		scale: 0.9,
		lineup_scale: 1,
	},
	{
		name: 'Suzuki',
		src: `${LOGO_BASE_PATH}/suzuki.jpg`,
		url: 'https://www.suzuki.co.jp/',
		lineup_url: 'https://www.suzuki.co.jp/car/lineup/',
		scale: 1,
		lineup_scale: 1.2,
	},
	{
		name: 'Daihatsu',
		src: `${LOGO_BASE_PATH}/daihatsu.png`,
		url: 'https://www.daihatsu.co.jp/',
		lineup_url: 'https://www.daihatsu.co.jp/lineup/',
		scale: 1.1,
		lineup_scale: 1.3,
	},
] as const satisfies ReadonlyArray<BrandLogo>
