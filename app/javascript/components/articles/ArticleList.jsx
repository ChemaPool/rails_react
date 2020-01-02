import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux'
import { Link } from 'react-router-dom';
import {addArticle, allArticles} from '../../actions/articles';
import ArticlesApi from '../../api/articlesApi';

function ArticleList(props) {
  const [articles, setArticle] = useState([]);

  useEffect(() => {
    props.listArticles();
    ArticlesApi.getArticles()
    .then(data => {
      setArticle(data)
    })
  }, []);

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
      <Link to="/articles/new" className="btn btn-outline-primary">New Article</Link>
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