/*
    Custom button colors
*/

declare module '@mui/material/styles' {
    interface Palette {
        orange: Palette['primary'];
        blue: Palette['primary'];
        pink: Palette['primary'];
        green: Palette['primary'];
    }

    interface PaletteOptions {
        orange?: PaletteOptions['primary'];
        blue?: PaletteOptions['primary'];
        pink?: PaletteOptions['primary'];
        green?: PaletteOptions['primary'];
    }
}

declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        orange: true;
        blue: true;
        pink: true;
        green: true;
    }
}

/* 
    Player actions
*/

export type EndAction = {
    label: string,
    type: "end"
}

// TODO: can we type the (not-)required flag & flag to set stronger?
type DestinationAction = {
    destinationId: string
    requiredFlagSet?: string
    requiredFlagUnset?: string
    setFlag?: string
}

export type ButtonAction = DestinationAction & {
    color: string,
    label: string,
    type: "button"
}

export type InputAction = {
    label: string,
    type: "input",
    answers: (DestinationAction & {
        answer: "default" | string
    })[]
}

type Action = ButtonAction | InputAction

export type PageData = {
    id: string,
    image: string,
    actionData: Action[] | EndAction[]
}
