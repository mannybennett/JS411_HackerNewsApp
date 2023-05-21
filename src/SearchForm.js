import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SearchForm() {
  const [searchData, setSearchData] = useState([]);
  const [selectedOption, setSelectedOption] = useState('default');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      let url = '';

      if (selectedOption === 'date') {
        url = `http://hn.algolia.com/api/v1/search_by_date?query=${searchQuery}&hitsPerPage=27`;
      } else if (selectedOption === 'author') {
        url = `http://hn.algolia.com/api/v1/search?tags=story,author_${searchQuery}&hitsPerPage=27`;
      } else {
        url = `http://hn.algolia.com/api/v1/search?query=${searchQuery}&hitsPerPage=27`;
      }

      const response = await axios.get(url);
      setSearchData(response.data.hits);
    };

    fetchData();
  }, [selectedOption, searchQuery]);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDropdownChange = (e) => {
    setSelectedOption(e.target.value);
  };
  
  return (
    <div className='App'>
      <span className='SubApp'>
        <header className='header'>
          <div className='logo'>
            <img alt='logo' src='https://d1sz9gun5ag95e.cloudfront.net/packs/media/images/logo-hn-search-a822432b.png'></img>
            <div>
              <div className='site'>Search</div>
              <div className='site'>Hacker News</div>
            </div>
          </div>
          <form>
            <div>🔍</div>
            <input type='text' onChange={handleInputChange} placeholder="Search stories by title, url, or author"></input>
          </form>
          <div className='settings'>
            <div>⚙</div>
            <div>Settings</div>
          </div>
        </header>
        <span className='filtersContainer'>
          <p>Search Stories by &nbsp;</p>
          <select id="dropdown" value={selectedOption} onChange={handleDropdownChange}>
            <option value="default">Default</option>
            <option value="date">Date</option>
            <option value="author">Author</option>
          </select>
        </span>
        <main className='container'>
          {
            searchData.length ? (
              searchData.map((story, idx) => (
                <div className='story' key={idx}>
                  <div className='title'>
                    <a className='storyLink' href={story.url} rel="noreferrer" target='_blank'>{story.title}&nbsp;</a>
                    <a className='link' href={story.url} rel="noreferrer" target='_blank'>{`(${story.url})`}</a>
                  </div>
                  <div className='cardBottom'>
                    <p className='info'>{`${story.points} points`}&nbsp;|&nbsp;</p>
                    <p className='info'>{story.author}&nbsp;|&nbsp;</p>
                    <p className='info'>{`${new Date().getFullYear() - parseInt(story.created_at.slice(0, 4))} years ago`}&nbsp;|&nbsp;</p>
                    <p className='info'>{`${story.num_comments} comments`}</p>
                </div>
              </div>
            ))
          ) : <></>
          }
        </main>
        <footer>
          <p>About  •  Setting  •  Help  •  API Documentation  •  Hacker News  •  Fork/Contribute  •  Cool Apps</p>
        </footer>
      </span>
    </div>
  );
}

export default SearchForm;