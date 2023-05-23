import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import SearchForm from './SearchForm';
import ListArticles from './ListArticles';

function App() {
  const [searchData, setSearchData] = useState([]);
  const [selectedOption, setSelectedOption] = useState('default');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      let url = '';

      if (selectedOption === 'date') {
        url = `https://hn.algolia.com/api/v1/search_by_date?query=${searchQuery}&hitsPerPage=27`;
      } else if (selectedOption === 'author') {
        url = `https://hn.algolia.com/api/v1/search?tags=story,author_${searchQuery}&hitsPerPage=27`;
      } else {
        url = `https://hn.algolia.com/api/v1/search?query=${searchQuery}&hitsPerPage=27`;
      }

      const response = await axios.get(url);
      setSearchData(response.data.hits);
    };

    fetchData();
  }, [selectedOption, searchQuery]);

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDropdownMenuChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div className="App">
      <div className='SubApp'>
        <SearchForm handleInputChange={handleSearchInputChange} handleDropdownChange={handleDropdownMenuChange} />
        <ListArticles articles={searchData} />
      </div>
      
      <footer>
        <p>About  •  Setting  •  Help  •  API Documentation  •  Hacker News  •  Fork/Contribute  •  Cool Apps</p>
      </footer>
    </div>
  );
}

export default App;