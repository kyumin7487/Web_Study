import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import './write.css';
import {findAllByRole} from "@testing-library/react";

const write = () => {

    const api = process.env.REACT_APP_API || `http://www.batangsoft.com/`;

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const validateInput = (input) => {
        return input.length >= 4;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateInput(title) || !validateInput(content) || !validateInput(author) || !validateInput(password)) {
            setError('모든 입력 항목은 4자 이상의 문자열이어야 합니다. 다시 써주세요.');
            return;
        }

        const postData = {
            title,
            content,
            writer: author,
            password
        };

        setIsLoading(true);
        setError('');

        try{
            const response = await fetch(`${api}bbs`, {
                method: 'POST',
                headers:{
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({})
            });
            if(response.ok){
                alert('게시물이 성공적으로 등록되었습니당');
                setTitle('');
                setContent('');
                setAuthor('');
                setPassword('');
                navigate('/');
            } else{
                alert('게시물 등록에 실패했습니다ㅠㅠㅠㅠㅠ');
            }
        } catch (error){
            console.error('Error:', error);
            alert('게시물 등록 도중에 오류가 발생했습니다.')
        } finally {
            setIsLoading(false);
        }
    };



    return(
        <div>
            <h1>게시물 작성하기</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>제목:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        disabled={isLoading}
                    />
                </div>
                <div>
                    <label>내용:</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        disabled={isLoading}
                    />
                </div>
                <div>
                    <label>글쓴이:</label>
                    <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        disabled={isLoading}
                    />
                </div>
                <div>
                    <label>비밀번호:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isLoading}
                    />
                </div>
                <button type="submit" disabled={isLoading}>저장</button>
            </form>
            {error && <p style={{color:'red'}}>{error}</p>}
        </div>
    );
}

export default write;