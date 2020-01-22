import { connect } from 'react-redux'
import { wordsActions } from '../ducks/word';
import Editor from './Editor';

const mapStateToProps = (state: any) => {
    return {
        selectedWord: state.editorSelectedWord
    }
}
const mapDispatchToProps = (dispatch: any) => {
    return {
        selectWord: (element: any) => {
            dispatch(wordsActions.selectWord({ element }))
        },
        updateFormatting: (formatting: any) => dispatch(wordsActions.updateFormatting({ formatting }))
    }
}
export const ConnectedEditor = connect(
    mapStateToProps,
    mapDispatchToProps
)(Editor)
