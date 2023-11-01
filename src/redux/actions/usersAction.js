import { getDataAPI, postDataAPI, putDataAPI } from "../../untils/fetchData";
import { GLOBALTYPES } from "./globalTyle";

export const USERS_LOADING = {
    GET_USERS: "GET_USERS",
    LOADING_USER: "LOADING_USER",
    GET_USER: "GET_USER",
};

export const getUsers = ({ auth }) => async (dispatch) => {
    try {
        dispatch({ type: GLOBALTYPES.NOTIFY, payload: { loading: true } });

        const res = await getDataAPI("/user", auth.token);
        dispatch({
            type: USERS_LOADING.GET_USERS,
            payload: res.data,
        });
        dispatch({ type: GLOBALTYPES.NOTIFY, payload: { loading: false } });

    } catch (err) {
        dispatch({
            type: GLOBALTYPES.NOTIFY,
            payload: { err: err.response.data.msg },
        });
    }
};
export const updateUser = ({ userData, auth }) => async (dispatch) => {
    try {
        dispatch({ type: GLOBALTYPES.NOTIFY, payload: { loading: true } });

        await putDataAPI(
            `/user/${userData.id}`,
            { roles: userData.roles },
            auth.token
        );

        //Notify to user
        const msg = {
            id: userData.id,
            text: 'Thông báo !',
            recipients: userData.id,
            url: "",
            content: userData.desc,
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
