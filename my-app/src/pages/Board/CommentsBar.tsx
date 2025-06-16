import { useState, useEffect } from 'react'
import type { Comment } from '../../data'
import CommentForm from '../../components/Comment/CommentForm'
import CommentList from '../../components/Comment/CommentList'

function CommentsBar({ postId }: { postId: number }) {
    const [comments, setComments] = useState<Comment[]>([])

    useEffect(() => {
        // TODO: fetch(`/api/posts/${postId}/comments`)
    }, [postId])

    // 댓글 추가 함수
    const handleAddComment = (content: string) => {
        const newComment: Comment = {
        id: Date.now(), // 또는 서버 생성 ID
        postId: postId,
        author: '현재유저', // 추후 로그인 유저로 교체
        content,
        createdAt: new Date().toISOString(),
        }

        setComments((prev) => [...prev, newComment])
    }

    // 댓글 삭제 함수
    const handleDeleteComment = (id: number) => {
        setComments((prev) => prev.filter((comment) => comment.id !== id))
    }

    return (
        <div className="mt-6 border-t pt-4">
        <CommentForm onAddComment={handleAddComment} />
        <CommentList comments={comments} onDeleteComment={handleDeleteComment} />
        </div>
    )
}

export default CommentsBar
