import React from 'react';
import { render, screen } from '@testing-library/react';
import GifsList from './GifsList';

it('renders the gif list', () => {
  const props = {
    gifs: [
      {
        external_id: 'Foo',
        title: 'Bar',
        url_small: 'http://test.com/image.png'
      }
    ]
  }
  render(
    <GifsList gifs={props.gifs} />
  );
  expect(screen.getByAltText(props.gifs[0].title)).toBeInTheDocument();
});
