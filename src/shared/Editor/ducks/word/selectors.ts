import { EditorWordState } from './reducer';
import { sortBy } from 'lodash';



export const selectWordFormattings = (state: EditorWordState) => sortBy(Object.values(state.formattings), "index")
export const selectWordElement = (state: EditorWordState) => state.element
