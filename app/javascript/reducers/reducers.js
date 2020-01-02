import { combineReducers } from 'redux';
import articlesReducer from '../reducers/articles';

const reducers = combineReducers({
  articlesReducer: articlesReducer
});

export default reducers;