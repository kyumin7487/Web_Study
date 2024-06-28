import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import './main.css';

const MainPage = () => {

    const api = `http://www.batangsoft.com/`;
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${api}bbs`)
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setData(data);
                } else{
                    console.log('데이터가 리스트 안에 없습니다.', data);
                    setData([]);
                }
            })
            .catch(error => console.log('데이터에 오류가 있습니다', error));
    }, []);

    const handleWriteClick = (e) => {
        navigate('/write');
    };

    const handleItemClick = (idx) => {
        navigate(`/sub/${idx}`);
    }

    return(
        <div className='mainWrap'>
            {/*  글 쓰기 버튼  */}
            <button onClick={handleWriteClick} className='writeButton'>글 쓰기</button>
            {/*  글 리스트  */}
            <ul className='postList'>
                {data.map((item) => (
                    // 각 게시글 항목
                    <li key={item.idx} className='postLt' onClick={() => handleItemClick(item.idx)}>
                        <h2 className='postTitle'>{item.title}</h2>
                        <p>작성자: {item.writer}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MainPage;