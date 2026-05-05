import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import styled from "styled-components";

type MovieDetail = {
    Title: string;
    Year: number;
    Poster: string;
    Plot: string;
    Genre: string;
    Director: string;
};

const Wrap = styled.div`
    padding: 40px;

    img {
        width: 240px;
        border-radius: 12px;
    }
`;

const BackButton = styled.button`
    position: absolute; /* [중요] 스티커 선언! */
    bottom: 20px;
    right: 20px;
    background-color: ${props => props.theme.colors.background.paper};
    color: ${props => props.theme.colors.text.default};
    padding: 10px 24px;
    border-radius: 30px;
    border: none;
    font-weight: bold;
    cursor: pointer;

    &:hover {
        background: ${props => props.theme.colors.primary};
        color: white;
    }
`;
const Content = styled.div`
    position: relative;
    display: flex;
    gap: 40px; /* 포스터와 설명 사이 간격 */
    padding: 60px 40px 90px;

    /* 화면이 좁아지면 세로로 정렬되게 (반응형) */
    @media (max-width: 768px) {
        flex-direction: column;
    }

    background-color: white;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    max-width: 1000px;

    /* 좌우 여백을 auto로 설정하면 박스가 화면 중앙으로 옴 */
    /* margin-left: auto;
    margin-right: auto; */

    /* (위 20px, 좌우 중앙, 아래 0) */
    margin: 30px auto 0;
`;

const PosterSection = styled.div`
    flex-shrink: 0; /* 포스터 크기 고정 */
    display: flex;
    flex-direction: column;
    align-items: flex-start; /* 왼쪽 정렬 */
    gap: 15px; /* 이미지와 버튼 사이 간격 */

    img {
        width: 300px;
        border-radius: 12px;
    }
`;

const InfoSection = styled.div`
    display: flex;
    flex-direction: column;

    h1 {
        font-size: 2.5rem;
        margin-bottom: 15px;
    }

    .meta-data {
        margin-bottom: 20px;
        p {
            margin: 5px 0;
            color: #666;
        }
    }
`;

const Plot = styled.p`
    line-height: 1.8;
    color: #333;
    max-width: 600px;
`;

function MovieDetail() {
    const { id } = useParams();
    const [movie, setMovie] = useState<MovieDetail | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) return;
        fetch(`https://www.omdbapi.com/?apikey=6a0a8eb4&i=${id}&plot=full`)
            .then(res => res.json())
            .then((json: MovieDetail) => {
                setMovie(json);
            })
            .catch(err => {
                console.log(err);
            });
    }, [id]);

    if (!movie) return <p>Loading...</p>;

    return (
        <Wrap>
            <Content>
                {/* 왼쪽 : 포스터 정보 */}
                <PosterSection>
                    <img src={movie.Poster} alt={movie.Title} />
                </PosterSection>

                {/* 오른쪽: 상세 정보 */}
                <InfoSection>
                    <h1>{movie.Title}</h1>
                    <div className="meta-data">
                        <p>
                            <strong>Year:</strong> {movie.Year}
                        </p>
                        <p>
                            <strong>Genre:</strong> {movie.Genre}
                        </p>
                        <p>
                            <strong>Director:</strong> {movie.Director}
                        </p>
                    </div>
                    <Plot>{movie.Plot}</Plot>
                </InfoSection>
                <BackButton onClick={() => navigate(-1)}>&larr; Back</BackButton>
            </Content>
        </Wrap>
    );
}

export default MovieDetail;
