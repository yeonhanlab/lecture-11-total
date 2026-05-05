import { useNavigate } from "react-router";
import { type ChangeEvent, type SubmitEvent, useState } from "react";
import styled from "styled-components";

const Box = styled.form`
    display: flex;
    gap: 10px;
    width: 100%;
    
`;

const Input = styled.input`
    padding: 12px;
    border-radius: 8px;
    border: 1px solid ${props => props.theme.colors.divider};
    background-color: ${props => props.theme.colors.background.default};
    color: ${props => props.theme.colors.text.default};
    font-size: 16px;
    outline: none;
    width: 100%;
    flex: 1;

    &:focus {
        border-color: ${props => props.theme.colors.primary};
    }
`;

const Button = styled.button`
    padding: 16px;
    border: none;
    background-color: ${props => props.theme.colors.primary};
    color: white;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 700;
    display: flex;
    align-items: center;
    transition: all 0.5s;
    
    &:hover {
        opacity: 0.9;
    }

`;

function SearchBar() {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState("");
    const onSubmit = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        const k = keyword.trim();
        if (!k) return;
        navigate(`/movie-search?keyword=${encodeURIComponent(k)}`);
    };

    const onChange = (event: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        setKeyword(event.target.value);
    };

    return (
        <Box onSubmit={onSubmit}>
            <Input onChange={onChange} placeholder={"영화 제목을 입력하세요."} />
            <Button type={"submit"}>검색</Button>
        </Box>
    );
}

export default SearchBar;
