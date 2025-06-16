import type { Comment } from "../../data";

interface CommentItemProps {
    comment: Comment;
    onDelete?: () => void;
}

function CommentItem({ comment, onDelete }: CommentItemProps){
    return (
        <div>
            <p>{comment.id}</p>
            <p>{comment.author}</p>
            <p>{comment.content}</p>
            <small>{comment.createdAt}</small>
            {onDelete && (
                <button onClick={onDelete} className="text-red-500 text-sm">삭제</button>
            )}
        </div>
    )
}
export default CommentItem