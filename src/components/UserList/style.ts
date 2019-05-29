import styled from 'styled-components';

export const UserListContainer = styled.div`
    position: relative;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 42px;
`;

export const NextButton = styled.a`
    color: #000;
    font-size: 30px;
    position: absolute;
    top: 50%;
    right: 0;
    transition: all 0.1s;

    &:active {
        transform: scale(0.8)
    }
`;

export const PreviousButton = styled.a`
    color: #000;
    font-size: 30px;
    position: absolute;
    top: 50%;
    left: 0;
    transition: all 0.1s;

    &:active {
        transform: scale(0.8)
    }
`