import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../redux/actions/postsAction";

const PostsPage = () => {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const posts = useSelector((state) => state.posts.posts);

    useEffect(() => {
        dispatch(getPosts({ auth }));
    }, [auth, dispatch]);

    return (
        <div>
            <h5>Bài viết</h5>
            {posts.map((post) => (
                <div key={post._id}>{post._id}</div>
            ))}
        </div>
    );
}

export default PostsPage;
