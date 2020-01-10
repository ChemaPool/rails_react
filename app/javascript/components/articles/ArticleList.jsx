import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { addArticle, allArticles } from '../../actions/articles';
import ArticlesApi from '../../api/articlesApi';

function ArticleList(props) {
  const [articles, setArticle] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [articlePerPage, setPerPage] = useState(3);
  const listNumbers = [];

  useEffect(() => {
    props.listArticles();
    ArticlesApi.getArticles()
    .then(data => {
      setArticle(data)
    })
  }, []);

  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  }

  const indexOfLastArticle = currentPage * articlePerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlePerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

  const renderArticles = currentArticles.map((article) => {
    return(
      <div key={article.id}>
        <h2><Link to={`/articles/${article.id}`}>{article.title}</Link></h2>
        {article.content}
        <hr/>
      </div>
    );
  })

  for (let i = 1; i <= Math.ceil(articles.length / articlePerPage); i++) {
    listNumbers.push(i);
  }

  const pageNumbers = listNumbers.map(number => {
    return (
      <li className="page-item" key={number}>
        <a className="page-link" id={number} onClick={handleClick}>{number}</a>
      </li>
    );
  });

  return (
    <div>
      {renderArticles}
      <Link to="/articles/new" className="btn btn-outline-primary">New Article</Link>
      <nav>
        <ul id="page-numbers" className="pagination justify-content-center">
          {pageNumbers}
        </ul>
      </nav>
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