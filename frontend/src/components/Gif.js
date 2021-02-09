import React, { useState } from 'react';
import api from '../services/api'
import styled from 'styled-components';

// --- Styles --- //

const ImgWrapper = styled.div`
  border-radius: 5px;
  border: 1px solid lightgrey;
  box-shadow: 1px 1px 2px rgba(173, 173, 173, 1);
  height: 200px;
  margin: 10px;
  padding: 10px;
  position: relative;
`

const Button = styled.button`
  background-color: rgba(255, 255, 255, .5);
  border-radius: 5px;
  border: 1px solid #2c7be5;
  color: #2c7be5;
  cursor: pointer;
  font-size: 12px;
  padding: 5px;
  position: absolute;
  right: 15px;
  top: 15px;

  &:hover {
    background-color: #2c7be5;
    color: white;
  }
`

// --- Component --- //

const Gif = ({ external_id, url_small, title, favoritable, notify, success }) => {
  const [loading, setLoading] = useState(true);
  const [favorited, setFavorited] = useState(false);

  const handleFavorite = async () => {
    const url = '/gifs/favorite';
    const data = { external_id: external_id, url_small: url_small, title: title };
    try {
      handleResponse(await api.post(url, data));
    } catch(err) {
      notify('Sorry, there was an error favoriting that gif')
    }
  }

  const handleResponse = (res) => {
    if (!!res.data) {
      success('Added to favorites!');
    } else {
      notify('That gif is already a favorite!')
    }
    setFavorited(true);
  }

  return (
    <ImgWrapper style={{ display: `${loading ? 'none' : 'block'}`}}>
      <img src={url_small} alt={title} onLoad={() => setLoading(false)} />
      {favoritable && !favorited && <Button onClick={() => handleFavorite()}>Favorite</Button>}
    </ImgWrapper>
  )
}

export default Gif;
