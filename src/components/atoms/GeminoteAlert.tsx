import applyTypography from '@geminotes/themes/applyTypography';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface AlertProps {
    message: string;
    duration?: number;
    onClose?: () => void;
    state?: 'success' | 'warning' | 'error';
}

const getBackgroundColor = (
    state: 'success' | 'warning' | 'error',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    theme: any
) => {
    switch (state) {
        case 'success':
            return theme.palette.success;
        case 'warning':
            return theme.palette.warning;
        case 'error':
            return theme.palette.error;
        default:
            return theme.palette.error;
    }
};

const AlertContainer = styled.div<{ state: 'success' | 'warning' | 'error' }>`
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: ${({ state, theme }) => getBackgroundColor(state, theme)};
    color: ${({ theme }) => theme.palette.white};
    padding: ${({ theme }) => theme.spacing(2)};
    border-radius: 5px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    font-size: ${({ theme }) => applyTypography(theme.typography.body2)};
    z-index: 9999;
    transition: opacity 0.3s ease-in-out;

    animation: fadeOut 4s forwards;

    @keyframes fadeOut {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
            visibility: hidden;
        }
    }
`;

const GeminoteAlert: React.FC<AlertProps> = ({
    message,
    duration = 3000,
    onClose,
    state = 'error',
}) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
            if (onClose) onClose();
        }, duration);

        return () => {
            clearTimeout(timer);
        };
    }, [duration, onClose]);

    return (
        visible && (
            <AlertContainer state={state}>
                <i className="icon-info"></i> {message}
            </AlertContainer>
        )
    );
};

export default GeminoteAlert;
