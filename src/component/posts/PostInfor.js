import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { POSTS_LOADING, updatePost } from "../../redux/actions/postsAction";

const PostInfor = () => {
    const post = useSelector((state) => state.posts.post);
    const auth = useSelector((state) => state.auth)

    const initialState = {
        desc: "", 
        userId: post.user._id,
        id: post._id,
    }

    const dispatch = useDispatch();
    const [postData, setPostData] = useState(initialState)

    const handleClose = () => {
        dispatch({ type: POSTS_LOADING.LOADING_POST, payload: false })
    }

    const handleChangeValue = (e) => {
        const { name, value } = e.target;
        setPostData({ ...postData, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(
            updatePost({
              postData,
              auth,
            })
          );
    }

    return (
        <div className="post_infor">
            <div className="post_infor_container">
                <div className="infor_title_post">
                    <h5>Chi tiết bài viết</h5>
                    <span onClick={() => handleClose()}>&times;</span>
                </div>
                <table >
                    <tr>
                        <th>ID</th>
                        <td>{post._id}</td>
                    </tr>
                    <tr>
                        <th>Username</th>
                        <td>{post.user.username}</td>
                    </tr>
                    <tr>
                        <th>Desc</th>
                        <td>{post.desc}</td>
                    </tr>
                    <tr>
                        <th>Pic</th>
                        <td>
                            {post.img.map((item, i) => (
                                <img key={i} src={item.url} alt="img_fill" style={{ height: "200px", paddingLeft: '10px' }} />
                            ))}
                        </td>
                    </tr>
                    <tr>
                        <th>Hashtag</th>
                        <td>{post.hashtag}</td>
                    </tr>
                    <tr>
                        <th>Like</th>
                        <td>{post.like.length}</td>
                    </tr>
                    <tr>
                        <th>Cmt</th>
                        <td>{post.comments.length}</td>
                    </tr>
                    <tr>
                        <th>Create</th>
                        <td>{new Date(post.createdAt).toLocaleString()}</td>
                    </tr>
                    <tr>
                        <th>Update</th>
                        <td>{new Date(post.updatedAt).toLocaleString()}</td>
                    </tr>
                </table>
                <form onSubmit={handleSubmit} className="pt-4">
                    <label htmlFor="descTextInput" className="form-label">
                        Warning !
                    </label>
                    <textarea
                        col={30}
                        rows={4}
                        type="text"
                        id="descTextInput"
                        className="form-control"
                        value={postData.desc}
                        onChange={handleChangeValue}
                        name="desc"
                    />
                    <button className="btn btn-success w-100 mt-2" type="submit">
                        Cập nhật
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PostInfor;
