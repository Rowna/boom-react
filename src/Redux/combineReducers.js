import { combineReducers } from "redux";
import {userRed} from "./reducers/userRed";


export default combineReducers({
    // das erste Store z.B. für das Component "Header" oder mehr wurde definiert,
    // diese Datei befindet sich in "reducers" "reducers ist im Prinzip wie store".
    userRed,
  // articleRed
});
