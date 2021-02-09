import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Search from './Search';

it('renders the search', () => {
  const props = {
    handleSearch: jest.fn()
  }
  render(<Search handleSearch={props.handleSearch} />);
  expect(screen.getByText('Search')).toBeInTheDocument();
});

it('submits searches', () => {
  const props = {
    handleSearch: jest.fn()
  }
  render(<Search handleSearch={props.handleSearch} />);
  let input = screen.getByTestId('input')
  fireEvent.change(input, { target: { value: 'foo' } })
  fireEvent.click(screen.getByText('Search'))
  expect(props.handleSearch).toHaveBeenCalledTimes(1);
});
