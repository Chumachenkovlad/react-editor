

import React from "react";
import { EDITABLE_CLASS } from 'shared/Editor/constants/constants';
import { RenderResult, render, fireEvent } from '@testing-library/react';
import Editor, { IEditorState } from '../Editor';
import { FORMATTINGS } from "../../constants/formattings";

const getElement = () => {
  const el = document.createElement('span');
  el.classList.add(EDITABLE_CLASS);
  return el
}

describe('<Editor>', () => {
  const selectedWord = {
    element: getElement(),
    formattings: FORMATTINGS
  }
  const htmlContent = 'some text';
  const updateContentSpy = jest.fn();
  const selectWordSpy = jest.fn();
  const updateFormattingSpy = jest.fn();
  let renderResult: RenderResult;

  const props: IEditorState = {
    htmlContent,
    selectedWord: selectedWord,
    updateContent: updateContentSpy,
    selectWord: selectWordSpy,
    updateFormatting: updateFormattingSpy
  }

  beforeEach(() => {
    renderResult = render(<Editor {...props} />)
  })

  test('should be rendered', () => {
    expect(renderResult.container).toMatchSnapshot();
  })

  test('click on toggler button should updateFormatting', () => {
    const index = 0;
    const formatting = FORMATTINGS[index];
    const togglerBtn = renderResult.container.querySelectorAll('button')[index];
    fireEvent.click(togglerBtn);
    expect(updateFormattingSpy).toHaveBeenCalledWith({
      ...formatting,
      value: formatting.appliedValue
    });

    expect(updateContentSpy).toHaveBeenCalledWith(htmlContent);
  })

})
