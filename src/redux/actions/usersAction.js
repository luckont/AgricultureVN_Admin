import { getDataAPI, postDataAPI, putDataAPI } from "../../untils/fetchData";
import { GLOBALTYPES } from "./globalTyle";

export const USERS_LOADING = {
    GET_USERS: "GET_USERS",
    LOADING_USER: "LOADING_USER",
    GET_USER: "GET_USER",
};

export const getUsers = ({ auth }) => async (dispatch) => {
    try {
        const res = await getDataAPI("/user", auth.token);
        dispatch({
            type: USERS_LOADING.GET_USERS,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.NOTIFY,
            payload: { err: err.response.data.msg },
        });
    }
};
export const updateUser = ({ userData, auth }) => async (dispatch) => {
    try {
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

    } catch (err) {
        dispatch({
            type: GLOBALTYPES.NOTIFY,
            payload: { err: err.response.data.msg },
        });
    }
};
