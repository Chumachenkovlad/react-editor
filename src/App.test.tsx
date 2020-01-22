import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import { store } from 'shared/store';


describe('<App />', () => {
  let app: RenderResult;
  beforeAll(() => {
    app = render(<Provider store={store}><App /></Provider>);
  })

  test('should be defined', () => {
    expect(app).toBeDefined();
  });
})


