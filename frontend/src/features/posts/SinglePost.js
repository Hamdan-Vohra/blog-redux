import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

import { useSelector } from "react-redux";
import { getPostsStatus, selectPostById } from "./postsSlice";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const SinglePost = () => {

    const {postId} = useParams();
    const status = useSelector(state=>getPostsStatus(state))
    const post = useSelector((state)=>selectPostById(state,Number(postId)));
    if(!post){
        if(status === 'loading'){
            return (
                <section>
                    <h2>Loading Posts...</h2>
                </section>
            )
        } else {
            return (
                <section>
                    <h2>Post Not Found</h2>
                </section>
            )
        }
    } else {
        return (
            <article>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
                <p className="postCredit">
                    <PostAuthor userId={post.userId} />
                    <TimeAgo timestamp={post.date} />
                </p>
                <ReactionButtons post={post} />
                <Link to={`/post/edit/${post.id}`} className="btn">Edit Post</Link>
            </article>
        )
    }
}
export default SinglePost