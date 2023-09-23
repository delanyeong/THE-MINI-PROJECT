export interface LotDraw {
    date: string
    meal: string
    lots: Lot[]
}

export interface Lot {
    name: string
    restaurant: string
}

export interface DrawResponse {
	result: string
    date: string
    meal: string
}