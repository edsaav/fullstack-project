import React from 'react';
import { render, screen } from '@testing-library/react';
import Gif from './Gif';

it('renders the gif', () => {
  const props = {
    external_id: 'Foo',
    title: 'Bar',
    url_small: 'http://test.com/image.png'
  }
  render(
    <Gif
      external_id={props.external_id}
      title={props.title}
      url_small={props.url_small}
    />
  );
  expect(screen.getByAltText(props.title)).toBeInTheDocument();
});
