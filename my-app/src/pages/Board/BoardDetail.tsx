import { useParams } from "react-router-dom";
import { dummyPosts } from "../../data";
import CommentsBar from "./CommentsBar";
import LikeButton from "../../components/Board/LikeButton";

function BoardDetail(){
    const { id } = useParams()
    const Post = dummyPosts.find(p => p.id === Number(id))

    // const { postId } = useParams<{ postId: string }>()
    const numericPostId = Number(id)

    if(!Post)
        return <div>게시글을 찾을 수 없습니다</div>

    return(
        <article className="flex-1 w-full max-w-6xl mx-auto bg-white rounded-md shadow-md p-6">
            <header className="mb-6">
                <h1 className="text-2xl font-bold mb-6">{dummyPosts[0].title}</h1>
                <p className="text-md text-gray-500">작성자 : {Post.author}</p>
                <p className="text-md text-gray-500">작성일 : {Post.date}</p>
                <p className="text-md text-gray-500">조회수 : {Post.viewed}</p>
            </header>
            <section className="prose max-w-none mb-10">
                <body>
                    <h3>본문</h3>
                </body>
            </section>
            <section>
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">💬 Comments</h2>
                    <LikeButton targetId={Post.id} targetType="post" />
                </div>
                <CommentsBar postId={numericPostId} />
            </section>
        </article>
    )
}

export default BoardDetail