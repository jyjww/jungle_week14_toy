import './assets/App.css'
import { BrowserRouter as Router, Routes, Route, Link, BrowserRouter} from 'react-router-dom'

import AppLayout from './Applayout'

import Homepage from './pages/Home/Home'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Mypage from './pages/Auth/Mypage'
import Board from './pages/Board/Board'
import BoardDetail from './pages/Board/BoardDetail'
import BoardEdit from './pages/Board/BoardEdit'

function App() {
    return (
        <BrowserRouter>
                <Routes>
                <Route path="/" element={<Homepage/>} />
                {/* Auth */}
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>} />
                <Route path="/mypage" element={<AppLayout><Mypage></Mypage></AppLayout>} />
                {/* Board */}
                <Route path="/board" element={<AppLayout><Board /></AppLayout>} />
                <Route path="/board/:id" element={<AppLayout><BoardDetail /></AppLayout>} />
                <Route path="/board/edit/:id" element={<AppLayout><BoardEdit/></AppLayout>} />
                <Route path="/board/write" element={<AppLayout><BoardEdit/></AppLayout>} />
                
            </Routes>
        </BrowserRouter>
    )
}

export default App;
