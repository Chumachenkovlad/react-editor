import React from 'react'
import { EditorWidgetFactory } from '../EditorWidgetFactory'
import { EditorWidgets } from '../widget.model'
import { InputWidget } from '../InputWidget'
import { ColorPickerWidget } from '../ColorPickerWidget'
import { SynonymsPickerWidget } from '../SynonymsPickerWidget'

const WIDGET_PROPS = { selectedValue: 'test', handleValueSelection: (val: any) => val }

describe('<EditorWidgetFactory>', () => {
  test('should return input widget', () => {
    expect(EditorWidgetFactory(EditorWidgets.Input, WIDGET_PROPS)).toEqual(<InputWidget handleValueSelection={WIDGET_PROPS.handleValueSelection} selectedValue={WIDGET_PROPS.selectedValue} />)
  })

  test('should return color picker widget', () => {
    expect(EditorWidgetFactory(EditorWidgets.ColorPicker, WIDGET_PROPS)).toEqual(<ColorPickerWidget handleValueSelection={WIDGET_PROPS.handleValueSelection} selectedValue={WIDGET_PROPS.selectedValue} />)
  })

  test('should return synonyms widget', () => {
    expect(EditorWidgetFactory(EditorWidgets.SynonymsPicker, WIDGET_PROPS)).toEqual(<SynonymsPickerWidget handleValueSelection={WIDGET_PROPS.handleValueSelection} selectedValue={WIDGET_PROPS.selectedValue} />)
  })
})
