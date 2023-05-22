import React from 'react';

function SearchForm({ handleInputChange, handleDropdownChange }) {
  return (
    <>
      <div className="header">
        <div className="logo">
          <img alt="logo" src="https://d1sz9gun5ag95e.cloudfront.net/packs/media/images/logo-hn-search-a822432b.png"></img>
          <div>
            <div className="site">Search</div>
            <div className="site">Hacker News</div>
          </div>
        </div>
        <form>
          <div>🔍</div>
          <input type="text" onChange={handleInputChange} placeholder="Search stories by title, url, or author"></input>
        </form>
        <div className="settings">
          <div>⚙</div>
          <div>Settings</div>
        </div>
      </div>
      <span className="filtersContainer">
        <p>Search Stories by &nbsp;</p>
        <select id="dropdown" onChange={handleDropdownChange}>
          <option value="default">Default</option>
          <option value="date">Date</option>
          <option value="author">Author</option>
        </select>
      </span>
    </>
  );
}

export default SearchForm;