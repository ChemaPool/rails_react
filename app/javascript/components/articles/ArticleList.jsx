import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { addArticle, allArticles } from '../../actions/articles';
import ArticlesApi from '../../api/articlesApi';
import Styled from "styled-components";

const Text = Styled.label``;

const NumberPaginate = Styled.div`
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
  &:checked + ${NumberPaginate} {
    color: white;
    cursor: pointer;
    font-weight: bold;
    background-color: #007bff;
  }
`;

function ArticleList(props) {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [listTotalArticles, setListTotalArticles] = useState(0);
  const ARTICLEPERPAGE = 3;
  const numberList = [];
  let paginationNumber = 1;

  useEffect(() => {
    ArticlesApi.getArticlesPaginate(currentPage, ARTICLEPERPAGE)
    .then(response => {
      setArticles(response.articles);
      setCurrentPage(currentPage);
      setListTotalArticles(response.total_articles)
    }).catch(error => {
      console.log('error', error)
    });
  }, []);

  const changePaginate = (event) => {
    let idPage = Number(event.target.id);
    ArticlesApi.getArticlesPaginate(idPage, ARTICLEPERPAGE)
    .then(response => {
      setArticles(response.articles);
      setCurrentPage(idPage);
    }).catch(error => {
      console.log('error', error)
    });
  }

  const listAllArticles = articles.map((article) => {
    return(
      <div key={article.id}>
        <h2><Link to={`/articles/${article.id}`}>{article.title}</Link></h2>
        {article.content}
        <hr/>
      </div>
    );
  })

  for (paginationNumber; paginationNumber <= Math.ceil(listTotalArticles / ARTICLEPERPAGE); paginationNumber++) {
    numberList.push(paginationNumber);
  }

  const pageNumbers = numberList.map(pageNumber => {
    return (
      <Text key={pageNumber}>
        <Radio name="checkNumber" type="radio" id={pageNumber} onClick={changePaginate}></Radio>
        {
          currentPage == pageNumber ?
            <NumberPaginate color="#007bff" textColor="white">{pageNumber}</NumberPaginate>
          :
            <NumberPaginate>{pageNumber}</NumberPaginate>
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