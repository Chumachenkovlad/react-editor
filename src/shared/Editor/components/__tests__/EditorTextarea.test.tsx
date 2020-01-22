import { render, RenderResult } from '@testing-library/react';
import EditorTextarea from '../EditorTextarea';
import React from "react";

const TEXT = "some extra text";
describe('<EditorTextarea>', () => {
    let EditorTextareaRR: RenderResult;
    beforeEach(() => {
        EditorTextareaRR = render(<EditorTextarea selectWord={() => { }} children={<div>{TEXT}</div>} />)
    });

    test('should be defined', () => {
        expect(EditorTextareaRR.container).toMatchSnapshot();
    });

    test('should includes defined text', () => {
        expect(EditorTextareaRR.getByText(TEXT)).toBeInTheDocument();
    });
})
