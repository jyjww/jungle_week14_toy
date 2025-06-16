import { useState } from 'react';

interface CommentFormProps {
    onAddComment?: (content: string) => void;
}

function CommentForm({ onAddComment }: CommentFormProps) {
    const [content, setContent] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (content.trim() === '') return;

        onAddComment?.(content);
        setContent('');
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4 space-y-2">
        <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="댓글을 입력하세요"
            className="w-full border rounded p-2 text-sm resize-none"
            rows={3}
        />
        <div className="text-right">
            <button
            type="submit"
            className="bg-blue-600 text-white text-sm px-4 py-1 rounded hover:bg-blue-700"
            >
            등록
            </button>
        </div>
        </form>
    );
}

export default CommentForm;
