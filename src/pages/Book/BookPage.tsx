import styled from "styled-components";
import BookSearchBar from "./components/BookSearchBar.tsx";


const Title = styled.h2`
    font-size: 32px;
    font-weight: 800;
    text-align: center;
    margin-bottom: 45px;
    color: ${props => props.theme.colors.primary};
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    padding: 50px;
    gap: 16px;
    height: 100vh;
`;

const Main = styled.main`
    gap: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    border-radius: 16px;
    background-color: ${props => props.theme.colors.background.paper};
    border: 1px solid ${props => props.theme.colors.divider};
`;

function BookPage() {
    return (
        <Content>
            <Title>Google Books</Title>
            <Main>
                <BookSearchBar/>
            </Main>
        </Content>);
}

export default BookPage;