const initialState = {
    anchor: 'left',
    note: [],
    open: false,
    id: '',
    message: '',
    created_by: '',
    owner: '',
    created_at: '',
    updated_at: ''
};

export function note(state = initialState, action) {
    switch (action.type) {
        case 'FETECHED_ALL_NOTE':
            return {
                ...state,
                note: action.note
            };
        case 'NOTE_DETAIL':
            return {
                ...state,
                id: action.id,
                message: action.message,
                created_by: action.created_by,
                owner: action.owner,
                created_at: action.created_at,
                updated_at: action.updated_at
            };
        case "USER_UPDATED":
            return state;
        case "HANDLE_ON_CHANGE":
            return {
                ...state,
                [action.props]: action.value
            };
        default:
            return state
    }
}