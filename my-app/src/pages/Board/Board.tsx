import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Post } from '../../types';
import { requireAuth } from "../../api/Auth/requireAuth";
import { getPostList } from '../../api/Board/boardApi';
import BoardSearchBar from '../../components/Board/BoardSearchBar';
import type { SearchQuery } from '../../components/Board/BoardSearchBar';
import Pagination from '../../components/Board/Pagination';

function Board() {
    const handleSearch = (query: SearchQuery) => {
        console.log('검색 조건:', query);
    }

    const [posts, setPosts] = useState<Post[]>([])

    const navigate = useNavigate()
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await getPostList()
                setPosts(data)
            }catch(err:any){
                console.error("글목록 불러오기 실패", err)
            }
        }
        requireAuth(navigate)
        fetchPosts()
    }, [])

    {/* Pagination */}
    const [currentPage, setCurrentPage] = useState(1);
    const POSTS_PER_PAGE = 5;

    const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
    const paginatedPosts = posts.slice(
        (currentPage - 1) * POSTS_PER_PAGE,
        currentPage * POSTS_PER_PAGE
    );

    return (
        <main className="flex flex-col min-h-[80vh] w-full max-w-[1280px] bg-gray-100 px-4 mx-auto">
        {/* 메인 콘텐츠 */}
            <div className="flex-1 w-full max-w-6xl mx-auto bg-white rounded-md shadow-md p-6">
                <h1 className="text-2xl font-bold mb-6">게시판</h1>
                <BoardSearchBar onSearch={handleSearch} />
                <table className="w-full table-auto border-collapse">
                <thead>
                    <tr className="bg-gray-100 text-left text-sm text-gray-700">
                    <th className="p-3">번호</th>
                    <th className="p-3">제목</th>
                    <th className="p-3">작성자</th>
                    <th className="p-3">날짜</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedPosts.map((post) => (
                        <tr key={post.id} className="border-b hover:bg-gray-50">
                            <td className="p-3">{post.id}</td>
                            <td className="p-3">
                                <Link to={`/board/${post.id}`} className="text-blue-600 hover:underline">
                                    {post.title}
                                </Link>
                            </td>
                            <td className="p-3">{post.author?.name}</td>
                            <td className="p-3">{post.createdAt?.slice(0, 10)}</td>
                        </tr>
                    ))}
                </tbody>
                </table>
                <div className="mt-[34rem] flex justify-center">
                    <button
                        type="button"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                        onClick={() => navigate("/board/write")}
                    >
                        게시글 작성
                    </button>
                </div>
            </div>

            {/* Pagination */}
            <div className="w-full max-w-6xl mx-auto mt-4 text-center">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </div>
        </main>
    )
}

export default Board
