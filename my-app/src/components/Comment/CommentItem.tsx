import type { Comment } from "../../data";

interface CommentItemProps {
    comment: Comment;
    onDelete?: () => void;
    onEdit?: (newContent: string) => void;
}

function CommentItem({ comment, onDelete, onEdit }: CommentItemProps){
    return (
        <div>
            <p>{comment.id}</p>
            <p>{comment.author}</p>
            <p>{comment.content}</p>
            <small>{comment.createdAt}</small>
            {onDelete && (
                <button onClick={onDelete} className="text-red-500 text-sm">삭제</button>
            )}
            {onEdit && (
                <button
                    onClick={() => {
                        const newContent = prompt("댓글을 수정하세요", comment.content)
                        if (newContent && newContent !== comment.content) {
                            onEdit(newContent)
                        }
                    }}
                    className="text-blue-500 text-sm hover:underline"
                >
                    수정
                </button>
            )}
        </div>
    )
}
export default CommentItem