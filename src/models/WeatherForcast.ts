export interface ForcastResponse {
	current: Current
	daily: Daily[]
	timezone: string
}

export interface Current {
	dt: number;
	temp: { day: number }
	weather: Weather[]
}

export interface Daily {
	dt: number;
	temp: { day: number }
	weather: Weather[]
}

interface Weather {
	id: number
	main: string
	icon: string
}

export interface GeoLocation {
	name?: string
	country?: string
	lat?: number
	lon?: number
}