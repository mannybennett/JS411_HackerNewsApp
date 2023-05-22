import React from 'react';

function DisplayArticleCard({ article }) {
  return (
    <div className="story">
      <div className="title">
        <a className="storyLink" href={article.url} rel="noreferrer" target="_blank">
          {article.title}&nbsp;
        </a>
        <a className="link" href={article.url} rel="noreferrer" target="_blank">
          ({article.url})
        </a>
      </div>
      <div className="cardBottom">
        <p className="info">{`${article.points} points`}&nbsp;|&nbsp;</p>
        <p className="info">{article.author}&nbsp;|&nbsp;</p>
        <p className="info">{`${new Date().getFullYear() - parseInt(article.created_at.slice(0, 4))} years ago`}&nbsp;|&nbsp;</p>
        <p className="info">{`${article.num_comments} comments`}</p>
      </div>
    </div>
  );
}

export default DisplayArticleCard;