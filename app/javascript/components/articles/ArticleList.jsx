import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { addArticle, allArticles } from '../../actions/articles';
import ArticlesApi from '../../api/articlesApi';
import Styled from "styled-components";

const Text = Styled.label``;

const OptionNumber = Styled.div`
  width: auto;
  color: ${props => props.textColor || 'black'};
  padding: 5px 10px;
  border: solid 1px #e2e2e2;
  background-color: ${props => props.color || 'white'};
  &:hover {
    color: white;
    cursor: pointer;
    background-color: #007bff;
  }
`;

const Radio = Styled.input`
  visibility: hidden;
  position: absolute;
  &:hover{
    cursor: pointer;
    background-color: #007bff;
  }
  &:checked + ${OptionNumber} {
    color: white;
    cursor: pointer;
    font-weight: bold;
    background-color: #007bff;
  }
`;

function ArticleList(props) {
  const [articleData, setArticle] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [listTotalArticles, setListTotalArticles] = useState(0);
  const articlePerPage = 3;
  const listNumbers = [];

  useEffect(() => {
    ArticlesApi.getArticlesPaginate(currentPage, articlePerPage)
    .then(response => {
      setArticle(response.articles);
      setCurrentPage(currentPage);
      setListTotalArticles(response.total_articles)
    }).catch(error => {
      console.log('error', error)
    });
  }, []);

  const handleClick = (event) => {
    let idPage = Number(event.target.id);
    ArticlesApi.getArticlesPaginate(idPage, articlePerPage)
    .then(response => {
      setArticle(response.articles);
      setCurrentPage(idPage);
    }).catch(error => {
      console.log('error', error)
    });
  }

  const listAllArticles = articleData.map((article) => {
    return(
      <div key={article.id}>
        <h2><Link to={`/articles/${article.id}`}>{article.title}</Link></h2>
        {article.content}
        <hr/>
      </div>
    );
  })

  for (let number = 1; number <= Math.ceil(listTotalArticles / articlePerPage); number++) {
    listNumbers.push(number);
  }

  const pageNumbers = listNumbers.map(number => {
    return (
      <Text key={number}>
        <Radio name="checkNumber" type="radio" id={number} onClick={handleClick}></Radio>
        {
          currentPage == number ? (
            <OptionNumber color="#007bff" textColor="white">{number}</OptionNumber>
          ) : (
            <OptionNumber>{number}</OptionNumber>
          )
        }
      </Text>
    );
  });


  return (
    <div>
      {listAllArticles}
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
    articles: state.articlesReducer.articles,
    total_articles: state.articlesReducer.total_articles
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addArticle: (title, content) => dispatch(addArticle(title, content)),
    listArticles: () => dispatch(allArticles())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);