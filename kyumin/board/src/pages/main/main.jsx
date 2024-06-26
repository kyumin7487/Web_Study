import React, { useState, useEffect } from 'react'; // React 및 필요한 훅 import
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 import
import './main.scss'; // CSS 파일 import

const Main = () => {
    const apiUrl = `http://www.batangsoft.com/`; // API URL 설정
    const [data, setData] = useState([]); // 데이터를 저장할 state 변수 설정
    const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅 사용

    useEffect(() => {
        // 컴포넌트가 마운트될 때 데이터를 가져오는 useEffect 훅
        fetch(`${apiUrl}bbs`) // API 호출
            .then(response => response.json()) // 응답을 JSON 형태로 파싱
            .then(data => {
                // 데이터를 성공적으로 가져온 경우
                if (Array.isArray(data)) {
                    setData(data); // 데이터가 배열인 경우 state에 저장
                } else {
                    console.error('Fetched data is not an array:', data); // 데이터가 배열이 아닌 경우 오류 로그
                    setData([]); // 빈 배열로 설정
                }
            })
            .catch(error => console.error('Error fetching data:', error)); // 데이터 가져오기 실패 시 오류 로그
    }, []); // 빈 배열을 두 번째 인자로 전달하여 컴포넌트 마운트 시 한 번만 실행

    const handleItemClick = (idx) => {
        // 리스트 항목 클릭 시 호출되는 함수
        navigate(`/sub/${idx}`); // 해당 항목의 idx를 사용하여 페이지 이동
    };

    const handleWriteClick = () => {
        // 글쓰기 버튼 클릭 시 호출되는 함수
        navigate('/write'); // 글쓰기 페이지로 이동
    };

    return (
        <div className='main-wrapper'>
            {/* 글쓰기 버튼 */}
            <button onClick={handleWriteClick} className='write-button'>글쓰기</button>
            {/* 게시글 리스트 */}
            <ul className='post-list'>
                {data.map((item) => (
                    // 각 게시글 항목
                    <li key={item.idx} className='post-item' onClick={() => handleItemClick(item.idx)}>
                        <h2 className='post-title'>{item.title}</h2> {/* 게시글 제목 */}
                        <p className='post-writer'>작성자: {item.writer}</p> {/* 작성자 */}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Main; // Main 컴포넌트 export
