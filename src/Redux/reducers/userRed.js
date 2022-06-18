import setAuthorizationHeader from "../../setAuthorizationHeader"


// diese initState werden für das Component benötigt
let initState = {
  userId: "",
  userName: "",
  email: "",
  token: "",
};

export default function userRed(state = initState, action = {}) {
  switch (action.type) {
  
    case "LOGIN":
     localStorage.setItem("reactJWT", action.payload.user.token)
      return {
        // die alte Variablen muessen überschrieben werden, deswegen habe ich sie aufgerufet mit 
        // ...state, um ihnen neue werte zu übergeben/überschreiben
        ...state,

        userName: action.payload.user.userName,
        email: action.payload.user.email,
        token: action.payload.user.token,
        userId: action.payload.user.userId,
      };
    case "LOGOUT":
      localStorage.removeItem("reactJWT")
      setAuthorizationHeader(null)
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
