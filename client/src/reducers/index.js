import {combineReducers} from "redux";
import {authentication} from "./AuthReducer";
import {note} from "../notes/NoteReducer";

const rootReducer = combineReducers({
    authentication,
    note
});
export default rootReducer;