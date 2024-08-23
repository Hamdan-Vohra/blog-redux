import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

import { Link } from "react-router-dom";

const PostsExcerpt = ({ post }) => {
    return (
        <article>  
            <h3>{post.title}</h3>
            <p className="excerpt">{post.body.substring(0, 75)}...</p>
            <p className="postCredit">
                <PostAuthor userId={post.userId} />
                <TimeAgo timestamp={post.date} />
            </p>
            <ReactionButtons post={post} />
            <Link to={`post/${post.id}`} className="btn" >View Post</Link>
        </article>
    )
}
export default PostsExcerpt