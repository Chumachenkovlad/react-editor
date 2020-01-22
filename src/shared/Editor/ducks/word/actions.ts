import { Formatting } from 'shared/Editor/models'

export enum WordsActionsTypes {
    SelectWord = "[Editor] select word",
    UpdateWordFormatting = "[Edittor] update word formatting"
}

const updateFormatting = (payload: {
    formatting: Formatting
}) => ({
    type: WordsActionsTypes.UpdateWordFormatting,
    payload
})

const selectWord = (payload: {
    element: HTMLElement
}) => ({
    type: WordsActionsTypes.SelectWord,
    payload
})

export const wordsActions = {
    updateFormatting,
    selectWord
}
