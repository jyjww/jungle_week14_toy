import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { createPostApi, updatePostApi, getPostById } from "../../api/Board/boardApi";

function BoardEdit(){
    const { id } = useParams()
    const isEditMode = Boolean(id)
    const navigate = useNavigate()

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [author, setAuthor] = useState("")

    useEffect(() => {
        if(!isEditMode) return

        const fetchPost = async () => {
            try {
                const post = await getPostById(Number(id))
                setTitle(post.title)
                setContent(post.content)
                setAuthor(post.author?.name || "")
            }catch (err){
                console.error("게시글 조회 실패", err)
            }
        }
        fetchPost()
    }, [id])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            if(isEditMode){
                await updatePostApi(Number(id), title, content)
            }else{
                await createPostApi(title, content)
            }
            navigate("/board")
        } catch(err:any) {
            alert("오류 발생:" + err.message)
        }
    }

    return (
        <article className="flex-1 w-full max-w-6xl mx-auto bg-white rounded-md shadow-md p-6">
            <header className="mb-6">
                <h1 className="text-2xl font-bold mb-4">
                    {isEditMode ? '게시글 수정' : '새 글 작성'}
                </h1>
                {/* 로그인 검증 구현 시, 로그인 안하면 못쓰게 추가*/}
                {isEditMode && (
                <p className="text-md text-gray-500 mb-2">작성자 : {author}</p>
                )}
            </header>
            <form>
                <h1 className="text-2xl font-bold mb-4">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="제목을 입력하세요"
                        className="w-full border p-2 mb-4"
                    />
                </h1>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="내용을 입력하세요"
                    className="w-full border p-2 h-40 mb-4"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={handleSubmit}
                >
                {isEditMode ? '수정 완료' : '작성 완료'}
                </button>
            </form>
        </article>
    )
}

export default BoardEdit