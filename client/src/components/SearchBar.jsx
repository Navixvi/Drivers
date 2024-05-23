import React, { useState } from 'react';
import axios from 'axios';

const SearchBar = ({ setDrivers }) => {
  const [name, setName] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/name?name=${name}`);
      setDrivers(response.data);
    } catch (error) {
      console.error('Error fetching drivers by name:', error);
    }
  };

  return (
    <div>
      <input 
        type="text" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="Search drivers by name" 
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;

