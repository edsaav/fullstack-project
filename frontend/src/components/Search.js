import React, { useState } from 'react';
import styled from 'styled-components';

// --- Styles --- //

const SearchForm = styled.form`
  background-color: #f1f1f1;
  border-radius: .5rem;
  border: 1px solid #e5e5e5;
  height: 3rem;
  margin: 2rem auto 2rem;
  padding: 1rem;
  width: max-content;
`

const Input = styled.input`
  border-radius: .5rem;
  border: 1px solid hsl(0, 0%, 80%);
  color: #2c2c2c;
  font-size: 1rem;
  grid-column: 2;
  grid-row: 2;
  height: 100%;
  margin-right: 1rem;
  outline: none;
  padding: 0 1rem;

  &:hover {
    border: 1px solid #b3b3b3;
  }

  &:focus {
    border: 1px solid #2c7be5;
    box-shadow: 0 0 0 1px #2684ff;
  }
`

const Button = styled.button`
  background-color: #2c7be5;
  border-radius: .5rem;
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  grid-column: 4;
  grid-row: 2;
  height: 100%;
  padding: 0 2rem;

  &:hover {
    background-color: #1a68d1;
    transition: background-color .1s ease;
  }

  &:active {
    background-color: #134c97;
  }
`

// --- Component --- //

const Search = ({ handleSearch }) => {
  const [search, setSearch] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    handleSearch({ query: search});
  }

  return (
    <SearchForm onSubmit={handleSearchSubmit} key='searchForm'>
      <Input key='searchInput' placeholder='Search for gifs' type='text'
        data-testid='input' value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button type='submit'>Search</Button>
    </SearchForm>
  )
}

export default Search;
