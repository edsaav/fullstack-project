import React, { useState, useEffect } from 'react';
import Search from '../components/Search';
import GifsList from '../components/GifsList';
import api from '../services/api'

const FavoritesPage = ({ notify }) => {
  const [favorites, setFavorites] = useState([]);
  const [search, setSearch] = useState({});

  useEffect(() => {
    document.title = 'GifyWell | Favorites';
  }, [])

  useEffect(() => {
    const fetchFavorites = async (query) => {
      let url = `/gifs`;
      if (query) url = url.concat(`?${new URLSearchParams(query)}`);
      try {
        const response = await api.get(url);
        setFavorites(response.data)
      } catch {
        notify('There was an error with your search');
      }
    }
    fetchFavorites(search);
  }, [search, notify])

  
  return (
    <>
      <Search handleSearch={(q) => setSearch(q)} />
      <GifsList gifs={favorites} favoritable={false} />
    </>
  )
}

export default FavoritesPage;
