import {userService} from "../services/";
import {history} from "../helpers";

function getNote() {
    return (dispatch) => {
        let apiEndpoint = "notes";
        userService.get(apiEndpoint)
            .then((response) => {
                dispatch(changeNotesList(response.data.items));
            }).catch((err) => {
        })
    };
}

function createNote(payload) {
    return (dispatch) => {
        let apiEndpoint = "notes/";
        userService.post(apiEndpoint, payload)
            .then((response) => {
                dispatch(createUserInfo());
                history.push("/notes");
            })
    }
}

function getNoteById(id) {
    return (dispatch) => {
        let apiEndpoint = "notes/" + id;
        userService.get(apiEndpoint)
            .then((response) => {
                dispatch(editVNotesDetails(response.data.note));
            })
    };
}

function onChangeProps(props, event) {
    return (dispatch) => {
        dispatch(handleOnChangeProps(props, event.target.value));
    }
}

function editNoteInfo(id, payload) {
    return (dispatch) => {
        let apiEndpoint = "notes/" + id;
        userService.put(apiEndpoint, payload)
            .then((response) => {
                dispatch(updatedUserInfo());
                history.push("/notes");
            })
    }
}

function deleteNoteById(id) {
    return (dispatch) => {
        let apiEndpoint = "notes/" + id;
        userService.deleteDetail(apiEndpoint)
            .then((response) => {
                dispatch(deleteNotesDetails());
                dispatch(noteAction.getNote());
            })
    };
}
export const noteAction = {
    getNote,
    getNoteById,
    onChangeProps,
    editNoteInfo,
    createNote,
    deleteNoteById
};

export function changeNotesList(note) {
    return {
        type: "FETECHED_ALL_NOTE",
        note: note
    }
}

export function handleOnChangeProps(props, value) {
    return {
        type: "HANDLE_ON_CHANGE",
        props: props,
        value: value
    }
}

export function editVNotesDetails(note) {
    return {
        type: "NOTE_DETAIL",
        id: note._id,
        created_by: note.created_by,
        created_at: note.created_at,
        updated_at: note.updated_at,
        owner: note.owner,
        message: note.message,
    }
}

export function updatedUserInfo() {
    return {
        type: "USER_UPDATED"
    }
}

export function createUserInfo() {
    return {
        type: "USER_CREATED_SUCCESSFULLY"
    }
}

export function deleteNotesDetails() {
    return {
        type: "DELETED_NOTE_DETAILS"
    }
}