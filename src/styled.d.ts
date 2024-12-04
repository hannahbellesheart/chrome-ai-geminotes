import 'styled-components';
import { ThemeProps } from '@geminotes/themes/ThemeProps';

declare module 'styled-components' {
    export type DefaultTheme = ThemeProps; // Extend DefaultTheme with ThemeProps
}
