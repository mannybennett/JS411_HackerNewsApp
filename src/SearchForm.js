import React, { useState } from 'react';
import axios from 'axios';

function SearchForm() {
  const [searchData, setSearchData] = useState([]);

  const handleChange = async (e) => {
    const stories = await axios.get(`http://hn.algolia.com/api/v1/search?query=${e.target.value}`)
    console.log(stories.data.hits)
    !e.target.value.length ? setSearchData([]) : setSearchData(stories.data.hits)
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
            <input type='text' onChange={handleChange}></input>
          </form>
          <div>Settings</div>
        </header>
        <span className='filtersContainer'>
          <div>Search</div>
        </span>
        <main className='container'>
          {
            searchData.length ? (
              searchData.map((story, idx) => (
                <div className='story' key={idx}>
                  <div className='cardTop'>
                    <p className='title'>{story.title}</p>
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
      </span>
    </div>
  );
}

export default SearchForm;