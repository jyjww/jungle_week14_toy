interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

function Pagination ({currentPage, totalPages, onPageChange} : PaginationProps){
    const handlePrev = () => {
        if(currentPage > 1) onPageChange(currentPage - 1)
    }

    const handleNext = () => {
        if(currentPage < totalPages) onPageChange(currentPage + 1)
    }
    return (
        <div className="inline-flex items-center gap-2 justify-center mt-4">
            <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
                이전
            </button>
            {Array.from({length : totalPages}, (_, i) => i+1).map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`px-3 py-1 text-sm rounded ${
                        currentPage === page
                            ? "bg-blue-500 text-white"
                            : "bg-gray-100 hover:bg-gray-200"
                    }`}
                >
                    {page}
                </button>
            ))}
            <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
                다음
            </button>
        </div>

    )
}
export default Pagination