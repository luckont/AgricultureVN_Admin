import { getDataAPI, postDataAPI } from "../../untils/fetchData"
import { GLOBALTYPES } from "./globalTyle"

export const POSTS_LOADING = {
    GET_POSTS: "GET_POSTS",
    LOADING_POST: "LOADING_POST",
    GET_POST: "GET_POST",
}

export const getPosts = ({ auth }) => async (dispatch) => {
    try {
        dispatch({ type: GLOBALTYPES.NOTIFY, payload: { loading: true } });

        const res = await getDataAPI("/post/news/result", auth.token)
        dispatch({
            type: POSTS_LOADING.GET_POSTS,
            payload: res.data
        })

        dispatch({ type: GLOBALTYPES.NOTIFY, payload: { loading: false } });

    } catch (err) {
        dispatch({
            type: GLOBALTYPES.NOTIFY,
            payload: { err: err.response.data.msg },
        });
    }
}

export const getPost = ({ id, auth }) => async (dispatch) => {
    try {
        dispatch({ type: GLOBALTYPES.NOTIFY, payload: { loading: true } });
        const res = await getDataAPI(`/post/${id}`, auth.token)
        dispatch({
            type: POSTS_LOADING.GET_POST,
            payload: res.data
        })
        dispatch({ type: GLOBALTYPES.NOTIFY, payload: { loading: false } });
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.NOTIFY,
            payload: { err: err.response.data.msg },
        });
    
    }
}

export const updatePost = ({ postData, auth }) => async (dispatch) => {
    try {
        dispatch({ type: GLOBALTYPES.NOTIFY, payload: { loading: true } });

        //Notify to user
        const msg = {
            id: postData.id,
            text: 'Thông báo từ ADMIN !',
            recipients: postData.userId,
            url: `/post/${postData.id}`,
            content: postData.desc,
            image: ""
        }
        await postDataAPI("/notify", msg, auth.token)
        dispatch({ type: GLOBALTYPES.NOTIFY, payload: { loading: false } });

    } catch (err) {
        dispatch({
            type: GLOBALTYPES.NOTIFY,
            payload: { err: err.response.data.msg },
        });
    }
};
