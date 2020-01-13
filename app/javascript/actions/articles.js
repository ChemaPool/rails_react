import * as actionTypes from '../constants/actionTypes';
import ArticlesApi from '../api/articlesApi';

export function addArticle(title, content) {
  return {
    type: actionTypes.ADD_ARTICLE,
    title: title,
    content: content
  };
}

export function editArticle(id) {
  return {
    type: actionTypes.EDIT_ARTICLE,
    id: id
  };
}

export function infoArticle(id) {
  return function (dispatch) {
    return ArticlesApi.getArticle(id).then(article => {
        dispatch(successShowArticle(article))
      })
      .catch(error => console.log('error', error));
  }
}

export function successShowArticle(article){
  return {
    type: actionTypes.INFO_ARTICLE,
    article
  }
}

export function removeArticle(id) {
  return {
    type: actionTypes.REMOVE_ARTICLE,
    id: id
  };
}

export function successLoadArticles(articles) {
  return {
    type: actionTypes.ALL_ARTICLES,
    articles
  };
}

export function articlesPaginate(idPage, perPage) {
  return ArticlesApi.getArticlesPaginate(idPage, perPage)
  .then(articles => {
    dispatch(successLoadArticles(articles));
  }).catch(error => {
    console.log('error', error)
  });
}