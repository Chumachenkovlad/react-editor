import { WordsActionsTypes } from './actions'
import { Dictionary, keyBy, merge, get, mapValues } from 'lodash';
import { Formatting, Nillable } from 'shared/Editor/models';
import { FORMATTINGS } from 'shared/Editor/constants/formattings';
import { applyFormatting } from 'shared/Editor/helpers/apply-formatting.func';

export interface EditorWordState {
    element: Nillable<HTMLElement>,
    formattings: Dictionary<Formatting>
}

const initialState: EditorWordState = {
    element: null,
    formattings: keyBy(FORMATTINGS, 'key')
}

export const reducer = (state: EditorWordState = initialState, action: any) => getReducerFunc(reducerFunctionsMap, action.type)(state, action)



const defaultReducersFunc = (state: any, action: any) => state;

type ReducerFunc<S = any, A = any> = (state: S, action: A) => S;

function getReducerFunc(reducersMap: Dictionary<ReducerFunc>, type: string): ReducerFunc {
    return reducersMap[type] || defaultReducersFunc
}

const reducerFunctionsMap: Record<WordsActionsTypes, ReducerFunc<EditorWordState>> = {
    [WordsActionsTypes.SelectWord]: wordSelectionReducerFunc,
    [WordsActionsTypes.UpdateWordFormatting]: formattingUpdateReducerFunc
}

function wordSelectionReducerFunc(state: EditorWordState, action: { payload: { element: HTMLElement } }) {
    const { element } = action.payload;
    const { formattings } = state;

    const updatedFormattings = mapValues(formattings, (formatting: Formatting) => ({
        ...formatting,
        value: get(element, formatting.prop)
    }))

    return { formattings: updatedFormattings, element: action.payload.element }
}

function formattingUpdateReducerFunc(state: EditorWordState, action: { payload: { formatting: Formatting } }) {
    const { formatting } = action.payload;
    applyFormatting(state.element, formatting);

    const query: Partial<EditorWordState> = {
        formattings: {
            [formatting.key]: formatting
        }
    }

    return merge({}, state, query)
}
