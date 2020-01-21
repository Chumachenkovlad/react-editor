import { combineReducers } from "redux";
import { editorWordsReducer } from 'shared/Editor/ducks/word';

export const rootReducer = combineReducers({
    editorSelectedWord: editorWordsReducer
});
