export interface LotDraw {
    date: string
    meal: string
    lots: Lot[]
}

export interface Lot {
    name: string
    restaurant: string
}