import axios from 'axios';
import { randomBytes } from 'crypto';

export const GIF_FETCH_RANDOM_INIT = 'gif/fetch/random/init';
export const GIF_FETCH_RANDOM_SUCESS = 'gif/fetch/random/success';

export function fetchGifs(type = 'random') {
  return (dispatch, getState) => {
    dispatch({
      type: GIF_FETCH_RANDOM_INIT
    })

    const { gif: state } = getState();

    axios.get(`https://tewqe03293.execute-api.eu-west-1.amazonaws.com/dev/${type}`).then(response => {
      const { data } = response

      const gifs = data.map(gif => {
        gif.type = type;
        return gif;
      });

      const filtered = gifs.filter(gif => {
        return state.gifs.findIndex(existing => existing.id === gif.id) === -1
      })

      dispatch({
        type: GIF_FETCH_RANDOM_SUCESS,
        payload: filtered
      })
    })
  }
}
/**
 * Initial redux state
 */
const initialState = {
  gifs: [],
  isLoading: false,
};

/**
 * Gif reducer
 * @param {object} state 
 * @param {object} action 
 */
export default function reducer(state = initialState, action) {
  const { payload, type } = action;

  switch (type) {
    case GIF_FETCH_RANDOM_INIT:
      return {
        ...state,
        isLoading: true
      }
    case GIF_FETCH_RANDOM_SUCESS:
      return {
        ...state,
        gifs: [...state.gifs, ...payload],
      }
    default:
      return state
  }
}