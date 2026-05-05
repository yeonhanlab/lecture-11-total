import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router";

export type PostType = {
    userId: number;
    id: number;
    title: string;
    body: string;
};

const Loading = styled.div`
    padding: 100px;
    text-align: center;
    font-size: 1.1rem;
    color: ${props => props.theme.colors.text.default};
`;

const Container = styled.div`
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
    padding: 0 20px;
`;

const Title = styled.h2`
    font-size: 1.8rem;
    font-weight: 700;
    margin-bottom: 35px;
    text-align: center;
    color: ${props => props.theme.colors.primary};
`;

const Table = styled.table`
    background-color: ${props => props.theme.colors.background.paper};
    border: 1px solid ${props => props.theme.colors.divider};
    width: 100%;
    border-collapse: collapse;
    border-radius: 16px;
    overflow: hidden;
    
`;

const Th = styled.th`
    padding: 16px 14px;
    font-size: 15px;
    font-weight: 600;
    color: ${props => props.theme.colors.text.default};
    border-bottom: 1px solid ${props => props.theme.colors.divider};
    text-align: center;
`;


const Linked = styled(Link)`
    text-decoration: none;
    color: ${props => props.theme.colors.text.default};
    width: 100%;
    display: block;

    &:hover {
        color: ${props => props.theme.colors.primary};
    }
`;

const Tr = styled.tr`
    transition: all 0.2s;

    &:hover {
        background-color: ${props => props.theme.colors.background.default};
    }
`;

const Td = styled.td`
    padding: 16px 10px;
    border-bottom: 1px solid ${props => props.theme.colors.divider};
`;

const No = styled.td`
    width: 80px;
    text-align: center;
    font-size: 14px;
`;


function BoardPage() {
    const [loading, setLoading] = useState<boolean>(true);
    const [posts, setPosts] = useState<PostType[]>([]);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then(res => res.json())
            .then((json: PostType[]) => {
                setPosts(json);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    if (loading) {
        return <Loading>"데이터를 로드 중입니다..." </Loading>;
    }

    return (
        <Container>
            <Title>Community Area</Title>
            <Table>
                <thead>
                    <tr>
                        <Th>No.</Th>
                        <Th>Title</Th>
                        <Th>User ID</Th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((value, index) => (
                        <Tr key={index}>
                            <No>{value.id}</No>
                            <Td>
                                <Linked to={`/board-detail/${value.id}`}>{value.title}</Linked>
                            </Td>
                            <No>{value.userId}</No>
                        </Tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}

export default BoardPage;
