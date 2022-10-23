interface Tile {
    blockId?: number
    frameX?: number
    frameY?: number
    blockColor?: number
    wallId?: number
    wallColor?: number
    liquidAmount?: number
    liquidType?: "water" | "lava" | "honey" | "shimmer"
    wireRed?: boolean
    wireBlue?: boolean
    wireGreen?: boolean
    wireYellow?: boolean
    slope?: "half" | "TR" | "TL" | "BR" | "BL"
    actuator?: boolean
    actuated?: boolean
    invisibleBlock?: boolean
    invisibleWall?: boolean
    fullBrightBlock?: boolean
    fullBrightWall?: boolean
}

type Section = "fileFormatHeader"
    | "header"
    | "tiles"
    | "chests"
    | "signs"
    | "NPCs"
    | "tileEntities"
    | "weightedPressurePlates"
    | "rooms"
    | "bestiary"
    | "creativePowers"
    | "footer"

export {
    Tile,
    Section
}