import { createStore } from 'redux';

const initialState = {
    user: null,
    workouts: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, user: action.payload };
        case 'ADD_WORKOUT':
            return { ...state, workouts: [...state.workouts, action.payload] };
        default:
            return state;
    }
};

const store = createStore(reducer);

export default store;
