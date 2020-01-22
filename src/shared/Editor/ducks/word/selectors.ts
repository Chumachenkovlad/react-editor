import { EditorWordState } from './reducer';
import { sortBy } from 'lodash';

const selectWordFormattings = (state: EditorWordState) => sortBy(Object.values(state.formattings), "index")
const selectWordElement = (state: EditorWordState) => state.element

export const editorWordSelectors = {
    selectWordFormattings,
    selectWordElement
}
