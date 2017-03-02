import { actions } from 'react-native-navigation-redux-helpers';

import * as types from './types';
import Api from '../lib/api';
import searchCriteria from '../models/searchCriteria';

export function airSearch(searchCriteria){
  const params = Object.keys(searchCriteria).map(key => searchCriteria[key]);

  return (dispatch, getState) => {

    params.push('client_id', '3092nxybyb0otqw18e8nh5nty');
    params.join('&');

    return Api.get(`/search_results?${params}`).then(resp => {
      dispatch(setAirSearched({search_results: resp.search_results}));
    }).catch( (ex) => {
      console.log(ex);
    });
  }
}

export function setAirSearched({ search_results }) {
  console.log(search_results);
  return {
    type: types.AIR_SEARCHED,
    search_results,
  }
}
