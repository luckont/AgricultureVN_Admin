import { getDataAPI } from "../../untils/fetchData"
import { GLOBALTYPES } from "./globalTyle"

export const POSTS_LOADING = {
    GET_POSTS: "GET_POSTS"
}

export const getPosts = ({ auth }) => async (dispatch) => {
    try {
        const res = await getDataAPI("/post/news/result", auth.token)
        dispatch({
            type: POSTS_LOADING.GET_POSTS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.NOTIFY,
            payload: { err: err.response.data.msg },
        });
    }
}