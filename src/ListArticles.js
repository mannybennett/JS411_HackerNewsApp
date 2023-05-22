import React from 'react';
import DisplayArticleCard from './DisplayArticleCard';

function ListArticles({ articles }) {
  return (
    <div className="container">
      {articles.map((article, index) => (
        <DisplayArticleCard key={index} article={article} />
      ))}
    </div>
  );
}

export default ListArticles;