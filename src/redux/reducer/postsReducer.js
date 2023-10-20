import { POSTS_LOADING } from "../actions/postsAction"

const initialState = {
    posts: [],
}

const postsReducer = ( state = initialState, action) => {
    switch(action.type){
        case POSTS_LOADING.LOADING:
            return {
                ...state,
                loading: action.payload
            }
        case POSTS_LOADING.GET_POSTS:
            return {
                ...state,
                posts: action.payload.post
            }
        default:
            return state;
    }
}

export default postsReducer