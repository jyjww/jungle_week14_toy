import { useState, useEffect } from 'react'
import type { Comment } from '../../data'
import CommentForm from '../../components/Comment/CommentForm'
import CommentList from '../../components/Comment/CommentList'
import { createCommentApi, getCommentByPostApi, updateCommentApi,deleteCommentApi } from '../../api/Board/commentApi'

function CommentsBar({ postId }: { postId: number }) {
    const [comments, setComments] = useState<Comment[]>([])

    useEffect(() => {
    fetchComments()
    }, [postId])

    const fetchComments = async () => {
        try {
            const rawData = await getCommentByPostApi(postId)

            const formatted = rawData.map((comment: any) => ({
                id: comment.id,
                postId: comment.post?.id, // 또는 그냥 postId 보내면 comment.postId
                content: comment.content,
                author: comment.author?.name,
                createdAt: comment.createdAt,
            }))

            setComments(formatted)
        } catch (err: any) {
            console.error("댓글 불러오기 실패", err)
        }
    }

    // 댓글 추가 함수
    const handleAddComment = async (content: string) => {
        try {
            const newComment = await createCommentApi(postId, content)
            setComments((prev) => [...prev, newComment])
            await fetchComments()
        } catch(err:any){
            alert(`댓글 등록 실패: ${err.message}`)
        }
    }

    // 댓글 수정 함수
    const handleEditComment = async (commentId: number, newComment: string) => {
        try {
            // const updated = await updateCommentApi(commentId, newComment)
            /*setComments((prev) => 
                prev.map((comment) => 
                comment.id === commentId 
                ? {...comment, content: updated.content} 
                : comment))*/
            await updateCommentApi(commentId, newComment)
            await fetchComments()
        } catch (err:any) {
            console.error("댓글 수정 실패", err)
        }
    }

    // 댓글 삭제 함수
    const handleDeleteComment = async (id: number) => {
        try {
            await deleteCommentApi(id)
            setComments((prev) => prev.filter((comment) => comment.id !== id))
            await fetchComments()
        } catch (err: any) {
            console.error("댓글 삭제 실패", err)
            alert("댓글 삭제에 실패했습니다.")
        }
    }

    return (
        <div className="mt-6 border-t pt-4">
        <CommentForm onAddComment={handleAddComment} />
        <CommentList 
            comments={comments} 
            onDeleteComment={handleDeleteComment}
            onEditComment={handleEditComment} />
        </div>
    )
}

export default CommentsBar
