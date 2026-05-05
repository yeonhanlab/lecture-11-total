import { Link, useParams } from "react-router";
import { useEffect, useState } from "react";
import type { PostType } from "./BoardPage.tsx";
import styled from "styled-components";


const Loading = styled.div`
    text-align: center;
    padding: 100px;
    font-size: 1.1rem;
    color: ${props => props.theme.colors.text.default};
`;

const Container = styled.div`
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    padding: 60px 20px;
`;

const Topbar = styled.div`
    display: flex;
    justify-content: flex-start;
    margin-bottom: 5px;
    padding-left: 4px;
`;


const Linked = styled(Link)`
    text-decoration: none;
    font-size: 14px;
    margin-bottom: 32px;
    padding: 8px 12px;
    border-radius: 16px;
    background-color: ${props => props.theme.colors.background.paper};
    color: ${props => props.theme.colors.text.default};
    border: none;
    font-weight: bold;
    cursor: pointer;

    &:hover {
        background: ${props => props.theme.colors.primary};
        color: white;
    }
`;

const Article = styled.div`
    padding: 30px;
    border-radius: 16px;
    background-color: ${props => props.theme.colors.background.paper};
`;

const Title = styled.h2`
    font-size: 2.5rem;
    font-weight: 800;
    color: #111;
    margin-bottom: 24px;
`;

const Content = styled.div`
    color: #888;
    margin-bottom: 40px;
`;

const Post = styled.div`
    font-size: 1.15rem;
    line-height: 1.8;
    white-space: pre-wrap; 
`;

function BoardDetail() {
    const { id } = useParams();
    const [loading, setLoading] = useState<boolean>(true);
    const [post, setPost] = useState<PostType | null>(null);

    useEffect(() => {
        if (!id) return;

        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then(res => res.json())
            .then((json: PostType) => {
                setPost(json);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <Loading>본문을 불러오는 중입니다...</Loading>;
    }

    if (!post) {
        return <Loading>본문을 불러오는 중입니다...</Loading>;
    }

    return (
        <Container>
            <Topbar>
                <Linked to={"/Board"}>&larr; Back</Linked>
            </Topbar>
            <Article>
                <Title>{post.title}</Title>
                <Content>
                    <span>{post.id}</span>
                    <span style={{ margin: "0 12px" }}>|</span>
                    <span>작성자: {post.userId}</span>
                </Content>
                <Post>{post.body}</Post>
            </Article>
        </Container>
    );
}

export default BoardDetail;
