import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './write.scss';

const Write = () => {
    // 환경 변수에서 API URL을 가져오거나 기본값을 설정합니다.
    const apiUrl = process.env.REACT_APP_API_URL || `http://www.batangsoft.com/`;

    // 상태 변수를 초기화합니다.
    const [title, setTitle] = useState(''); // 제목 상태 변수
    const [content, setContent] = useState(''); // 내용 상태 변수
    const [author, setAuthor] = useState(''); // 글쓴이 상태 변수
    const [password, setPassword] = useState(''); // 비밀번호 상태 변수

    const [error, setError] = useState(''); // 오류 메시지 상태 변수
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태 변수

    // 페이지 이동을 위한 네비게이트 훅을 사용합니다.
    const navigate = useNavigate();

    // 입력값이 4자 이상인지 확인하는 함수입니다.
    const validateInput = (input) => {
        return input.length >= 4; // 입력값이 4자 이상일 경우 true 반환
    }

    // 폼 제출 시 호출되는 함수입니다.
    const handleSubmit = async (e) => {
        e.preventDefault(); // 기본 폼 제출 동작을 방지합니다.

        // 입력값 유효성 검사를 수행합니다.
        if (!validateInput(title) || !validateInput(content) || !validateInput(author) || !validateInput(password)) {
            setError('모든 입력 항목은 4자 이상의 문자열이어야 합니다.'); // 입력값이 유효하지 않으면 오류 메시지를 설정합니다.
            return;
        }

        // 서버로 전송할 데이터를 준비합니다.
        const postData = {
            title, // 제목
            content, // 내용
            writer: author, // 글쓴이
            password // 비밀번호
        };

        // 로딩 상태를 true로 설정하고 오류 메시지를 초기화합니다.
        setIsLoading(true);
        setError('');

        try {
            // 서버에 게시물 데이터를 POST 요청으로 전송합니다.
            const response = await fetch(`${apiUrl}bbs`, {
                method: 'POST', // POST 메서드 사용
                headers: {
                    'Content-Type': 'application/json' // 요청 헤더에 JSON 형식 명시
                },
                body: JSON.stringify(postData) // 요청 본문에 게시물 데이터 추가
            });

            // 응답이 성공적이면 게시물 등록 성공 메시지를 표시하고 폼을 초기화합니다.
            if (response.ok) {
                alert('게시물이 성공적으로 등록되었습니다.'); // 성공 메시지 표시
                setTitle(''); // 제목 초기화
                setContent(''); // 내용 초기화
                setAuthor(''); // 글쓴이 초기화
                setPassword(''); // 비밀번호 초기화
                navigate('/'); // 메인 페이지로 이동
            } else {
                // 응답이 실패하면 오류 메시지를 표시합니다.
                alert('게시물 등록에 실패했습니다.'); // 실패 메시지 표시
            }
        } catch (error) {
            // 요청 중 오류가 발생하면 콘솔에 오류를 출력하고 메시지를 표시합니다.
            console.error('Error:', error); // 콘솔에 오류 출력
            alert('게시물 등록 중 오류가 발생했습니다.'); // 오류 메시지 표시
        } finally {
            // 로딩 상태를 false로 설정합니다.
            setIsLoading(false); // 로딩 상태 해제
        }
    }

    return (
        <div>
            <h1>게시물 작성</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>제목:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)} // 제목 입력값 변경 시 상태 업데이트
                        disabled={isLoading} // 로딩 중일 때 입력 비활성화
                    />
                </div>
                <div>
                    <label>내용:</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)} // 내용 입력값 변경 시 상태 업데이트
                        disabled={isLoading} // 로딩 중일 때 입력 비활성화
                    />
                </div>
                <div>
                    <label>글쓴이:</label>
                    <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)} // 글쓴이 입력값 변경 시 상태 업데이트
                        disabled={isLoading} // 로딩 중일 때 입력 비활성화
                    />
                </div>
                <div>
                    <label>비밀번호:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} // 비밀번호 입력값 변경 시 상태 업데이트
                        disabled={isLoading} // 로딩 중일 때 입력 비활성화
                    />
                </div>
                <button type="submit" disabled={isLoading}>저장</button> {/* 저장 버튼, 로딩 중일 때 비활성화 */}
            </form>
            {/* 오류 메시지를 표시합니다. */}
            {error && <p style={{color: 'red'}}>{error}</p>} {/* 오류 메시지가 있을 경우 빨간색으로 표시 */}
        </div>
    );
}

export default Write;
