import React from 'react';
import { render, screen, cleanup } from '@testing-library/react'
import { ResultList } from '../ResultList/ResultList'


test('componenet should be present in document', () => {
  render(<ResultList />);
  const myElement = screen.getByTestId('result-list-id');
  expect(myElement).toBeInTheDocument();
})


