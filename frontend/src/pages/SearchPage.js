import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import api from '../services/api'
import Search from '../components/Search';
import GifsList from '../components/GifsList';

const SearchPage = ({ notify, success }) => {
  const [results, setResults] = useState([]);
  
  const [cookies,] = useCookies(['auth']);

  useEffect(() => {
    document.title = 'GifyWell | Home';
  }, [])

  const handleSearch = async (query) => {
    const params = new URLSearchParams(query);
    const url = `/gifs/search?${params}`
    try {
      const response = await api.get(url);
      setResults(response.data);
    } catch(error) {
      notify('There was an error with your search');
    }
  }

  return (
    <>
      <Search handleSearch={handleSearch} />
      <div>
        <GifsList gifs={results} favoritable={!!cookies.auth}
          notify={notify} success={success}
        />
      </div>
    </>
  )
}

export default SearchPage;
