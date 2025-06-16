import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

interface LikeButtonProps {
    targetId: number;
    targetType: 'post' | 'comment';
}

function LikeButton({ targetId, targetType }: LikeButtonProps) {
    const [liked, setLiked] = useState(false);
    const [count, setCount] = useState(0);

    useEffect(() => {
        // TODO: 서버에서 좋아요 수와 상태 불러오기
    }, [targetId, targetType]);

    const handleToggle = () => {
        setLiked((prev) => !prev);
        setCount((prev) => (liked ? prev - 1 : prev + 1));

        // TODO: 서버로 좋아요 토글 전송
    };

    return (
        <button
        onClick={handleToggle}
        className="flex items-center space-x-1 hover:opacity-80 transition"
        >
        <Heart
            size={20}
            fill={liked ? 'red' : 'none'}
            className={liked ? 'text-red-500' : 'text-gray-400'}
        />
        <span className="text-sm text-gray-700">{count}</span>
        </button>
    );
}

export default LikeButton;
