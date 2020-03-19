const initialState = {
    anchor: "left",
    note: [],
    open: false,
    id: "",
    message: "",
    createdBy: "",
    owner: "",
    createdAt: "",
    updatedAt: ""
};

export function note(state = initialState, action) {
    switch (action.type) {
        case "FETECHED_ALL_NOTE":
            return {
                ...state,
                note: action.note
            };
        case "NOTE_DETAIL":
            return {
                ...state,
                id: action.id,
                message: action.message,
                createdBy: action.createdBy,
                owner: action.owner,
                createdAt: action.createdAt,
                updatedAt: action.updatedAt
            };
        case "USER_UPDATED":
            return state;
        case "HANDLE_ON_CHANGE":
            return {
                ...state,
                [action.props]: action.value
            };
        default:
            return state;
    }
}