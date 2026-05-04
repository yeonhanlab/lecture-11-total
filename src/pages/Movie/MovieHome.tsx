import SearchBar from "./SearchBar.tsx";
import styled from "styled-components";

export type MovieItem = {
    imdbID: string;
    Poster: string;
    Title: string;
    Year: string;
};

const Title = styled.h2`
    font-size: 28px;
    font-weight: 800;
    text-align: center;
    color: ${props => props.theme.colors.primary};
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    height: 100vh;
`;

const Main = styled.main`
    gap: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    border-radius: 16px;
    background-color: ${props => props.theme.colors.background.paper};
    border: 1px solid ${props => props.theme.colors.divider};
`;


function MovieHome() {
    return (
        <Content>
                <Title>Movie Search</Title>
            <Main>
                <SearchBar />
            </Main>
        </Content>
    );
}

export default MovieHome;
