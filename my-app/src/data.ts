export type Post = {
    id: number
    title: string
    author: string
    date: string
    viewed: number
    likes: number
    content: string
}

export interface Comment {
    id: number          // ✅ 댓글 자체의 ID
    postId: number      // ✅ 이 댓글이 어떤 게시글에 달린 것인지
    author: string
    content: string
    createdAt: string;
}

export const dummyPosts: Post[] = [
    {
    id: 1,
    title: '첫 번째 게시글입니다',
    author: '관리자',
    date: '2025-06-15',
    viewed: 123,
    likes: 10,
    content: '첫 번째 게시글의 본문입니다',
    },
    {
    id: 2,
    title: '두 번째 게시글입니다',
    author: '사용자1',
    date: '2025-06-14',
    viewed: 78,
    likes: 5,
    content: '두 번째 게시글의 본문입니다',
    },
    {
    id: 3,
    title: '세 번째 게시글입니다',
    author: '사용자2',
    date: '2025-06-13',
    viewed: 42,
    likes: 2,
    content: '세 번째 게시글의 본문입니다',
    },
]

/* User test */
export const dummyUser = [
    {
    username: 'admin@111.com',
    name : '관리자',
    password: 'admin',
    token: 'fake-jwt-token',
    profileImage: '../public/default_profile.jpg'
    },
    {   
    username: 'user1@111.com',
    name : '사용자1',
    password: 'user',
    token: 'user1-jwt-token',
    profileImage: '../public/default_profile.jpg'
    }
]

export const dummyComments: Comment[] = [
    {
    id: 1,
    postId: 1,
    author: 'yeji_dev',
    content: '이 글 정말 유익하네요! 잘 보고 갑니다.',
    createdAt: '2025-06-15T10:30:00Z',
    },
    {
    id: 2,
    postId: 1,
    author: 'react_god',
    content: 'useEffect 정리 방식이 깔끔해서 이해가 잘 됐어요 👏',
    createdAt: '2025-06-15T12:45:00Z',
    },
    {
    id: 3,
    postId: 1,
    author: 'frontend_fox',
    content: '혹시 tailwind 설정 파일 공유 가능할까요?',
    createdAt: '2025-06-15T15:12:00Z',
    },
    {
    id: 4,
    postId: 1,
    author: 'code_maker',
    content: '댓글 기능 완전 잘 만든 듯! 저도 참고해볼게요 🙌',
    createdAt: '2025-06-15T18:27:00Z',
    },
];
