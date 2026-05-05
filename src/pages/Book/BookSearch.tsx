import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import styled from "styled-components";
import BookSearchBar from "./BookSearchBar.tsx";
import BookCard from "./BookCard.tsx";

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

export type BookItem = {
    id: string;
    volumeInfo: {
        title: string;
        author?: string[];
        description?: string;
        publishedDate: string;
        imageLinks?: {
            thumbnail?: string;
            smallThumbnail?: string;
        };
    };
};

type ApiResponseType = { items: BookItem[] };

const Wrap = styled.div`
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
`;

const Head = styled.header`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    color: ${props => props.theme.colors.primary};
    background-color: ${props => props.theme.colors.background.paper};
    border: 1px solid ${props => props.theme.colors.divider};
`;

const List = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-top: 50px;
`;

const Title = styled.span`
    font-size: 20px;
    font-weight: bold;
    text-align: left;
    padding: 10px;
`;

function BookSearch() {
    const [list, setList] = useState<BookItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [searchParams] = useSearchParams();
    const k = searchParams.get("keyword");

    useEffect(() => {
        if (!k) return;

        setLoading(true);
        setList([]);
        setError("");

        fetch(
            `https://www.googleapis.com/books/v1/volumes?q=${k}&maxResults=20&key=${API_KEY}`,
        )
            .then(res => res.json())
            .then((json: ApiResponseType) => {
                setList(json.items);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setError("검색하는데 오류가 발생하였습니다.");
                setLoading(false);
            });
    }, [k]);

    return (
        <Wrap>
            <Head>
                <Title>검색 결과 : {k} </Title>
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                <BookSearchBar />
            </Head>
            <List>
                {list.map((value, index) => (
                    <BookCard key={index} book={value} />
                ))}
            </List>
        </Wrap>
    );
}

export default BookSearch;
