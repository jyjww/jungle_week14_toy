import React, { useState } from 'react'

interface ForgotPasswordProps {
    onClose: () => void
}

function ForgotPassword({ onClose }: ForgotPasswordProps) {
    const [email, setEmail] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // TODO: API 연동 로직
        alert(`재설정 링크가 ${email}로 전송되었습니다.`)
        onClose() // 모달 닫기
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-sm shadow-lg relative">
                <h3 className="text-lg font-semibold mb-4">비밀번호 재설정</h3>
                <p className="text-sm mb-4">비밀번호 재설정 링크를 이메일로 보내드립니다.</p>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="이메일을 입력하세요"
                        className="w-full px-3 py-2 border border-gray-300 rounded mb-4"
                        required
                    />
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-gray-500 hover:underline text-sm"
                        >
                            취소
                        </button>
                        <button
                            type="submit"
                            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                        >
                            보내기
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword