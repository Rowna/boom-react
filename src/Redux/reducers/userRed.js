import setAuthorizationHeader from "../../setAuthorizationHeader";

// diese initState werden für das Component benötigt
export const initState = {
  userId: "",
  userName: "",
  email: "",
  token: "",
};
// export function reducer(state = initialState, action) {
export function userRed(state = initState, action = {}) {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("reactJWT", action.payload.user.token);
      return {
        // die alte Variablen muessen überschrieben werden, deswegen habe ich sie aufgerufet mit
        // ...state, um ihnen neue werte zu übergeben/überschreiben
        ...state,

        //  user: action.payload.user

        userName: action.payload.user.userName,
        email: action.payload.user.email,
        // token wird für token benötigt
        token: action.payload.user.token,
        userId: action.payload.user.userId,
      };
    case "LOGOUT":
      localStorage.removeItem("reactJWT");
      setAuthorizationHeader(null);
      return {
        // beim Signout werden die Werte auf ihre initState gesetzt
        userId: "",
        userName: "",
        email: "",
        token: "",
      };

    default:
      return {
        ...state,
      };
  }
}
