import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Pencil } from "lucide-react";
import { Trash } from "lucide-react";
import CommentsBar from "./CommentsBar";
import LikeButton from "../../components/Board/LikeButton";
import { getPostById, deletePostApi } from "../../api/Board/boardApi";
import type { Post } from "../../types";

function BoardDetail(){
    const { id } = useParams()
    const numericPostId = Number(id)

    const [post, setPost] = useState<Post | null>(null)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const data = await getPostById(numericPostId)
                setPost(data)
            } catch (err:any){
                console.error("게시글 로딩 실패", err);
            } finally {
                setLoading(false)
            }
        }
        fetchPost()
    }, [numericPostId])

    if (loading) return <div>로딩 중...</div>;
    if (!post) return <div>게시글을 찾을 수 없습니다</div>;

    const handleDelete = async () => {
            const confirmed = window.confirm("게시글을 삭제하겠습니까?")
            if(!confirmed) return
    
            try {
                await deletePostApi(post.id)
                navigate("/board")
            } catch (err:any){
                alert("삭제 중 오류 발생: " + err.message)
            }
        }

    return(
        <article className="flex-1 w-full max-w-6xl mx-auto bg-white rounded-md shadow-md p-6">
            <header className="mb-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold mb-6">{post.title}</h1>
                    <div className="flex space-x-2">
                        <button
                            onClick={() => navigate(`/board/edit/${post.id}`)}
                            className="flex items-center text-gray-400 hover:text-gray-600 transition"
                        >
                            <Pencil size={20} className="mr-1" />
                            <span className="text-sm">수정</span>
                        </button>
                        <button
                            onClick={handleDelete}
                            className="flex items-center text-gray-400 hover:text-red-600 transition"
                            >
                            <Trash size={20} className="mr-1" />
                            <span className="text-sm">삭제</span>
                        </button>
                    </div>
                </div>
                <p className="text-md text-gray-500">작성자 : {post.author?.name}</p>
                <p className="text-md text-gray-500">작성일 : {new Date(post.createdAt).toLocaleString()}</p>
                <p className="text-md text-gray-500">조회수 : {post.viewed}</p>
            </header>
            <section className="prose max-w-none mb-10 border-y py-[5rem]">
                <h3>{post.content}</h3>
            </section>
            <section>
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">💬 Comments</h2>
                    <LikeButton targetId={post.id} targetType="post" />
                </div>
                <CommentsBar postId={numericPostId} />
            </section>
        </article>
    )
}

export default BoardDetail