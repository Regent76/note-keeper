import {combineReducers} from 'redux';
import {authentication} from './auth.reducer';
import {note} from '../notes/note.reducer';

const rootReducer = combineReducers({
    authentication,
    note
});
export default rootReducer;