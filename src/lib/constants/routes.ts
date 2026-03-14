import { APP_NAME } from './app'

export type AppRoute = '/' | '/lineup'

export const ROUTES = {
	HOME: '/' as const,
	LINEUP: '/lineup' as const,
} as const

export const LINEUP_PAGE = {
	TITLE: 'Car Lineup',
	NAV_LABEL: 'Lineup',
	SUBTITLE: 'Select a manufacturer to view their lineup',
} as const

export const NAV_ITEMS: ReadonlyArray<{ route: AppRoute; label: string }> = [
	{ route: ROUTES.HOME, label: APP_NAME },
	{ route: ROUTES.LINEUP, label: LINEUP_PAGE.NAV_LABEL },
]
