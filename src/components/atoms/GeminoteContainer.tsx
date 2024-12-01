import styled from 'styled-components';

const GeminoteContainer = styled.div<{
    variant?: 'large' | 'medium' | 'small' | 'full';
}>`
    margin: 0 auto;
    ${({ variant }) => {
        switch (variant) {
            case 'large':
                return `
                    max-width: 1440px;
                    width: 95%;
                `;
            case 'full':
                return `
                    width: 100%;
                `;
            case 'small':
                return `
                    max-width: 600px;
                    width: 80%;
                `;
            case 'medium':
            default:
                return `
                    max-width: 960px;
                    width: 90%;
                `;
        }
    }}
`;

export default GeminoteContainer;
