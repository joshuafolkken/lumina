export const LAYOUT_FLEX_COL_FILL = 'flex min-h-0 flex-1 flex-col'
export const LAYOUT_FLEX_ROW_FILL = 'flex min-h-0 flex-1'
export const LAYOUT_FILL = 'min-h-0 flex-1'

export const SIGNAGE_PANEL_BG = 'bg-gray-900'
export const SIGNAGE_GAP_ONE_VH = 'gap-[1vh]'
export const SIGNAGE_P_ONE_VH = 'p-[1vh]'
export const TIMELINE_PANEL_CLASS = `flex h-full w-[15vw] shrink-0 flex-col ${SIGNAGE_GAP_ONE_VH} overflow-x-hidden overflow-y-auto ${SIGNAGE_PANEL_BG} ${SIGNAGE_P_ONE_VH}`

export const ORB_SIZE_CLASS = 'h-[50%] w-[50%]'
export const ORB_BLUR_CLASS = 'blur-[120px]'

export const SIGNAGE_TEXT_SMALL = 'text-[max(1.2vh,10px)]'
export const SIGNAGE_TEXT_MEDIUM = 'text-[max(1.4vh,12px)]'
export const SIGNAGE_RING_ACTIVE = 'ring-[0.3vh]'
export const SIGNAGE_FOCUS_RING = 'focus-visible:ring-[0.3vh] focus-visible:ring-white/50'
export const SIGNAGE_OVERLAY_FILL = 'pointer-events-none absolute inset-0'

export const SCROLL_FADE_OPACITY_START = 30
export const SCROLL_PANEL_SHADOW_OPACITY = 0.12

/** サムネイルのメタデータ（タイトル・再生時間）を常に表示するか。false の場合はホバー時のみ表示 */
export const SHOW_THUMBNAIL_METADATA_ALWAYS = true

export const SCROLL_LOGO_REPEAT_COUNT = 3

export const SCROLL_PANEL_HEIGHT_VH = 14
export const SCROLL_FADE_WIDTH_VH = 14
export const SCROLL_ITEM_WIDTH_VH = 16
export const SCROLL_LOGO_MAX_HEIGHT_VH = 8
export const SCROLL_DURATION_S = 32

export const LINEUP_CARD_LINK_CLASS =
	'group relative flex items-center justify-center overflow-hidden rounded-[2vmin] ' +
	'border-2 border-transparent bg-white p-[3vmin] shadow-xl transition-all duration-300 ' +
	'ease-out hover:-translate-y-1 hover:scale-[1.02] hover:border-slate-300 hover:shadow-2xl'

export const TIMELINE_IDLE_THRESHOLD_MS = 7000
export const TIMELINE_CLICK_SCROLL_DELAY_MS = 1000
export const TIMELINE_SMOOTH_SCROLL_MS = 1000
