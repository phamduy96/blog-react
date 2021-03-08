import { combineReducers } from "redux"
import idBlogReducers from "./IDBlog"
const rootReducer = combineReducers({
    idBlogReducers: idBlogReducers
})
export default rootReducer