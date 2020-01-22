import { render, RenderResult, fireEvent } from '@testing-library/react';
import React from "react";
import EditorToolbar from '../EditorToolbar';
import { EDITABLE_CLASS } from 'shared/Editor/constants/constants';
import { FORMATTINGS, isTogglerFormatting } from 'shared/Editor/constants/formattings';

const getElement = () => {
  const element = document.createElement('span');
  element.classList.add(EDITABLE_CLASS);
  return element;
}

const selectedWordStub = {
  element: getElement(),
  formattings: FORMATTINGS
}

describe('<EditorToolbar>', () => {
  let changeWordFormattingSpy = jest.fn(() => { });
  let renderResult: RenderResult;
  beforeEach(() => {
    renderResult = render(<EditorToolbar selectedWord={selectedWordStub} changeWordFormatting={changeWordFormattingSpy} />)
  });

  test('should be rendered', () => {
    expect(renderResult.container).toMatchSnapshot();
  })

  test('formattings should not be applied by default', () => {
    const el = renderResult.container.getElementsByClassName('MuiButton-contained');
    expect(el).toHaveLength(0);
  })

  test('toggler button should emit formatting with applied value', () => {
    const togglerIndex = FORMATTINGS.findIndex(isTogglerFormatting);
    const formatting = FORMATTINGS[togglerIndex];
    const formattingAfterApplying = {
      ...formatting,
      value: formatting.appliedValue
    }
    const togglerButton = renderResult.container.querySelectorAll('button')[togglerIndex];
    fireEvent.click(togglerButton);
    expect(changeWordFormattingSpy).toHaveBeenCalledWith(formattingAfterApplying);
  });

  test('fontSize toggler should open dialog with input', () => {
    const togglerIndex = FORMATTINGS.findIndex(({ key }) => key === "fontSize");
    const togglerButton = renderResult.container.querySelectorAll('button')[togglerIndex];
    fireEvent.click(togglerButton);
    const inputEl = document.querySelector('.MuiDialog-root input') as HTMLInputElement;
    expect(inputEl).toBeDefined();
    const val = 'test';
    inputEl.value = val;
    fireEvent.keyPress(inputEl, {
      key: 'Enter',
      keyCode: 13,
    });
    expect(changeWordFormattingSpy).toHaveBeenCalledWith({
      ...FORMATTINGS[togglerIndex],
      value: val
    });
  })

})
