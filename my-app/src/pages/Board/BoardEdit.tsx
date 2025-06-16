import { useParams } from "react-router-dom";
import { dummyPosts } from "../../data";

function BoardEdit(){
    const { id } = useParams()
    const isEditMode = Boolean(id)
    const Post = isEditMode ? dummyPosts.find(p => p.id === Number(id)) : null

    if(isEditMode && !Post)
        return <div>존재하지 않는 게시물입니다</div>
    
    return (
        <article className="flex-1 w-full max-w-6xl mx-auto bg-white rounded-md shadow-md p-6">
            <header className="mb-6">
                <h1 className="text-2xl font-bold mb-4">
                    {isEditMode ? '게시글 수정' : '새 글 작성'}
                </h1>
                {/* 로그인 검증 구현 시, 로그인 안하면 못쓰게 추가*/}
                {isEditMode && (
                <p className="text-md text-gray-500 mb-2">작성자 : {Post?.author}</p>
                )}
            </header>
            <form>
                <h1 className="text-2xl font-bold mb-4">
                    <input
                        type="text"
                        defaultValue={Post?.title || ''}
                        placeholder="제목을 입력하세요"
                        className="w-full border p-2 mb-4"
                    />
                </h1>
                <textarea
                    defaultValue={Post?.content || ''}
                    placeholder="내용을 입력하세요"
                    className="w-full border p-2 h-40 mb-4"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                {isEditMode ? '수정 완료' : '작성 완료'}
                </button>
            </form>
        </article>
    )
}

export default BoardEdit