export interface ImageProps {
    src: string;
    alt: string;
}

export const ROOT: string = '/assets/images/';

export const CURSOR_DEFAULT: ImageProps = {
    src: `${ROOT}cursor-default.png`,
    alt: '',
};

export const CURSOR_POINTER: ImageProps = {
    src: `${ROOT}cursor-pointer.png`,
    alt: '',
};
