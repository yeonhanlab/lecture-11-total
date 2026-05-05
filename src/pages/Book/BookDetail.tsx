import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import type { BookItem } from "./BookSearch.tsx";
import styled from "styled-components";

const Loading = styled.div`
    padding: 30px;
`;

const Wrap = styled.div`
    padding: 30px;
`;

const Button = styled.button`
    display: flex;
    align-content: center;
    padding: 8px 14px;
    border-radius: 6px;
    border: 1px solid #ccc;
    background-color: #f3f3f3;
    color: #333;
    cursor: pointer;
    transition: all 0.5s;

    &:hover {
        background: #e0e0e0;
        border-color: #999;
    }
`;

const Cover = styled.img`
    width: 200px;
    height: 300px;
    border-radius: 8px;
    margin-bottom: 20px;
`;

function BookDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState<BookItem | null>(null);
    const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

    useEffect(() => {
        if (!id) return;
        fetch(`https://www.googleapis.com/books/v1/volumes/${id}?key=${API_KEY}`)
            .then(res => res.json())
            .then(json => {
                setBook(json);
            })
            .catch(err => {
                console.log(err);
            });
    }, [id]);

    if (!book) return <Loading>Loading...</Loading>;

    return (
        <Wrap>
            <Button
                onClick={() => {
                    navigate(-1);
                }}>
                &larr; 뒤로 가기
            </Button>
            <h2>{book.volumeInfo.title}</h2>
            {book.volumeInfo.imageLinks ? (
                <Cover src={book.volumeInfo.imageLinks.thumbnail} />
            ) : (
                <Cover>No Cover</Cover>
            )}
            <p>{book.volumeInfo.author?.join(", ")}</p>
            {/*
                 dangerouslySetInnerHTML 속성
                 - 사용자가 입력한 내용을 그대로 렌더링할 때 사용
                 - 사용할 때 주의가 필요함
                 - 혹시라도, 해당 내용에 "악성코드"가 포함이 되어져 있다면
                 - 그것조차 그대로 실행됨

                 사용법 : dangerouslySetInnerHTML={{ __html: '내용' }}
            */}
            <p dangerouslySetInnerHTML={{ __html: book.volumeInfo.description || "설명 없음" }}></p>
        </Wrap>
    );
}

export default BookDetail;
