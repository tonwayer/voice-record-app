import React from 'react';
import { render, screen } from '@testing-library/react';
import { Home } from './home';

describe('Home', () => {

  test('displays contents.', () => {
    render(<Home />);

    expect(
      screen.getByText('Start')
    ).toBeInTheDocument()

    expect(
      screen.getByText('Stop')
    ).toBeInTheDocument()
  });
})
