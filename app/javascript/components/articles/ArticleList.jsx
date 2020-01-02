import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux'
import { Link } from 'react-router-dom';
import {addArticle, allArticles} from '../../actions/articles';

function ArticleList(data) {
  const [articles, setArticle] = useState([])

  useEffect(() => {
    fetch('api/articles')
      .then(response => response.json())
      .then(data => {
        setArticle(data)
      })
  }, [data])

  return (
    <div>
      {
        articles.map((article) => {
          return(
            <div key={article.id}>
              <h2><Link to={`/articles/${article.id}`}>{article.title}</Link></h2>
              {article.content}
              <hr/>
            </div>
          );
        })
      }
      <Link to="/articles/new" className="btn btn-outline-primary">Create Article</Link> 
      <button onClick={() => addArticle('Hola', 'Holi')} className="btn btn-outline-primary">Create Article</button>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    articles: state.articlesReducer.articles
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addArticle: (title, content) => dispatch(addArticle(title, content)),
    listArticles: () => dispatch(allArticles())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);