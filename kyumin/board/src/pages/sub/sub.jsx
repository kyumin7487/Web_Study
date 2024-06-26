import React, { useState, useEffect } from 'react'; // React 및 필요한 훅 import
import { useParams, useNavigate } from 'react-router-dom'; // useParams, useNavigate 훅 import
import Modal from 'react-modal'; // 모달 컴포넌트 import
import './sub.scss' // CSS 파일 import

const Sub = () => {
    const { idx } = useParams(); // URL 파라미터에서 idx 값 가져오기
    const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅 사용
    const apiUrl = `http://www.batangsoft.com/`; // API URL 설정
    const [data, setData] = useState(null); // 데이터를 저장할 state 변수 설정
    const [modalIsOpen, setModalIsOpen] = useState(false); // 모달의 열림 상태를 관리할 state 변수 설정
    const [password, setPassword] = useState(''); // 입력된 비밀번호를 저장할 state 변수 설정

    useEffect(() => {
        // 컴포넌트가 마운트될 때 데이터를 가져오는 useEffect 훅
        fetch(`${apiUrl}bbs/${idx}`) // API 호출
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok'); // 응답이 실패한 경우 오류 발생
                }
                return response.json(); // 응답을 JSON 형태로 파싱
            })
            .then(data => {
                // 데이터를 성공적으로 가져온 경우
                if (data) {
                    setData(data); // 데이터를 state에 저장
                } else {
                    console.error('Fetched data is not valid:', data); // 데이터가 유효하지 않은 경우 오류 로그
                    setData(null); // state를 null로 설정
                }
            })
            .catch(error => console.error('Error fetching data:', error)); // 데이터 가져오기 실패 시 오류 로그
    }, [idx]); // idx가 변경될 때마다 실행

    const handleDelete = async () => {
        // 삭제 버튼 클릭 시 호출되는 함수
        if (window.confirm('정말 삭제하시겠습니까?')) { // 삭제 확인
            try {
                const response = await fetch(`${apiUrl}bbs/${idx}`, {
                    method: 'DELETE', // DELETE 메서드 사용
                    headers: {
                        'Content-Type': 'application/json', // 헤더 설정
                    },
                    body: JSON.stringify({ password }), // 비밀번호 포함하여 요청 본문 설정
                });

                if (response.ok) {
                    alert('삭제되었습니다'); // 삭제 성공 시 알림
                    navigate('/'); // 메인 페이지로 이동
                } else {
                    alert('삭제에 실패했습니다. 비밀번호를 확인해주세요.'); // 삭제 실패 시 알림
                }
            } catch (error) {
                console.error('Error:', error); // 삭제 중 오류 발생 시 오류 로그
                alert('삭제 중 오류가 발생했습니다.'); // 오류 발생 시 알림
            }
        }
    };

    const openModal = () => {
        // 모달 열기
        setModalIsOpen(true);
    };

    const closeModal = () => {
        // 모달 닫기
        setModalIsOpen(false);
    };

    const handlePasswordChange = (e) => {
        // 비밀번호 입력 시 호출되는 함수
        setPassword(e.target.value);
    };

    const handlePasswordSubmit = (e) => {
        // 엔터 키 입력 시 호출되는 함수
        if (e.key === 'Enter') {
            closeModal(); // 모달 닫기
            handleDelete(); // 삭제 함수 호출
        }
    };

    if (!data) {
        // 데이터가 로딩 중일 때 표시
        return <div>Loading...</div>;
    }

    return (
        <div className='subWrap'>
            {/* 게시글 내용 표시 */}
            <div className='item'>
                <h2>{data.title}</h2>
                <p>{data.content}</p>
                <p>작성자: {data.writer}</p>
            </div>
            {/* 목록 버튼 */}
            <button onClick={() => navigate('/')}>목록</button>
            {/* 삭제 버튼 */}
            <button onClick={openModal}>삭제</button>
            {/* 비밀번호 입력 모달 */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="비밀번호 입력"
            >
                <h2>비밀번호 입력</h2>
                <input
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    onKeyDown={handlePasswordSubmit}
                />
                <button onClick={closeModal}>닫기</button>
            </Modal>
        </div>
    );
};

export default Sub; // Sub 컴포넌트 export
