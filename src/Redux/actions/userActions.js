import setAuthorizationHeader from "../../setAuthorizationHeader"
export const storeCurrentUserToReduxStoreToLogin = (user) => (dispatch) => {

    setAuthorizationHeader(user.token)

  dispatch(userLoggedIn(user))
};

export const userLoggedIn = (user) => {
    console.log(user);
  return {
    type: "LOGIN",
    payload: {
        user: user
    }
  };
};

export const logoutAction = () => (dispatch) => {
  dispatch({
    type: "LOGOUT",
  });
};

/* 
function storeCurrentUserToReduxStoreToLogin2(user) {
  return function dispatch() {
    return {
        type: "LOGIN",
        payload: {
        user: user,
    }, 
    }
  };
}
*/
