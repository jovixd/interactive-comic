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

export type RequiredFlag = {
    flag: string
    flagValue: boolean
}

export type DestinationAction = {
    destinationId: string
    requiredFlag?: RequiredFlag
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
    defaultAnswer: InputAnswer,
    caption?: string
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
    signal?: {
        // allows a secondary image and new actions to be added if criteria (i.e. any flags; not implemented: swiping on a key item) is met
        requirement: RequiredFlag[]
        secondaryImage: string,
        actionData: Action[]
    }
}

export type Data = {
    pages: PageData[],
    flags: Record<string, boolean>
}
