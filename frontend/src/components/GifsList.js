import React from 'react';
import styled from 'styled-components';
import Gif from './Gif'

// --- Styles --- //

const GifList = styled.ul`
  align-content: flex-start;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  justify-content: flex-start;
  padding: 0 2rem;
`

// -- Component --- //

const GifsList = ({ gifs, favoritable, notify=null, success=null }) => {
  return (
    <GifList>
      {gifs.map(gif => (
        <Gif
          external_id={gif.external_id}
          url_small={gif.url_small}
          title={gif.title}
          key={gif.external_id}
          favoritable={favoritable}
          notify={notify}
          success={success}
        />
      ))}
    </GifList>
  )
}

export default GifsList;
