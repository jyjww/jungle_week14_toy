# Jungle : Week14 Toy Project

*@yyz_code*  
2025.06.13 ~ 2025.06.19

---

## GitHub Repo

[https://github.com/jyjww/jungle_week14_toy](https://github.com/jyjww/jungle_week14_toy)

## Dev Log

- [프로젝트 기획안 (Notion)](https://www.notion.so/jyjww/Jungle-Week14-Toy-Project-211ced561b75807a8782f684daa737a3?source=copy_link)
- [Week14 Toy Project - 개발 일지 (TIL)](https://yyz-code.tistory.com/77)

---

### 💬 프로젝트 소개

React + Express.js 기반의 간단한 투두형 게시판 프로젝트입니다.  
클라이언트와 서버를 분리하여 기본적인 CRUD 및 인증 흐름을 구현했습니다.

---

### 📁 프로젝트 구조

src/
├── assets/
│   ├── App.css
│   ├── index.css
│   └── output.css                  # Tailwind build 결과물

├── components/
│   ├── Auth/
│   │   ├── ForgotPassword.tsx     # 비밀번호 찾기 진입용 텍스트/버튼
│   │   └── PasswordChangeModal.tsx # 비밀번호 변경 모달창
│   ├── Board/
│   │   ├── BoardSearchBar.tsx     # 게시판 검색 필터 바
│   │   ├── LikeButton.tsx         # 게시글/댓글 공용 좋아요 버튼
│   │   └── Pagination.tsx         # 페이지네이션 컴포넌트
│   ├── Header/

├── pages/
│   ├── Auth/
│   │   ├── Login.tsx              # 로그인
│   │   ├── Register.tsx           # 회원가입
│   │   └── MyPage.tsx             # 마이페이지
│   ├── Board/
│   │   ├── Board.tsx              # 게시글 목록 + 검색/페이지네이션
│   │   ├── BoardDetail.tsx        # 게시글 상세 보기 + 댓글/좋아요
│   │   ├── BoardEdit.tsx          # 게시글 작성/수정 페이지
│   │   └── CommentsBar.tsx        # 전체 댓글 기능 래퍼
│   └── Home/
│       └── Home.tsx               # 홈 화면

├── App.tsx                        # 라우팅 포함 전체 앱 구성
├── Applayout.tsx                  # 공통 레이아웃 (헤더, 푸터 등)
└── data.ts                        # 더미 데이터 및 타입

---

### ✅ 주요 기능

- 회원가입 / 로그인
- 게시글 목록 조회, 작성, 삭제, 좋아요
- 댓글 작성 및 삭제
- 페이지네이션 및 검색
- 게시글 좋아요
- JWT 인증

---

### 🧱 기술 스택

| Category           | Tech Stack                                  |
|--------------------|----------------------------------------------|
| **Languages**      | TypeScript                                   |
| **Frontend**       | React, Vite, Tailwind CSS                    |
| **Backend**        | Express.js (Node.js)                         |
| **API 방식**       | REST API + JWT 인증                          |
| **Version Control**| Git + GitHub                                 |
| **Cloud/Deploy**   | (미정)                                         |

---

### ⚙️ 설치 방법

```bash
# 1. 레포지토리 클론
git clone https://github.com/jyjww/jungle_week14_toy.git
cd jungle_week14_toy

# 2. 클라이언트 설치 및 실행
cd client
npm install
npm run dev

# 3. 서버 설치 및 실행
cd ../server
npm install
npm run dev
