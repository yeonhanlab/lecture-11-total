import SearchBar from "./SearchBar.tsx";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

export type MovieItem = {
    imdbID: string;
    Poster: string;
    Title: string;
    Year: string;
};

const Title = styled.h2`
    font-size: 28px;
    font-weight: 800;
    color: ${props => props.theme.colors.primary};
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;


const Main = styled.main`
    gap: 20px;
    display: flex;
    flex-direction: column;
    padding: 20px;
    border-radius: 16px;
    background-color: ${props => props.theme.colors.background.paper};
    border: 1px solid ${props => props.theme.colors.divider};
    
`;
const Box = styled.div`
    width: 100%;
    background-color: ${props => props.theme.colors.background.paper};
    flex: 1;
    border-radius: 16px;
`;

const Result = styled.h3`
    text-align: left;
    font-size: 14px;
    font-weight: 500;
    padding: 30px;
`;

const List = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-top: 100px;
`;


type ApiResponseType = { Search: MovieItem[] };

function MoviePage() {
    const [list, setList] = useState<MovieItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [searchParams] = useSearchParams();
    const k = searchParams.get("keyword");

    useEffect(() => {
        if (!k) return;
        setLoading(true);
        setList([]);
        setError("");

        fetch(`https://www.omdbapi.com/?apikey=6a0a8eb4&s=${k}`)
            .then(res => res.json())
            .then((json: ApiResponseType) => {
                setList(json.Search);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setError("검색하는데 오류가 발생하였습니다.");
                setLoading(false);
            });
    }, [k]);

    return (
        <Content>
            <Main>
                <Title>Movie Search</Title>
                <SearchBar />
            </Main>
            <Box>
                <Result>검색 결과 : {k}</Result>

                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}

                <List>
                    {list.map((value, index) => (
                        <MovieCard movie={value} key={index} />
                    ))}
                </List>
            </Box>
        </Content>
    );
}

export default MoviePage;
