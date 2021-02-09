import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import Header from './Header';

it('renders the header', () => {
  const props = {
    login: jest.fn()
  }
  render(<Router><Header login={props.login} /></Router>);
  expect(screen.getByText('Search')).toBeInTheDocument();
});

it('can trigger the login form', () => {
  const props = {
    login: jest.fn()
  }
  render(<Router><Header login={props.login} /></Router>);
  fireEvent.click(screen.getByText('Log In'))
  expect(props.login).toHaveBeenCalledTimes(1);
});
