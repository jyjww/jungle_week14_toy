import CommentItem from "./CommentItem"
import type { Comment } from "../../data";

interface CommentListProps {
    comments: Comment[];
    onDeleteComment?: (id: number) => void;
}


function CommentList({ comments, onDeleteComment } : CommentListProps){
    return(
        <ul className="space-y-4 mt-4">
            {comments.length === 0 ? (
                <li className="text-gray-500 text-sm">아직 댓글이 없습니다.</li>
            ) : (
                comments.map((comment) => (
                    <li key={comment.id}>
                        <CommentItem
                            comment={comment}
                            onDelete={() => onDeleteComment?.(comment.id)}
                        />
                    </li>
                ))
            )}

        </ul>

    )
}
export default CommentList