export interface BrandLogo {
	name: string
	src: string
	url: string
	invert?: boolean
	scale?: number
}

export const BRAND_LOGOS = [
	{ name: 'Toyota', src: '/logo/toyota.jpg', url: 'https://toyota.jp/', scale: 0.9 },
	{
		name: 'Honda',
		src: '/logo/honda.jpg',
		url: 'https://www.honda.co.jp/',
		invert: true,
		scale: 1.3,
	},
	{ name: 'Nissan', src: '/logo/nissan.png', url: 'https://www.nissan.co.jp/', scale: 0.85 },
	{ name: 'Mazda', src: '/logo/mazda.jpeg', url: 'https://www.mazda.co.jp/', scale: 1.1 },
	{ name: 'Mitsubishi', src: '/logo/mitsubishi.png', url: 'https://www.mitsubishi-motors.co.jp/' },
	{ name: 'Subaru', src: '/logo/subaru.jpg', url: 'https://www.subaru.jp/', scale: 0.9 },
	{ name: 'Suzuki', src: '/logo/suzuki.jpg', url: 'https://www.suzuki.co.jp/' },
	{ name: 'Daihatsu', src: '/logo/daihatsu.png', url: 'https://www.daihatsu.co.jp/', scale: 1.1 },
] as const satisfies ReadonlyArray<BrandLogo>
