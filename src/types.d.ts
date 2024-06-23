/*
    Custom button colors
*/

declare module '@mui/material/styles' {
    interface Palette {
        orange: Palette['primary'];
        blue: Palette['primary'];
        pink: Palette['primary'];
        green: Palette['primary'];
        yellow: Palette['primary'];
    }

    interface PaletteOptions {
        orange?: PaletteOptions['primary'];
        blue?: PaletteOptions['primary'];
        pink?: PaletteOptions['primary'];
        green?: PaletteOptions['primary'];
        yellow?: PaletteOptions['primary'];
    }
}

declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        orange: true;
        blue: true;
        pink: true;
        green: true;
        yellow: true;
    }
}

/* 
    Player actions
*/

export type DestinationAction = {
    destinationId: string
    requiredFlag?: {
        flag: string
        flagValue: boolean
    }
    setFlag?: string
}

type ButtonAction = DestinationAction & {
    color: Palette,
    label: string,
    type: "button"
}

type InputAnswer = DestinationAction & {
    answer: string | "default"
}

export type InputAction = {
    label: string,
    type: "input",
    answers: InputAnswer[],
    defaultAnswers: InputAnswer[],
    caption?: string
}

type ImageAction = DestinationAction & {
    type: "click",
    rectShape: string
}

type EndAction = {
    label: string,
    type: "end"
}

type Action = ButtonAction | InputAction | EndAction

export type PageData = {
    id: string,
    image: string,
    actionData: Action[]
}

export type Data = {
    pages: PageData[],
    flags: Record<string, boolean>
}
