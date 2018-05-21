export const SIGN_IN = 'auth/sign_in';
export const SIGN_IN_SUCESS = 'auth/sign_in/success';
export const SIGN_OUT = 'auth/sign_out';

/**
 * Signin user using google yolo
 */
export function signIn() {
  return async dispatch => {
    dispatch({
      type: SIGN_IN
    })
    const hintPromise = window.googleyolo.hint({
      supportedAuthMethods: [
        "https://accounts.google.com"
      ],
      supportedIdTokenProviders: [
        {
          uri: "https://accounts.google.com",
          clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID
        }
      ]
    });

    hintPromise.then(user => {
      console.log(user)
      dispatch({
        type: SIGN_IN_SUCESS,
        payload: user
      });
    }).catch(() => {
      console.log('error')
    })
  }
}

/**
 * Signout an authenticated user
 */
export function signOut() {
  return {
    type: SIGN_OUT,
    payload: null
  }
}

/**
 * Initial application state
 */
const initialState = {
  user: null,
  isLoading: false,
}

/**
 * Reducer
 * @param {object} state 
 * @param {object} action 
 */
export default function reducer(state = initialState, action) {
  const { payload, type } = action;

  switch (type) {
    case SIGN_IN: 
      return {
        ...state, isLoading: true
      }
    case SIGN_IN_SUCESS:
      return {
        ...state,
        user: payload
      }
    case SIGN_OUT:
      return {
        ...state,
        user: payload
      }
    default:
      return state
  }
}
