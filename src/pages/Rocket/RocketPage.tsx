import { useEffect, useState } from "react";
import { AiFillContainer } from "react-icons/ai";
import styled from "styled-components";

type Rocket = {
    id: string;
    name: string;
    description: string;
    active: boolean;
    cost_per_launch: number;
    country: string;
    flicker_images: string[];
};

const Container = styled.div`
    min-height: 100vh;
    background-color: #0b0e14; /* 깊은 우주 느낌의 블랙 */
    color: #f8fafc;
    font-family: 'Pretendard', sans-serif;
`;

const Header = styled.header`
    padding: 80px 24px;
    text-align: center;
    /* 우주 성운 느낌의 그라데이션 */
    background: radial-gradient(circle at top left, #1e293b, #0b0e14),
    linear-gradient(135deg, #ef4444 0%, #3b82f6 100%);
    background-blend-mode: overlay;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const Title = styled.h2`
    margin: 0;
    font-size: 3rem;
    font-weight: 900;
    letter-spacing: -0.05em;

`;

const Main = styled.main`
    padding: 48px 24px;
    max-width: 1240px;
    margin: 0 auto;
`;

const Loading = styled.div`
    text-align: center;
    padding: 100px;
    font-size: 1.2rem;
    color: #64748b;
    letter-spacing: 0.2em;
    text-transform: uppercase;
}

/* 모바일 대응 (화면이 작아지면 1열로) */
@media (max-width: 1024px) {
    .flexItem {
        flex: 0 1 calc((100% - 30px) / 2); /* 2열 */
    }
}
{
@media (max-width: 680px) {
    .flexItem {
        flex: 0 1 100%; /* 1열 */
    }
}
`;

const FlexContainer = styled.div`
    display: flex;
    flex-wrap: wrap; /* 줄바꿈 허용 */
    gap: 30px; /* 아이템 간 간격 */
    justify-content: flex-start;
`;

const FlexItem = styled.div`
    flex: 0 1 calc((100% - 60px) / 3); /* 기본 3열 */
    min-width: 300px; /* 모바일 대응을 위한 최소 너비 */

`;


function RocketPage() {

    const [loading, setLoading] = useState(true);
    const [rockets, setRockets] = useState<Rocket[]>([]);

    useEffect(() => {
        fetch("https://api.spacexdata.com/v4/rockets")
            .then(res => res.json())
            .then((data: Rocket[]) => {
                setRockets(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Fetch error", err);
                setLoading(false);
            });
    }, []);

    return (
        <Container>
            <Header>
                <Title>🚀 SpaceX Archive<</Title>
            </Header>

            <Main>
                {loading ? (
                    <Loading>SCANNING FOR ROCKETS...</Loading>
                ) : (
                    <FlexContainer>
                        {rockets.map(rocket => (
                            <FlexItem key={rocket.id}>
                                <RocketCard data={rocket} />
                            </FlexItem>
                        ))}
                    </FlexContainer>
                )}
            </Main>
        </Container>);
}

export default RocketPage;