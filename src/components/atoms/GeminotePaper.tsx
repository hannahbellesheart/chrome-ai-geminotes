import styled from 'styled-components';

const GeminotePaper = styled.div`
    background-color: ${({ theme }) => theme.palette.white};
    border-radius: ${({ theme }) => theme.border.radius};
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: ${({ theme }) => theme.spacing(2)};
`;

export default GeminotePaper;
