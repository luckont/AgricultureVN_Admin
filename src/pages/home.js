import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../redux/actions/postsAction";
import { getUsers } from "../redux/actions/usersAction";
import moment from "moment"

const HomePage = () => {

    const dispatch = useDispatch()
    const auth = useSelector((state) => state.auth)

    const posts = useSelector((state) => state.posts)
    const users = useSelector((state) => state.users)



    useEffect(() => {
        dispatch(getPosts({ auth }));
        dispatch(getUsers({ auth }));
    }, [auth, dispatch]);

    return (
        <div className="home_page w-100">
            <div className="row">
                <div className="total_user col-md-3 border_box">
                    <h5>Total Users</h5>
                    <span>{users.users.length}</span>
                </div>
                <div className="total_post col-md-3 border_box">
                    <h5>Total Posts</h5>
                    <span>{posts.posts.length}</span>
                </div>
            </div>
            <div className="row mt-4">
                <div className="new_registration col border_box">
                    <h5>New Registration</h5>
                    {
                        users.users
                        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) 
                        .map(item => (
                            <div key={item._id} className="d-flex">
                                <img src={item.profilePicture} alt="profilePicture" className="rounded-circle" height={40} width={40}/>
                                <div className="col">
                                    <span className="row">{item.username}</span>
                                    <span className="row">{moment(item.createdAt).fromNow()}</span>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="top_user col border_box">
                <h5>Top Users</h5>
                    {
                        users.users
                        .sort((a, b) => b.followers.length - a.followers.length)
                        .map(item => (
                            <div key={item._id}>
                                {item.username}
                            </div>
                        ))
                    }
                </div>
                <div className="top_post col border_box">
                <h5>Top Posts</h5>
                    {
                        posts.posts.map(item => (
                            <div key={item._id}>
                                {item._id}
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default HomePage;
