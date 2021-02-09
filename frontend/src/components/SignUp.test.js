import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SignUp from './SignUp';

it('renders the login form', () => {
  const props = {
    close: jest.fn()
  }
  render(<SignUp close={props.close} />);
  expect(screen.getByText('Sign Up')).toBeInTheDocument();
  expect(screen.getByText('Cancel')).toBeInTheDocument();
});

it('can be closed', () => {
  const props = {
    close: jest.fn()
  }
  render(<SignUp close={props.close} />);
  fireEvent.click(screen.getByText('Cancel'))
  expect(props.close).toHaveBeenCalledTimes(1);
});
