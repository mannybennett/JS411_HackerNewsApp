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
    <div>
      <header className='header'>
        <div>
          
        </div>
        <form>
          <input type='text' onChange={handleChange}></input>
        </form>
      </header>
      <main className='container'>
        {
          searchData.length ? (
            searchData.map((story, idx) => (
              <div key={idx}>
              <div className='cardTop'>
                <h4>{story.title}</h4>
                <a href={story.url} rel="noreferrer" target='_blank'>{`(${story.url})`}</a>
              </div>
              <div className='cardBottom'>
                <p>{`${story.points} points`}&nbsp;|&nbsp;</p>
                <p>{story.author}&nbsp;|&nbsp;</p>
                <p>{`${new Date().getFullYear() - parseInt(story.created_at.slice(0, 4))} years ago`}&nbsp;|&nbsp;</p>
                <p>{`${story.num_comments} comments`}</p>
              </div>
            </div>
          ))
        ) : <></>
        }
      </main>
    </div>
  );
}

export default SearchForm;