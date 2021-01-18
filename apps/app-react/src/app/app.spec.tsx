import * as React from 'react';
import { render, cleanup, queryByTestId } from '@testing-library/react';
import { BsmCard, BsmLoadingSpinner } from '@bsmp/webcomponents-react';
import { App } from './app';

describe('App', () => {
  afterEach(cleanup);

  it('should render Aoo component successfully', () => {
    const { baseElement } = render(<App />);
    expect(baseElement).toBeTruthy();
    // expect(baseElement.contains(<BsmLoadingSpinner />)).toBe(true)
    // expect(queryByTestId('spinner')).toBeTruthy();
  });

  it('should render @bsmp/webcomponents-react component successfully', () => {
    const { baseElement } = render(<BsmCard />);
    expect(baseElement).toBeTruthy();
    // expect(baseElement.innerText).toContain('<bsm-card');
    // expect(baseElement.find('bsm-slider').exists()).toBeTruthy()
  });

});

