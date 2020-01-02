import {
  ADD_ARTICLE,
  EDIT_ARTICLE,
  INFO_ARTICLE,
  REMOVE_ARTICLE,
  ALL_ARTICLES
} from '../constants/actionTypes';

const articlesState = {
  articles: [],
  article: {}
};

function articlesReducer(state = articlesState, action) {
  switch (action.type){
    case ADD_ARTICLE:
    return [
      ...state,
      {
        id: 'fff',
        title: action.title,
        content: action.content
      }
    ];
    case EDIT_ARTICLE:
      return {

      };
    case INFO_ARTICLE:
      return {
        ...state,
        article: action.article
      };
    case REMOVE_ARTICLE:
      return {

      };
    case ALL_ARTICLES:
      return {
        ...state,
        articles: action.articles
      };
    default:
      return state;
  }
}

export default articlesReducer;
