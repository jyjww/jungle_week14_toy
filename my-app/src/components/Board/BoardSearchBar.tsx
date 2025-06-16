import { useState } from "react";

function BoardSearchBar({onSearch} : {onSearch:(query : SearchQuery) => void}){
    const [keyword, setKeyword] = useState('')
    const [field, setField] = useState('title')
    const [sort, setSort] = useState<'asc' | 'desc'>('desc')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSearch({keyword, field, sort})
    }
    return(
        <form onSubmit={handleSubmit} className="flex flex-wrap items-center gap-2 mb-4">
            {/* 검색 기준 선택 (제목 or 작성자) */}
            <div className="flex-shrink-0">
                <select
                    value={field}
                    onChange={(e) => setField(e.target.value)}
                    className="border px-2 py-1 rounded"
                >
                    <option value="title">제목</option>
                    <option value="author">작성자</option>
                </select>
            </div>
            {/* 검색어 입력창 */}
            <div className="flex items-center gap-2 flex-grow">
                <input
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="검색어를 입력하세요"
                    className="border px-2 py-1 rounded w-full"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-3 py-1 rounded whitespace-nowrap"
                > 
                    검색
                </button>
            </div>
            {/* 정렬 토글 버튼 */}
            <div className="flex-shrink-0">
                <button
                    type="button"
                    onClick={() => setSort(sort === 'asc'? 'desc' : 'asc')}
                    className="border px-2 py-1 rounded"
                >
                    {sort === 'asc' ? '▲ 오름차순' : '▼ 내림차순'}
                </button>
            </div>
        </form>
    )

}

export type SearchQuery = {
    keyword: string;
    field: string;
    sort: 'asc' | 'desc';
};

export default BoardSearchBar