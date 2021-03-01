import { combineReducers } from "redux"
import hobbyReducers from "./hobbys"
const rootReducer = combineReducers({
    hobby: hobbyReducers
})
export default rootReducer