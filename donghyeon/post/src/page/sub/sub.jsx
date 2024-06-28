import React, {useState, useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";
import Modal from 'react-modal';
import './sub.css';

const sub = () => {

    const {idx } = useParams();
    const navigate = useNavigate();
    const api = `http://www.batangsoft.com/`;
    const [data, setData] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [password, setPassword] = useState('');

    useEffect(() => {
        fetch(`${api}bbs/${idx}`)
            .then((response) => {
                if(!response.ok){
                    throw new Error('Network response was not ok.');
                }
                return response.json();
            })
            .then((data) => {
                if (data) {
                    setData(data);
                } else{
                    console.error('Fetched data is not valid', data);
                    setData(null);
                }
            })
            .catch(error => console.error('Error fetching data', error));
    }, [idx]);

    const handleDelete = async () => {
        if(window.confirm('Are you sure?')) {
            try{
                const response = await fetch(`${api}bbs/${idx}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify({password}),
                });
                if(response.ok){
                    alert('삭제 되었습니다');
                    navigate('/');
                } else {
                    alert('삭제에 실패했습니다. 비밀번호를 확인해주세요.');
                }
            } catch(error) {
                console.error('Error:', error);
                alert('삭제 도중 오류가 발생했습니다.')
            }
        }
    };

    const openModal = () => {
        setModalIsOpen(true);
    }

    const closeModal = () => {
        setModalIsOpen(false);
    }

    const handlePWChange = (e) => {
        setPassword(e.target.value);
    }

    const handlePWSubmit = (e) => {
        if (e.key === 'Enter') {
            closeModal()
            handleDelete()
        }
    };

    if (!data) {
        return (
            <div>Loading......</div>
        )
    }


    return(
        <div className="subWrap">
            <div className='item'>
                <h2>{data.title}</h2>
                <p>{data.content}</p>
                <p>작성자: {data.writer}</p>
            </div>
            <button onClick={() => navigate('/')}>목록</button>
            <button onClick={openModal}>삭제</button>
            <Modal
                isOpen = {modalIsOpen}
                onRequestClose = {closeModal}
                contentLabel = '비밀번호 입력'
                >
                <h2>비밀번호 입력</h2>
                <input
                    type='password'
                    value={password}
                    onChange={handlePWChange}
                    onKeyDown={handlePWSubmit}
                />
                <button onClick={closeModal}>닫기</button>
            </Modal>
        </div>
    );
};

export default sub